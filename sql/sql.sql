--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-07-07 14:35:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS mobi2spare;
--
-- TOC entry 5083 (class 1262 OID 25838)
-- Name: mobi2spare; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE mobi2spare WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';


ALTER DATABASE mobi2spare OWNER TO postgres;

\connect mobi2spare

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 879 (class 1247 OID 25848)
-- Name: order_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status AS ENUM (
    'Success',
    'Failed',
    'Pending'
);


ALTER TYPE public.order_status OWNER TO postgres;

--
-- TOC entry 882 (class 1247 OID 25856)
-- Name: product_condition; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.product_condition AS ENUM (
    'Working',
    'Scrap'
);


ALTER TYPE public.product_condition OWNER TO postgres;

--
-- TOC entry 942 (class 1247 OID 42694)
-- Name: request_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.request_status AS ENUM (
    'Approved',
    'Rejected',
    'Pending'
);


ALTER TYPE public.request_status OWNER TO postgres;

--
-- TOC entry 876 (class 1247 OID 25840)
-- Name: user_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_type AS ENUM (
    'Admin',
    'GeneralUser',
    'DeliveryPartner'
);


ALTER TYPE public.user_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 25915)
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    buyer_id integer
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 25914)
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cart_id_seq" OWNER TO postgres;

--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 225
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public.cart.id;


--
-- TOC entry 224 (class 1259 OID 25907)
-- Name: Orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orders" (
    id integer NOT NULL,
    buyer_id integer,
    seller_id integer,
    saleprice integer NOT NULL,
    product_id integer,
    order_status public.order_status DEFAULT 'Pending'::public.order_status
);


ALTER TABLE public."Orders" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25906)
-- Name: Orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Orders_id_seq" OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 223
-- Name: Orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Orders_id_seq" OWNED BY public."Orders".id;


--
-- TOC entry 237 (class 1259 OID 42457)
-- Name: attribute_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attribute_info (
    id integer NOT NULL,
    attribute_name character varying(50)
);


ALTER TABLE public.attribute_info OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 42479)
-- Name: attribute_value; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attribute_value (
    id integer NOT NULL,
    attribute_id integer,
    value character varying(100)
);


ALTER TABLE public.attribute_value OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 42478)
-- Name: attribute_value_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attribute_value_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attribute_value_id_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 238
-- Name: attribute_value_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attribute_value_id_seq OWNED BY public.attribute_value.id;


--
-- TOC entry 236 (class 1259 OID 42456)
-- Name: attributes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attributes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attributes_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 236
-- Name: attributes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attributes_id_seq OWNED BY public.attribute_info.id;


--
-- TOC entry 220 (class 1259 OID 25889)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25888)
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO postgres;

--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 219
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- TOC entry 231 (class 1259 OID 26009)
-- Name: cartitems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cartitems (
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 0,
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT quantity CHECK ((quantity > 0))
);


ALTER TABLE public.cartitems OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25898)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25897)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 221
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 241 (class 1259 OID 42505)
-- Name: category_attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category_attributes (
    category_id integer NOT NULL,
    attribute_id integer NOT NULL
);


ALTER TABLE public.category_attributes OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 34252)
-- Name: category_image_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category_image_mapping (
    category_id integer NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.category_image_mapping OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 26030)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    image_path character varying(200)
);


ALTER TABLE public.images OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 26029)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.images_id_seq OWNER TO postgres;

--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 232
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- TOC entry 228 (class 1259 OID 25922)
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    buyer_id integer,
    product_id integer
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 25921)
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_id_seq OWNER TO postgres;

--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 227
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- TOC entry 243 (class 1259 OID 42580)
-- Name: model; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.model (
    id integer NOT NULL,
    model_name character varying(50) NOT NULL,
    brand_id integer NOT NULL
);


ALTER TABLE public.model OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 42579)
-- Name: model_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.model_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.model_id_seq OWNER TO postgres;

--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 242
-- Name: model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.model_id_seq OWNED BY public.model.id;


--
-- TOC entry 246 (class 1259 OID 42603)
-- Name: model_ram_storage_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.model_ram_storage_mapping (
    model_id integer NOT NULL,
    ram_storage_id integer NOT NULL
);


ALTER TABLE public.model_ram_storage_mapping OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 42485)
-- Name: product_attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_attributes (
    product_id integer NOT NULL,
    attribute_value_id integer NOT NULL
);


