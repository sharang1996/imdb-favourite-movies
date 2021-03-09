CREATE TABLE users (
  id int(11) NOT NULL,
  firstName varchar(255) default NULL,
  lastName varchar(255) default NULL,
  password varchar(255) default NULL,
  favourite_movies varchar(255) default NULL
);

INSERT INTO users (id,firstName,lastName,password,favourite_movies)
    VALUES
        (1,'Anona','Cruz','123456','tt0848228,tt4154756,tt2395427,tt4154796'),
        (2,'Camilla','Sayer','123456','tt4154756,tt10515848,tt0120575'),
        (3,'Ganesh','Zentai','123456','tt0287871,tt2975590,tt0103776,tt4116284,tt2313197'),
        (4,'Vivien','Straub','123456','tt0926084,tt0417741'),
        (5,'Bernardita','Bishop','123456','tt0389860');