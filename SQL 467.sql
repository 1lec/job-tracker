/*
Below is our schema

USERS
-----
user_id      SERIAL PRIMARY KEY
first_name   VARCHAR(100)
last_name    VARCHAR(100)


LOGINS
------
login_id     SERIAL PRIMARY KEY
user_id      INT REFERENCES users(user_id)
email        VARCHAR(255) UNIQUE NOT NULL
password     VARCHAR(255) NOT NULL


CONTACTS
--------
contact_id   SERIAL PRIMARY KEY
user_id      INT REFERENCES users(user_id)
first_name   VARCHAR(100) NULL
last_name    VARCHAR(100) NULL
email        VARCHAR(255) NULL
company      VARCHAR(255) NULL


STATUSES
--------
status_id    SERIAL PRIMARY KEY
name         VARCHAR(100)


JOBS
----
job_id       SERIAL PRIMARY KEY
user_id      INT REFERENCES users(user_id)
contact_id   INT REFERENCES contacts(contact_id)
status_id    INT REFERENCES statuses(status_id)
company_name VARCHAR(255)
job_title    VARCHAR(255)
date_applied DATE


SKILLS
------
skill_id     SERIAL PRIMARY KEY
name         VARCHAR(100)


USER_SKILLS
-----------
user_skill_id SERIAL PRIMARY KEY
user_id       INT REFERENCES users(user_id)
skill_id      INT REFERENCES skills(skill_id)


JOB_SKILLS
----------
job_skill_id  SERIAL PRIMARY KEY
job_id        INT REFERENCES jobs(job_id)
skill_id      INT REFERENCES skills(skill_id)


*/

-- tables were generated based on schema

-- users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- logins
CREATE TABLE logins (
    login_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- contacts
CREATE TABLE contacts (
    contact_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    email VARCHAR(255) NULL,
    company VARCHAR(255) NULL
);

-- statuses
CREATE TABLE statuses (
    status_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- jobs
CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    contact_id INT REFERENCES contacts(contact_id),
    status_id INT REFERENCES statuses(status_id),
    company_name VARCHAR(255),
    job_title VARCHAR(255),
    date_applied DATE
);

-- skills
CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- user_skills
CREATE TABLE user_skills (
    user_skill_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    skill_id INT REFERENCES skills(skill_id)
);

-- job_skills
CREATE TABLE job_skills (
    job_skill_id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(job_id),
    skill_id INT REFERENCES skills(skill_id)
);


-- Queries we will need for passing information from database to backend to frontend

-- Login

Insert into logins (user_id, email, password) Values (?,?,?);

select * from logins;

-- contacts table

Insert into contacts (user_id, first_name, last_name, email, company) values(?,?,?,?,?);

select * from contacts;

update contacts set ? = ? where contact_id = ?;

delete from contacts where contact_id = ?;

-- statuses;
select * from statuses;

-- Jobs 

select * from jobs;

insert into jobs (user_id, contact_id, status_id, company_name, job_title, date_applied) values(?,?,?,?,?,?);

delete from jobs where job_id = ?;

update statuses set status_id = ? where job_id = ?;

-- USER SKILLS

insert into user_skills(user_id, skill_id) Values(?, ?);

delete from user_skills where user_skill_id = ?;

update user_skills set skill_id = ? where user_skill_id = ?;

-- Jobs 
insert into job_skills(user_id, skill_id) Values(?, ?);

delete from job_skills where job_skill_id = ?;

update job_skills set skill_id = ? where job_skill_id = ?;
