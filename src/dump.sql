create table users(
id serial primary key,
name varchar(255) not null,
email varchar(255) unique not null,
senha varchar(255) not null
);

create table categories(
id serial primary key,
description varchar(255)
);

create table transactions(
id serial primary key,
description varchar(255),
value int not null,
date timestamp not null,
category_id int references categories(id),
users_id int references users(id),
type char(55)
);

insert into categories (description) values
('Food'), ('Subscriptions and Services'), ('House'),
('Market'), ('Selfcare'), ('Education'),
('Family'), ('Leisure'), ('Pets'), ('Gifts'),
('Clothes'), ('Health'), ('Transportation'),
('Salary'), ('Sales'), ('Other recipes'),
('Other expenses');