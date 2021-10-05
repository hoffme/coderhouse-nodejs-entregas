import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        products: [Product]!
        product(id: String!): Product!
    },

    type Mutation {
        createProduct(fields: ProductFieldsInput!): Product!
        updateProduct(input: ProductUpdateInput!): Product!
        deleteProduct(id: String!): Product!
    },

    input ProductFieldsInput {
        name: String!
        price: String!
        thumbnail: String!
    }

    input ProductUpdateInput {
        id: String!
        name: String
        price: String
        thumbnail: String
    }

    type Product {
        id: String!
        name: String!
        price: String!
        thumbnail: String!
    }
`);

export default schema;