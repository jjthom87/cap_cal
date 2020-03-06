--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: captains_log; Type: TABLE; Schema: public; Owner: jaredthomas
--

CREATE TABLE captains_log (
    id integer NOT NULL,
    article text NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE captains_log OWNER TO jaredthomas;

--
-- Name: captains_log_id_seq; Type: SEQUENCE; Schema: public; Owner: jaredthomas
--

CREATE SEQUENCE captains_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE captains_log_id_seq OWNER TO jaredthomas;

--
-- Name: captains_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jaredthomas
--

ALTER SEQUENCE captains_log_id_seq OWNED BY captains_log.id;


--
-- Name: html; Type: TABLE; Schema: public; Owner: jaredthomas
--

CREATE TABLE html (
    id integer NOT NULL,
    field_id character varying(255) NOT NULL,
    text text NOT NULL,
    page character varying(255) NOT NULL
);


ALTER TABLE html OWNER TO jaredthomas;

--
-- Name: html_id_seq; Type: SEQUENCE; Schema: public; Owner: jaredthomas
--

CREATE SEQUENCE html_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE html_id_seq OWNER TO jaredthomas;

--
-- Name: html_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jaredthomas
--

ALTER SEQUENCE html_id_seq OWNED BY html.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: jaredthomas
--

CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE session OWNER TO jaredthomas;

--
-- Name: users; Type: TABLE; Schema: public; Owner: jaredthomas
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE users OWNER TO jaredthomas;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: jaredthomas
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO jaredthomas;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jaredthomas
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: captains_log id; Type: DEFAULT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY captains_log ALTER COLUMN id SET DEFAULT nextval('captains_log_id_seq'::regclass);


--
-- Name: html id; Type: DEFAULT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY html ALTER COLUMN id SET DEFAULT nextval('html_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: captains_log; Type: TABLE DATA; Schema: public; Owner: jaredthomas
--

COPY captains_log (id, article, title) FROM stdin;
\.


--
-- Name: captains_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jaredthomas
--

SELECT pg_catalog.setval('captains_log_id_seq', 5, true);


--
-- Data for Name: html; Type: TABLE DATA; Schema: public; Owner: jaredthomas
--

COPY html (id, field_id, text, page) FROM stdin;
2	masthead-h1	Welcome to Captain Calamari's Crusade	home
\.


--
-- Name: html_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jaredthomas
--

SELECT pg_catalog.setval('html_id_seq', 2, true);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: jaredthomas
--

COPY session (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: jaredthomas
--

COPY users (id, name, username, password) FROM stdin;
1	sdot	st	$2a$10$5WLGoSmDP7NwZLDThzI6lOUMZMKZMNaDbgFdfQcr2X0Ahjb0YV9rK
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jaredthomas
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- Name: captains_log captains_log_pkey; Type: CONSTRAINT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY captains_log
    ADD CONSTRAINT captains_log_pkey PRIMARY KEY (id);


--
-- Name: html html_pkey; Type: CONSTRAINT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY html
    ADD CONSTRAINT html_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: jaredthomas
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

