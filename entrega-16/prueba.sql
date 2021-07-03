create database if not exists pruebas;

use pruebas;

create table if not exists items (
	id int not null auto_increment,
    nombre varchar(255) not null,
    categoria varchar(255) not null,
    stock int unsigned,
    primary key(id)
);

insert into items (nombre, categoria, stock) values ("Fideos", "Harina", 20); 
insert into items (nombre, categoria, stock) values ("Leche", "Lacteos", 20);
insert into items (nombre, categoria, stock) values ("Crema", "Lacteos", 20);

select * from items;

delete from items where id = 1;

update items set stock=55 where id <= 45 and id >= 2;

select * from items;