ALTER TABLE public.product_attributes OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 26036)
-- Name: product_image_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_image_mapping (
    product_id integer NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.product_image_mapping OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 42752)
-- Name: product_request_attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_request_attributes (
    product_request_id integer NOT NULL,
    attribute_value_id integer NOT NULL
);


ALTER TABLE public.product_request_attributes OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 42767)
-- Name: product_request_image_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_request_image_mapping (
    product_request_id integer NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.product_request_image_mapping OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25879)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    brand_id integer,
    category_id integer,
    quantity integer NOT NULL,
    description character varying(50),
    seller_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    price double precision NOT NULL,
    name character varying(50),
    model_id integer NOT NULL,
    ram_storage_id integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25878)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 249 (class 1259 OID 42719)
-- Name: product_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_requests (
    id integer DEFAULT nextval('public.products_id_seq'::regclass) NOT NULL,
    brand_id integer,
    category_id integer,
    description character varying(50),
    buyer_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    model_id integer NOT NULL,
    ram_storage_id integer NOT NULL
);


ALTER TABLE public.product_requests OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 42592)
-- Name: ram_storage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ram_storage (
    id integer NOT NULL,
    configuration character varying(50) NOT NULL
);


ALTER TABLE public.ram_storage OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 42591)
-- Name: ram_storage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ram_storage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ram_storage_id_seq OWNER TO postgres;

--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 244
-- Name: ram_storage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ram_storage_id_seq OWNED BY public.ram_storage.id;


--
-- TOC entry 230 (class 1259 OID 25929)
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    buyer_id integer,
    product_id integer,
    rating integer DEFAULT 0
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 25928)
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ratings_id_seq OWNER TO postgres;

--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 229
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- TOC entry 248 (class 1259 OID 42644)
-- Name: temporary_model_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temporary_model_requests (
    request_id integer NOT NULL,
    brand_id integer NOT NULL,
    category_id integer NOT NULL,
    quantity integer NOT NULL,
    description character varying(500),
    seller_id integer NOT NULL,
    price integer NOT NULL,
    model_name character varying(50),
    ram_storage_config character varying(50),
    model_id integer,
    ram_storage_id integer,
    admin_id integer,
    request_status public.request_status DEFAULT 'Pending'::public.request_status,
    attribute_value_id integer[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    admin_actioned_at timestamp with time zone,
    image_paths character varying(512)[] NOT NULL,
    CONSTRAINT temporary_admin_seller_requests_check CHECK ((admin_id <> seller_id)),
    CONSTRAINT temporary_model_requests_ram_storage_check CHECK ((((ram_storage_config IS NOT NULL) AND (ram_storage_id IS NULL)) OR ((ram_storage_config IS NULL) AND (ram_storage_id IS NOT NULL))))
);


ALTER TABLE public.temporary_model_requests OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 42643)
-- Name: temporary_model_requests_request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.temporary_model_requests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.temporary_model_requests_request_id_seq OWNER TO postgres;

--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 247
-- Name: temporary_model_requests_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.temporary_model_requests_request_id_seq OWNED BY public.temporary_model_requests.request_id;


--
-- TOC entry 216 (class 1259 OID 25862)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    avatar character varying(200),
    phone character varying(25),
    email character varying(50),
    password character varying(1024),
    user_type public.user_type,
    organization_name character varying(50),
    address character varying(200),
    dateofestablishment date
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 25861)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4809 (class 2604 OID 25910)
-- Name: Orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);


--
-- TOC entry 4818 (class 2604 OID 42460)
-- Name: attribute_info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attribute_info ALTER COLUMN id SET DEFAULT nextval('public.attributes_id_seq'::regclass);


--
-- TOC entry 4819 (class 2604 OID 42482)
-- Name: attribute_value id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attribute_value ALTER COLUMN id SET DEFAULT nextval('public.attribute_value_id_seq'::regclass);


--
-- TOC entry 4807 (class 2604 OID 25892)
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- TOC entry 4811 (class 2604 OID 25918)
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- TOC entry 4808 (class 2604 OID 25901)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4817 (class 2604 OID 26033)
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- TOC entry 4812 (class 2604 OID 25925)
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- TOC entry 4820 (class 2604 OID 42583)
-- Name: model id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model ALTER COLUMN id SET DEFAULT nextval('public.model_id_seq'::regclass);


--
-- TOC entry 4804 (class 2604 OID 25882)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 42595)
-- Name: ram_storage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ram_storage ALTER COLUMN id SET DEFAULT nextval('public.ram_storage_id_seq'::regclass);


