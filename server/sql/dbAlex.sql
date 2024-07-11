DROP TABLE IF EXISTS public.role;
DROP TABLE IF EXISTS public.account;
DROP TABLE IF EXISTS public.dc;
DROP TABLE IF EXISTS public.dc_status;

CREATE TABLE IF NOT EXISTS public.role
(
    id serial PRIMARY KEY,
    role_name VARCHAR(32) NOT NULL,
    role_details VARCHAR(32)  
);
INSERT INTO public.role(role_name, role_details) VALUES('admin', 'Access tout');
INSERT INTO public.role(role_name, role_details) VALUES('user', 'Access limité');

CREATE TABLE account(
    id serial PRIMARY KEY,
    login_name VARCHAR(32) NOT NULL,
    display_name VARCHAR(32),
    pass_word VARCHAR(128) NOT NULL,
	role_id INTEGER NOT NULL
);
INSERT INTO account(login_name, display_name, pass_word, role_id) VALUES('Alex', 'Alex', '$2b$10$Us5z/5AHLJ7bgZv15XR7QeZLWGI0IXIEPdO.dHs2ab3xpYsg0x/L2', 1); -- pass_word:12345

CREATE TABLE dc_status(
    id INT PRIMARY KEY,
    label VARCHAR(32) NOT NULL
);

INSERT INTO public.dc_status(id, label)	VALUES (1, 'Initialisé'),(2, 'Saisie_Encours'), (3, 'Finalisé'), (4, 'Terminé');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE dc(
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    firstname VARCHAR(32) NOT NULL,
    familyname VARCHAR(32) NOT NULL,
    email VARCHAR(256) NOT NULL,
    dc_status INT REFERENCES dc_status (id),
    tags VARCHAR(256),
    document JSONB NULL,
    manager_id INTEGER NOT NULL,
    nbexps integer NOT NULL DEFAULT 0,
    poste character varying(128) NULL,
    creation_date timestamp without time zone NOT NULL,
    modification_date timestamp without time zone NOT NULL,
    ref_managers VARCHAR(256),
);
