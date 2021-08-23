import knex from 'knex';

class KnexRepository {
    constructor(connection, table) {
        this.connection = connection;
        this.table = table;

        this.onCreate = undefined;
        this.onUpdate = undefined;
        this.onDelete = undefined;
    }

    async execute(commands) {
        const connection = knex(this.connection);

        try {
            return await commands(connection)
        } finally {
            await connection.destroy()
        }
    }

    async setup() {
        await this.execute(async conn => {
            const existTable = await conn.schema.hasTable(this.table.name);
            if (existTable) return;

            await conn.schema.createTable(
                this.table.name,
                this.table.builder
            );
        });
    }

    async create(model) {
        const [inserted, all] = await this.execute(async conn => {
            const inserted = await conn.table(this.table.name).insert(model);
            const all = await conn.table(this.table.name).select("*");

            return [inserted, all];
        })

        if (this.onCreate) {
            try { this.onCreate(inserted, all) }
            catch (err) { console.error(err); }
        }

        return inserted;
    }

    async getById(id) {
        const rows = await this.execute(async conn => {
            return conn.table(this.table.name).select("*").where("id", id).limit(1);
        })

        if (rows.length === 0) throw new Error('not found');

        return rows[0];
    }

    async getAll() {
        return await this.execute(async conn => {
            return conn.table(this.table.name).select("*");
        })
    }

    async exist(id) {
        try {
            await this.getById(id);
            return true;
        } catch {
            return false;
        }
    }

    async update(id, update) {
        const [updated, all] = await this.execute(async conn => {
            const updated = await conn.table(this.table.name).update(update).where('id', id);
            const all = await conn.table(this.table.name).select("*");

            return [updated, all];
        })

        if (this.onUpdate) {
            try { this.onUpdate(updated, all) }
            catch (err) { console.error(err); }
        }

        return updated;
    }

    async delete(id) {
        const [deleted, all] = await this.execute(async conn => {
            const result = await conn.table(this.table.name).select('*').where('id', id).limit(1);
            await conn.table(this.table.name).where('id', id).del();

            const all = await conn.table(this.table.name).select("*");
            
            return [result, all];
        })

        if (this.onDelete) {
            try { this.onDelete(deleted, all) }
            catch (err) { console.error(err); }
        }

        return deleted;
    }
}

export default KnexRepository;