--
-- TOC entry 4813 (class 2604 OID 25932)
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- TOC entry 4822 (class 2604 OID 42647)
-- Name: temporary_model_requests request_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporary_model_requests ALTER COLUMN request_id SET DEFAULT nextval('public.temporary_model_requests_request_id_seq'::regclass);


--
-- TOC entry 4801 (class 2604 OID 25865)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4850 (class 2606 OID 25920)
-- Name: cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- TOC entry 4848 (class 2606 OID 25913)
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- TOC entry 4870 (class 2606 OID 42484)
-- Name: attribute_value attribute_value_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attribute_value
    ADD CONSTRAINT attribute_value_pkey PRIMARY KEY (id);


--
-- TOC entry 4868 (class 2606 OID 42462)
-- Name: attribute_info attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attribute_info
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (id);


--
-- TOC entry 4840 (class 2606 OID 25896)
-- Name: brands brands_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_name_key UNIQUE (name);


--
-- TOC entry 4842 (class 2606 OID 25894)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- TOC entry 4852 (class 2606 OID 26052)
-- Name: cart cart_buyer_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_buyer_id_key UNIQUE (buyer_id);


--
-- TOC entry 4858 (class 2606 OID 26056)
-- Name: cartitems cartitems_cart_id_product_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_cart_id_product_id_key UNIQUE (cart_id, product_id);


--
-- TOC entry 4860 (class 2606 OID 42784)
-- Name: cartitems cartitems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_pkey PRIMARY KEY (cart_id, product_id);


--
-- TOC entry 4844 (class 2606 OID 25905)
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- TOC entry 4846 (class 2606 OID 25903)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4874 (class 2606 OID 42519)
-- Name: category_attributes category_attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_attributes
    ADD CONSTRAINT category_attributes_pkey PRIMARY KEY (category_id, attribute_id);


--
-- TOC entry 4866 (class 2606 OID 34256)
-- Name: category_image_mapping category_image_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_image_mapping
    ADD CONSTRAINT category_image_mapping_pkey PRIMARY KEY (category_id, image_id);


--
-- TOC entry 4862 (class 2606 OID 26035)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- TOC entry 4854 (class 2606 OID 25927)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- TOC entry 4876 (class 2606 OID 42585)
-- Name: model model_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT model_pkey PRIMARY KEY (id);


--
-- TOC entry 4884 (class 2606 OID 42607)
-- Name: model_ram_storage_mapping model_ram_storage_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model_ram_storage_mapping
    ADD CONSTRAINT model_ram_storage_mapping_pkey PRIMARY KEY (model_id, ram_storage_id);


--
-- TOC entry 4872 (class 2606 OID 42489)
-- Name: product_attributes product_attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_pkey PRIMARY KEY (product_id, attribute_value_id);


--
-- TOC entry 4864 (class 2606 OID 26050)
-- Name: product_image_mapping product_image_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_image_mapping
    ADD CONSTRAINT product_image_mapping_pkey PRIMARY KEY (product_id, image_id);


--
-- TOC entry 4890 (class 2606 OID 42756)
-- Name: product_request_attributes product_request_attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_request_attributes
    ADD CONSTRAINT product_request_attributes_pkey PRIMARY KEY (product_request_id, attribute_value_id);


--
-- TOC entry 4892 (class 2606 OID 42771)
-- Name: product_request_image_mapping product_request_image_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_request_image_mapping
    ADD CONSTRAINT product_request_image_mapping_pkey PRIMARY KEY (product_request_id, image_id);


--
-- TOC entry 4888 (class 2606 OID 42726)
-- Name: product_requests product_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_requests
    ADD CONSTRAINT product_requests_pkey PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 25887)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4880 (class 2606 OID 42597)
-- Name: ram_storage ram_storage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ram_storage
    ADD CONSTRAINT ram_storage_pkey PRIMARY KEY (id);


--
-- TOC entry 4856 (class 2606 OID 25935)
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- TOC entry 4829 (class 2606 OID 42718)
-- Name: temporary_model_requests size_check_image_paths; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.temporary_model_requests
    ADD CONSTRAINT size_check_image_paths CHECK ((cardinality(image_paths) = 2)) NOT VALID;


--
-- TOC entry 4831 (class 2606 OID 42704)
-- Name: temporary_model_requests temporary_model_requests_model_id_check; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_model_id_check CHECK ((model_id <> '-1'::integer)) NOT VALID;


--
-- TOC entry 4886 (class 2606 OID 42655)
-- Name: temporary_model_requests temporary_model_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_pkey PRIMARY KEY (request_id);


--
-- TOC entry 4833 (class 2606 OID 42705)
-- Name: temporary_model_requests temporary_model_requests_ram_storage_id_check; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_ram_storage_id_check CHECK ((ram_storage_id <> '-1'::integer)) NOT VALID;


--
-- TOC entry 4834 (class 2606 OID 42691)
-- Name: temporary_model_requests temporary_requests_model_check; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.temporary_model_requests
    ADD CONSTRAINT temporary_requests_model_check CHECK ((((model_name IS NOT NULL) AND (model_id IS NULL)) OR ((model_name IS NULL) AND (model_id IS NOT NULL)))) NOT VALID;


--
-- TOC entry 4878 (class 2606 OID 42717)
-- Name: model unique_model_per_brand; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT unique_model_per_brand UNIQUE (model_name, brand_id);


--
-- TOC entry 4882 (class 2606 OID 42715)
-- Name: ram_storage unique_ram_storage; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ram_storage
    ADD CONSTRAINT unique_ram_storage UNIQUE (configuration);


--
-- TOC entry 4836 (class 2606 OID 25871)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4906 (class 2606 OID 26022)
-- Name: cartitems CartItems_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT "CartItems_cart_id_fkey" FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON DELETE CASCADE;


--
-- TOC entry 4907 (class 2606 OID 26017)
-- Name: cartitems CartItems_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT "CartItems_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4901 (class 2606 OID 25971)
-- Name: cart Cart_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "Cart_buyer_id_fkey" FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4898 (class 2606 OID 25956)
-- Name: Orders Orders_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_buyer_id_fkey" FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4899 (class 2606 OID 25966)
-- Name: Orders Orders_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4900 (class 2606 OID 25961)
-- Name: Orders Orders_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_seller_id_fkey" FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4912 (class 2606 OID 42535)
-- Name: attribute_value attribute_value_attribute_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attribute_value
    ADD CONSTRAINT attribute_value_attribute_id_fkey FOREIGN KEY (attribute_id) REFERENCES public.attribute_info(id) ON DELETE CASCADE;


--
-- TOC entry 4915 (class 2606 OID 42555)
-- Name: category_attributes category_attributes_attribute_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_attributes
    ADD CONSTRAINT category_attributes_attribute_id_fkey FOREIGN KEY (attribute_id) REFERENCES public.attribute_info(id) ON DELETE CASCADE;


--
-- TOC entry 4916 (class 2606 OID 42550)
-- Name: category_attributes category_attributes_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_attributes
    ADD CONSTRAINT category_attributes_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4910 (class 2606 OID 42444)
-- Name: category_image_mapping category_image_mapping_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_image_mapping
    ADD CONSTRAINT category_image_mapping_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4911 (class 2606 OID 42449)
-- Name: category_image_mapping category_image_mapping_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_image_mapping
    ADD CONSTRAINT category_image_mapping_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id) ON DELETE CASCADE;


--
-- TOC entry 4902 (class 2606 OID 25986)
-- Name: likes likes_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4903 (class 2606 OID 25991)
-- Name: likes likes_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4917 (class 2606 OID 42586)
-- Name: model model_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT model_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- TOC entry 4918 (class 2606 OID 42608)
-- Name: model_ram_storage_mapping model_ram_storage_mapping_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model_ram_storage_mapping
    ADD CONSTRAINT model_ram_storage_mapping_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.model(id) ON DELETE CASCADE;


--
-- TOC entry 4919 (class 2606 OID 42613)
-- Name: model_ram_storage_mapping model_ram_storage_mapping_ram_storage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model_ram_storage_mapping
    ADD CONSTRAINT model_ram_storage_mapping_ram_storage_id_fkey FOREIGN KEY (ram_storage_id) REFERENCES public.ram_storage(id) ON DELETE CASCADE;


--
-- TOC entry 4913 (class 2606 OID 42545)
-- Name: product_attributes product_attributes_attribute_value_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_attribute_value_id_fkey FOREIGN KEY (attribute_value_id) REFERENCES public.attribute_value(id) ON DELETE CASCADE;


--
-- TOC entry 4914 (class 2606 OID 42540)
-- Name: product_attributes product_attributes_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4908 (class 2606 OID 26044)
-- Name: product_image_mapping product_image_mapping_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_image_mapping
    ADD CONSTRAINT product_image_mapping_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id) ON DELETE CASCADE;


--
-- TOC entry 4909 (class 2606 OID 26039)
-- Name: product_image_mapping product_image_mapping_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_image_mapping
    ADD CONSTRAINT product_image_mapping_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4931 (class 2606 OID 42757)
-- Name: product_request_attributes product_request_attributes_attribute_value_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_request_attributes
    ADD CONSTRAINT product_request_attributes_attribute_value_id_fkey FOREIGN KEY (attribute_value_id) REFERENCES public.attribute_value(id) ON DELETE CASCADE;


--
-- TOC entry 4932 (class 2606 OID 42762)
-- Name: product_request_attributes product_request_attributes_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_request_attributes
    ADD CONSTRAINT product_request_attributes_product_id_fkey FOREIGN KEY (product_request_id) REFERENCES public.product_requests(id) ON DELETE CASCADE;


--
-- TOC entry 4933 (class 2606 OID 42772)
-- Name: product_request_image_mapping product_request_image_mapping_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_request_image_mapping
    ADD CONSTRAINT product_request_image_mapping_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id) ON DELETE CASCADE;


--
-- TOC entry 4934 (class 2606 OID 42777)
-- Name: product_request_image_mapping product_request_image_mapping_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_request_image_mapping
    ADD CONSTRAINT product_request_image_mapping_product_id_fkey FOREIGN KEY (product_request_id) REFERENCES public.product_requests(id) ON DELETE CASCADE;


--
-- TOC entry 4893 (class 2606 OID 25941)
-- Name: products products_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- TOC entry 4926 (class 2606 OID 42727)
-- Name: product_requests products_brand_id_fkey_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_requests
    ADD CONSTRAINT products_brand_id_fkey_buyer FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE CASCADE;


--
-- TOC entry 4927 (class 2606 OID 42747)
-- Name: product_requests products_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_requests
    ADD CONSTRAINT products_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4894 (class 2606 OID 25946)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4928 (class 2606 OID 42732)
-- Name: product_requests products_category_id_fkey_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_requests
    ADD CONSTRAINT products_category_id_fkey_buyer FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4895 (class 2606 OID 42638)
-- Name: products products_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.model(id) ON DELETE CASCADE;


--
-- TOC entry 4929 (class 2606 OID 42737)
-- Name: product_requests products_model_id_fkey_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_requests
    ADD CONSTRAINT products_model_id_fkey_buyer FOREIGN KEY (model_id) REFERENCES public.model(id) ON DELETE CASCADE;


--
-- TOC entry 4896 (class 2606 OID 42633)
-- Name: products products_ram_storage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_ram_storage_id_fkey FOREIGN KEY (ram_storage_id) REFERENCES public.ram_storage(id) ON DELETE CASCADE;


--
-- TOC entry 4930 (class 2606 OID 42742)
-- Name: product_requests products_ram_storage_id_fkey_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_requests
    ADD CONSTRAINT products_ram_storage_id_fkey_buyer FOREIGN KEY (ram_storage_id) REFERENCES public.ram_storage(id) ON DELETE CASCADE;


--
-- TOC entry 4897 (class 2606 OID 25951)
-- Name: products products_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4904 (class 2606 OID 25996)
-- Name: ratings ratings_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4905 (class 2606 OID 26001)
-- Name: ratings ratings_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4920 (class 2606 OID 42681)
-- Name: temporary_model_requests temporary_model_requests_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.users(id);


--
-- TOC entry 4921 (class 2606 OID 42661)
-- Name: temporary_model_requests temporary_model_requests_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id);


--
-- TOC entry 4922 (class 2606 OID 42666)
-- Name: temporary_model_requests temporary_model_requests_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 4923 (class 2606 OID 42656)
-- Name: temporary_model_requests temporary_model_requests_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.model(id);


--
-- TOC entry 4924 (class 2606 OID 42671)
-- Name: temporary_model_requests temporary_model_requests_ram_storage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_ram_storage_id_fkey FOREIGN KEY (ram_storage_id) REFERENCES public.ram_storage(id);


--
-- TOC entry 4925 (class 2606 OID 42676)
-- Name: temporary_model_requests temporary_model_requests_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temporary_model_requests
    ADD CONSTRAINT temporary_model_requests_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.users(id);


-- Completed on 2024-07-07 14:35:27

--
-- PostgreSQL database dump complete
--

