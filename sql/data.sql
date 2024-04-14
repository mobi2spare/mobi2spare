PGDMP                      |         
   mobi2spare    16.1    16.1 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    25838 
   mobi2spare    DATABASE     }   CREATE DATABASE mobi2spare WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE mobi2spare;
                postgres    false            g           1247    25848    order_status    TYPE     X   CREATE TYPE public.order_status AS ENUM (
    'Success',
    'Failed',
    'Pending'
);
    DROP TYPE public.order_status;
       public          postgres    false            j           1247    25856    product_condition    TYPE     M   CREATE TYPE public.product_condition AS ENUM (
    'Working',
    'Scrap'
);
 $   DROP TYPE public.product_condition;
       public          postgres    false            d           1247    25840 	   user_type    TYPE     `   CREATE TYPE public.user_type AS ENUM (
    'Admin',
    'GeneralUser',
    'DeliveryPartner'
);
    DROP TYPE public.user_type;
       public          postgres    false            �            1259    26009 	   cartitems    TABLE       CREATE TABLE public.cartitems (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer DEFAULT 0,
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT quantity CHECK ((quantity > 0))
);
    DROP TABLE public.cartitems;
       public         heap    postgres    false            �            1259    26008    CartItems_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CartItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."CartItems_id_seq";
       public          postgres    false    233            �           0    0    CartItems_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."CartItems_id_seq" OWNED BY public.cartitems.id;
          public          postgres    false    232            �            1259    25915    cart    TABLE     �   CREATE TABLE public.cart (
    id integer NOT NULL,
    buyer_id integer,
    item_count integer DEFAULT 0 NOT NULL,
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    25914    Cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Cart_id_seq";
       public          postgres    false    227            �           0    0    Cart_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public."Cart_id_seq" OWNED BY public.cart.id;
          public          postgres    false    226            �            1259    25907    Orders    TABLE     �   CREATE TABLE public."Orders" (
    id integer NOT NULL,
    buyer_id integer,
    seller_id integer,
    saleprice integer NOT NULL,
    product_id integer,
    order_status public.order_status DEFAULT 'Pending'::public.order_status
);
    DROP TABLE public."Orders";
       public         heap    postgres    false    871    871            �            1259    25906    Orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Orders_id_seq";
       public          postgres    false    225            �           0    0    Orders_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Orders_id_seq" OWNED BY public."Orders".id;
          public          postgres    false    224            �            1259    25872    adhar    TABLE     �   CREATE TABLE public.adhar (
    aadhar_number character varying(12),
    is_authenticated boolean DEFAULT false,
    buyer_id integer,
    id integer NOT NULL
);
    DROP TABLE public.adhar;
       public         heap    postgres    false            �            1259    26060    adhar_id_seq    SEQUENCE     �   CREATE SEQUENCE public.adhar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.adhar_id_seq;
       public          postgres    false    217            �           0    0    adhar_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.adhar_id_seq OWNED BY public.adhar.id;
          public          postgres    false    237            �            1259    42479    attribute_value    TABLE     }   CREATE TABLE public.attribute_value (
    id integer NOT NULL,
    attribute_id integer,
    value character varying(100)
);
 #   DROP TABLE public.attribute_value;
       public         heap    postgres    false            �            1259    42478    attribute_value_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attribute_value_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.attribute_value_id_seq;
       public          postgres    false    242            �           0    0    attribute_value_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.attribute_value_id_seq OWNED BY public.attribute_value.id;
          public          postgres    false    241            �            1259    42457 
   attributes    TABLE     f   CREATE TABLE public.attributes (
    id integer NOT NULL,
    attribute_name character varying(50)
);
    DROP TABLE public.attributes;
       public         heap    postgres    false            �            1259    42456    attributes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attributes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.attributes_id_seq;
       public          postgres    false    240            �           0    0    attributes_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.attributes_id_seq OWNED BY public.attributes.id;
          public          postgres    false    239            �            1259    25889    brands    TABLE     a   CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.brands;
       public         heap    postgres    false            �            1259    25888    brands_id_seq    SEQUENCE     �   CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.brands_id_seq;
       public          postgres    false    221            �           0    0    brands_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;
          public          postgres    false    220            �            1259    25898 
   categories    TABLE     e   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    25897    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    223            �           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    222            �            1259    34252    category_image_mapping    TABLE     p   CREATE TABLE public.category_image_mapping (
    category_id integer NOT NULL,
    image_id integer NOT NULL
);
 *   DROP TABLE public.category_image_mapping;
       public         heap    postgres    false            �            1259    26030    images    TABLE     _   CREATE TABLE public.images (
    id integer NOT NULL,
    image_path character varying(200)
);
    DROP TABLE public.images;
       public         heap    postgres    false            �            1259    26029    images_id_seq    SEQUENCE     �   CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.images_id_seq;
       public          postgres    false    235            �           0    0    images_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;
          public          postgres    false    234            �            1259    25922    likes    TABLE     e   CREATE TABLE public.likes (
    id integer NOT NULL,
    buyer_id integer,
    product_id integer
);
    DROP TABLE public.likes;
       public         heap    postgres    false            �            1259    25921    likes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.likes_id_seq;
       public          postgres    false    229            �           0    0    likes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;
          public          postgres    false    228            �            1259    42485    product_attributes    TABLE     u   CREATE TABLE public.product_attributes (
    product_id integer NOT NULL,
    attribute_value_id integer NOT NULL
);
 &   DROP TABLE public.product_attributes;
       public         heap    postgres    false            �            1259    26036    product_image_mapping    TABLE     n   CREATE TABLE public.product_image_mapping (
    product_id integer NOT NULL,
    image_id integer NOT NULL
);
 )   DROP TABLE public.product_image_mapping;
       public         heap    postgres    false            �            1259    25879    products    TABLE     �  CREATE TABLE public.products (
    id integer NOT NULL,
    brand_id integer,
    category_id integer,
    quantity integer NOT NULL,
    description character varying(50),
    seller_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    price double precision NOT NULL,
    product_condition public.product_condition DEFAULT 'Working'::public.product_condition,
    name character varying(50)
);
    DROP TABLE public.products;
       public         heap    postgres    false    874    874            �            1259    25878    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    219            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    218            �            1259    25929    ratings    TABLE     �   CREATE TABLE public.ratings (
    id integer NOT NULL,
    buyer_id integer,
    product_id integer,
    rating integer DEFAULT 0
);
    DROP TABLE public.ratings;
       public         heap    postgres    false            �            1259    25928    ratings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ratings_id_seq;
       public          postgres    false    231            �           0    0    ratings_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;
          public          postgres    false    230            �            1259    25862    users    TABLE     �  CREATE TABLE public.users (
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
    DROP TABLE public.users;
       public         heap    postgres    false    868            �            1259    25861    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            �           2604    25910 	   Orders id    DEFAULT     j   ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);
 :   ALTER TABLE public."Orders" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    26061    adhar id    DEFAULT     d   ALTER TABLE ONLY public.adhar ALTER COLUMN id SET DEFAULT nextval('public.adhar_id_seq'::regclass);
 7   ALTER TABLE public.adhar ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    217            �           2604    42482    attribute_value id    DEFAULT     x   ALTER TABLE ONLY public.attribute_value ALTER COLUMN id SET DEFAULT nextval('public.attribute_value_id_seq'::regclass);
 A   ALTER TABLE public.attribute_value ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    242    242            �           2604    42460    attributes id    DEFAULT     n   ALTER TABLE ONLY public.attributes ALTER COLUMN id SET DEFAULT nextval('public.attributes_id_seq'::regclass);
 <   ALTER TABLE public.attributes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            �           2604    25892 	   brands id    DEFAULT     f   ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);
 8   ALTER TABLE public.brands ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    25918    cart id    DEFAULT     d   ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);
 6   ALTER TABLE public.cart ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    26012    cartitems id    DEFAULT     n   ALTER TABLE ONLY public.cartitems ALTER COLUMN id SET DEFAULT nextval('public."CartItems_id_seq"'::regclass);
 ;   ALTER TABLE public.cartitems ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    232    233            �           2604    25901    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    26033 	   images id    DEFAULT     f   ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);
 8   ALTER TABLE public.images ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    234    235            �           2604    25925    likes id    DEFAULT     d   ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);
 7   ALTER TABLE public.likes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            �           2604    25882    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    25932 
   ratings id    DEFAULT     h   ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);
 9   ALTER TABLE public.ratings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    25865    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    25907    Orders 
   TABLE DATA           `   COPY public."Orders" (id, buyer_id, seller_id, saleprice, product_id, order_status) FROM stdin;
    public          postgres    false    225   Ý       �          0    25872    adhar 
   TABLE DATA           N   COPY public.adhar (aadhar_number, is_authenticated, buyer_id, id) FROM stdin;
    public          postgres    false    217   ��       �          0    42479    attribute_value 
   TABLE DATA           B   COPY public.attribute_value (id, attribute_id, value) FROM stdin;
    public          postgres    false    242   d�       �          0    42457 
   attributes 
   TABLE DATA           8   COPY public.attributes (id, attribute_name) FROM stdin;
    public          postgres    false    240   ��       �          0    25889    brands 
   TABLE DATA           *   COPY public.brands (id, name) FROM stdin;
    public          postgres    false    221   Ҟ       �          0    25915    cart 
   TABLE DATA           D   COPY public.cart (id, buyer_id, item_count, updated_at) FROM stdin;
    public          postgres    false    227   ��       �          0    26009 	   cartitems 
   TABLE DATA           R   COPY public.cartitems (id, cart_id, product_id, quantity, updated_at) FROM stdin;
    public          postgres    false    233   C�       �          0    25898 
   categories 
   TABLE DATA           .   COPY public.categories (id, name) FROM stdin;
    public          postgres    false    223   Ơ       �          0    34252    category_image_mapping 
   TABLE DATA           G   COPY public.category_image_mapping (category_id, image_id) FROM stdin;
    public          postgres    false    238   �       �          0    26030    images 
   TABLE DATA           0   COPY public.images (id, image_path) FROM stdin;
    public          postgres    false    235   0�       �          0    25922    likes 
   TABLE DATA           9   COPY public.likes (id, buyer_id, product_id) FROM stdin;
    public          postgres    false    229   1�       �          0    42485    product_attributes 
   TABLE DATA           L   COPY public.product_attributes (product_id, attribute_value_id) FROM stdin;
    public          postgres    false    243   N�       �          0    26036    product_image_mapping 
   TABLE DATA           E   COPY public.product_image_mapping (product_id, image_id) FROM stdin;
    public          postgres    false    236   s�       �          0    25879    products 
   TABLE DATA           �   COPY public.products (id, brand_id, category_id, quantity, description, seller_id, created_at, updated_at, price, product_condition, name) FROM stdin;
    public          postgres    false    219   ��       �          0    25929    ratings 
   TABLE DATA           C   COPY public.ratings (id, buyer_id, product_id, rating) FROM stdin;
    public          postgres    false    231   �       �          0    25862    users 
   TABLE DATA           �   COPY public.users (id, username, created_at, updated_at, avatar, phone, email, password, user_type, organization_name, address, dateofestablishment) FROM stdin;
    public          postgres    false    216   3�       �           0    0    CartItems_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."CartItems_id_seq"', 14, true);
          public          postgres    false    232            �           0    0    Cart_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Cart_id_seq"', 26, true);
          public          postgres    false    226            �           0    0    Orders_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Orders_id_seq"', 1, false);
          public          postgres    false    224            �           0    0    adhar_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.adhar_id_seq', 15, true);
          public          postgres    false    237            �           0    0    attribute_value_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.attribute_value_id_seq', 4, true);
          public          postgres    false    241            �           0    0    attributes_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.attributes_id_seq', 2, true);
          public          postgres    false    239            �           0    0    brands_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.brands_id_seq', 1, true);
          public          postgres    false    220            �           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 3, true);
          public          postgres    false    222            �           0    0    images_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.images_id_seq', 26, true);
          public          postgres    false    234            �           0    0    likes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.likes_id_seq', 1, false);
          public          postgres    false    228            �           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 65, true);
          public          postgres    false    218            �           0    0    ratings_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.ratings_id_seq', 1, false);
          public          postgres    false    230            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 32, true);
          public          postgres    false    215            �           2606    25877    adhar Adhar_aadhar_number_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.adhar
    ADD CONSTRAINT "Adhar_aadhar_number_key" UNIQUE (aadhar_number);
 I   ALTER TABLE ONLY public.adhar DROP CONSTRAINT "Adhar_aadhar_number_key";
       public            postgres    false    217            �           2606    26016    cartitems CartItems_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT "CartItems_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT "CartItems_pkey";
       public            postgres    false    233            �           2606    25920    cart Cart_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cart DROP CONSTRAINT "Cart_pkey";
       public            postgres    false    227            �           2606    25913    Orders Orders_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_pkey";
       public            postgres    false    225            �           2606    26063    adhar adhar_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.adhar
    ADD CONSTRAINT adhar_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.adhar DROP CONSTRAINT adhar_pkey;
       public            postgres    false    217            �           2606    42484 $   attribute_value attribute_value_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attribute_value
    ADD CONSTRAINT attribute_value_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.attribute_value DROP CONSTRAINT attribute_value_pkey;
       public            postgres    false    242            �           2606    42462    attributes attributes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    240            �           2606    25896    brands brands_name_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_name_key UNIQUE (name);
 @   ALTER TABLE ONLY public.brands DROP CONSTRAINT brands_name_key;
       public            postgres    false    221            �           2606    25894    brands brands_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.brands DROP CONSTRAINT brands_pkey;
       public            postgres    false    221            �           2606    26052    cart cart_buyer_id_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_buyer_id_key UNIQUE (buyer_id);
 @   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_buyer_id_key;
       public            postgres    false    227            �           2606    26056 *   cartitems cartitems_cart_id_product_id_key 
   CONSTRAINT     t   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_cart_id_product_id_key UNIQUE (cart_id, product_id);
 T   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_cart_id_product_id_key;
       public            postgres    false    233    233            �           2606    25905    categories categories_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_name_key;
       public            postgres    false    223            �           2606    25903    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    223            �           2606    34256 2   category_image_mapping category_image_mapping_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.category_image_mapping
    ADD CONSTRAINT category_image_mapping_pkey PRIMARY KEY (category_id, image_id);
 \   ALTER TABLE ONLY public.category_image_mapping DROP CONSTRAINT category_image_mapping_pkey;
       public            postgres    false    238    238            �           2606    26035    images images_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.images DROP CONSTRAINT images_pkey;
       public            postgres    false    235            �           2606    25927    likes likes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pkey;
       public            postgres    false    229            �           2606    42489 *   product_attributes product_attributes_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_pkey PRIMARY KEY (product_id, attribute_value_id);
 T   ALTER TABLE ONLY public.product_attributes DROP CONSTRAINT product_attributes_pkey;
       public            postgres    false    243    243            �           2606    26050 0   product_image_mapping product_image_mapping_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_image_mapping
    ADD CONSTRAINT product_image_mapping_pkey PRIMARY KEY (product_id, image_id);
 Z   ALTER TABLE ONLY public.product_image_mapping DROP CONSTRAINT product_image_mapping_pkey;
       public            postgres    false    236    236            �           2606    25887    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    219            �           2606    25935    ratings ratings_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ratings DROP CONSTRAINT ratings_pkey;
       public            postgres    false    231            �           2606    25871    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           2606    25936    adhar Adhar_buyer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.adhar
    ADD CONSTRAINT "Adhar_buyer_id_fkey" FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.adhar DROP CONSTRAINT "Adhar_buyer_id_fkey";
       public          postgres    false    217    4796    216            �           2606    26022     cartitems CartItems_cart_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT "CartItems_cart_id_fkey" FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT "CartItems_cart_id_fkey";
       public          postgres    false    233    4814    227            �           2606    26017 #   cartitems CartItems_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT "CartItems_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT "CartItems_product_id_fkey";
       public          postgres    false    4802    219    233            �           2606    25971    cart Cart_buyer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "Cart_buyer_id_fkey" FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.cart DROP CONSTRAINT "Cart_buyer_id_fkey";
       public          postgres    false    227    216    4796            �           2606    25956    Orders Orders_buyer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_buyer_id_fkey" FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_buyer_id_fkey";
       public          postgres    false    4796    225    216            �           2606    25966    Orders Orders_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_product_id_fkey";
       public          postgres    false    4802    219    225            �           2606    25961    Orders Orders_seller_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_seller_id_fkey" FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_seller_id_fkey";
       public          postgres    false    4796    225    216            �           2606    42500 1   attribute_value attribute_value_attribute_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attribute_value
    ADD CONSTRAINT attribute_value_attribute_id_fkey FOREIGN KEY (attribute_id) REFERENCES public.attributes(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.attribute_value DROP CONSTRAINT attribute_value_attribute_id_fkey;
       public          postgres    false    240    4832    242            �           2606    42444 >   category_image_mapping category_image_mapping_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.category_image_mapping
    ADD CONSTRAINT category_image_mapping_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;
 h   ALTER TABLE ONLY public.category_image_mapping DROP CONSTRAINT category_image_mapping_category_id_fkey;
       public          postgres    false    238    4810    223            �           2606    42449 ;   category_image_mapping category_image_mapping_image_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.category_image_mapping
    ADD CONSTRAINT category_image_mapping_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id) ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.category_image_mapping DROP CONSTRAINT category_image_mapping_image_id_fkey;
       public          postgres    false    235    238    4826            �           2606    25986    likes likes_buyer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_buyer_id_fkey;
       public          postgres    false    216    4796    229            �           2606    25991    likes likes_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_product_id_fkey;
       public          postgres    false    4802    229    219            �           2606    42495 =   product_attributes product_attributes_attribute_value_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_attribute_value_id_fkey FOREIGN KEY (attribute_value_id) REFERENCES public.attribute_value(id) ON DELETE CASCADE;
 g   ALTER TABLE ONLY public.product_attributes DROP CONSTRAINT product_attributes_attribute_value_id_fkey;
       public          postgres    false    243    242    4834            �           2606    42490 5   product_attributes product_attributes_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.product_attributes DROP CONSTRAINT product_attributes_product_id_fkey;
       public          postgres    false    243    4802    219            �           2606    26044 9   product_image_mapping product_image_mapping_image_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_image_mapping
    ADD CONSTRAINT product_image_mapping_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id) ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.product_image_mapping DROP CONSTRAINT product_image_mapping_image_id_fkey;
       public          postgres    false    235    4826    236            �           2606    26039 ;   product_image_mapping product_image_mapping_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_image_mapping
    ADD CONSTRAINT product_image_mapping_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.product_image_mapping DROP CONSTRAINT product_image_mapping_product_id_fkey;
       public          postgres    false    219    236    4802            �           2606    25941    products products_brand_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_brand_id_fkey;
       public          postgres    false    219    4806    221            �           2606    25946 "   products products_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.products DROP CONSTRAINT products_category_id_fkey;
       public          postgres    false    4810    223    219            �           2606    25951     products products_seller_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.products DROP CONSTRAINT products_seller_id_fkey;
       public          postgres    false    4796    219    216            �           2606    25996    ratings ratings_buyer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.ratings DROP CONSTRAINT ratings_buyer_id_fkey;
       public          postgres    false    4796    216    231            �           2606    26001    ratings ratings_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.ratings DROP CONSTRAINT ratings_product_id_fkey;
       public          postgres    false    4802    231    219            �      x������ � �      �   t   x�]α0D��&� ۰K*��؎�X����T��n����ϸ�~�n"��dh�/9��9�B�s)���Ȭ<�u=�J�:X�-�W]�	��EְR�d`��CD�T#+�      �   '   x�3�4��74�HO�2�4�L�HN��I�+����� m+8      �   '   x�3�,J��/.�/JLO�2�L��K�,�������� �4	]      �      x�3��K-O*J�K1����� .~o      �   8  x�m��m�0гX����Ԓ��=@�5�n~���(�um_Bb/җ싽}�J�v������i�!��x��
��Ĉ�T��o�aDn	�Ŷ<���P�=j�/�qq�D{!��2̜�O2��J��9�$�\��+
X�ATF!W��g��o�C3h.��zm�"a�I#|�{Z��F䛰�p��|,ч��YM�"ΙdJ��(7���Ä�g�u��!a\&�<��[}���d��ڼ�MXы�9�4�1oڨj�&��If]fW�%&��'a�5hw�IMG�A���f�4f�}/��S���Vh�b? ���^      �   s   x�eα�0���"XG��(i�?G�tv
t (�������A_�r�9FYj?&���1��Z��ؿ�j0��e����X���`�7q_���ν5z��:�r��Ի��sp&A      �   .   x�3���/�H-J�O,J�2�LN�M-J�2�t�,.�I������ �D.      �      x�3�4��2�42�2�42����� S�      �   �   x����jA�u�_Z�շ���7�"��bt��O;ダDf6M/���q9~���ָ5�3�2�$j������q?Ĝp�	3�J�<�c�5o�DR%J���i^'cO�Y�w����^HB�#�y�k9ш	�%ȗ�X��?T	�d��P#z��@G&�ܗ~���+~����,3J�CYoJ�<��t�^6��`#TR�>W��{��4����q��E����ෝԅ�*�9
�Hz�1-���a��3      �      x������ � �      �      x�33�4�231z\\\ �      �   .   x�3�4�2� bK 64�2�44����L8�L��L9�̸b���� �2�      �   U  x���MN1F��)�X�?�ݻ ���D
"B����!=fjTx�%�O�����e��0_}��?޽�����k���������������
3�u�k�=�"�dMH�Zg�r>���ͮF5�k�	9�������eE��Q����f�x �i,*0C���9�ۂr� ЦhXޞ���~y~x����(�i��j�4C�|�@�¹�����B.�q��F��Ug�hJP#�0��5*U�?�����5��6+2����i0�]"�f�T��s�� cC�h����5*�
8#�e �<�^d4�����̐��2 {��Sd4��Գ��E�hb@� �N���2�k��횁�&���.�fEF� J���6�j(��2Jo6M,8a?��ΐ��R���-职&����M,8i�=��mVd4���(X>Ѭ�hb) 	2*zE�hb) 	{[^Bd4��,�[�M,$�n[s$�_�e��
@��M,$����dVd4�(	���-���&�%�h�.Gb$�(�_+j����&� %in�m2�X�T�do�����������\2���ׄ��x��hb�_��-�N5K �K���k2�Xh�ԯ��lVd4���qQu��@FK���~G�"��e@=��[��灌&��7.�=��Hb	P�6$w�t�)�_2��C]2.�{=����|�l'[3G���W�J�!S������N9��/Cg�T��W�I��&�19��@~��f\[�9�j!ϐ��֌;�U�P�2���o,�7Z³�3d4-�Sn?�k����ͦ(-{�E���J3d4����W�'sߕ0E���m��v�w�      �      x������ � �      �   �  x���Kw�H�q�+Π��u��r�7����""7�"�����$���d�A�<�)��%|[���uS�D��o$����yR1}�3z�#��㫿��/�ڜV��2z���q[��Y����w�������pt�l#0k5�w������R����+��)=���g��O-���C\� 0�%�ITђ�68L��\�#�0>�G|�!�hG���A��eΡ�:_��7�z�"�O����S[!�_P�#\GT�H�}U�"�h��_��I^ħ��I*��mdX���"Jm����ٔ�e�]�WZ���$2�@� zU���m6g��~�b�;h1Z����tH��o8���d_���;tP�M��\��M��� 9 ��,�rQ��������3W����;ʆ0&�n��d��r�ec<��J柇<L�W\��}(!�c,�#�p�Q��+\��a͘�4�R�ύ�SS$7���5s_�����밝3�
yhl��&}q�	�%��H�?�YT�
�tg��?�+��d�u[���W����ԓei�
ˇ�ӷ�cw��W\�Ž#R�� ���Y���Z��]��ō�\�C�w�fˉE5w`<U�i�8��#�Nd Y��E4�+-�>�?x	�DE|�4n��V�&�mqZwx$�qg/�J�&��u��=t��3c�t'W]�Da!�E��[6�/0������(r�,�vު8ͽ��H�aґr��g}m��9�L���.�k�і���jun�뀛@~���u���b�r~���>��#�{2q]��I���l��gg�
G4_i�u-8�D��������z.Z�.2��H�쳨|��\��dVp�AظjV쟶�9�Ɔa���Vs;���>2����cE|�	�3��^d����NQ�D" Idyݔ�:��x0,.�,Dq��Y�noٌ�e�Z�������.:����T��K����Ku@�	!`��H�E_bx'���P��1�ր{^��h�ڬf&��#�����*'!RI�Xj�~]��Q�P�,�������E����Lo��( )V���RC�K�����^�$���Pkd���(��~�5��d�9��R�+c�<���GWx�ث��3����i��b0�:^���xk����Y�$y#�8��f�mS�T���{�Gz�s�r�1y�V�#��"oQ��nu:q^L-�n�6�u�X���'Z/�i3�W�e5i)L����N�Q	,7 ����_4D�3��!U�"��-k1O��9���?l�r�i���G�I0�U�7�����4!��)D�YTJ�᧑ W#FN�ں-k���E��V��X�Mڸ�N����7r!�1}�GL��c����P�jT��*������ݼr�/
u�3�E7�ѩ���qA���� �A�5'M	���J�U:����	�s�������^�-�D�;a�hI��z}����`~ɲ�lK�d��7�4��Pt�����Ǝ��\FE���Mt���Z���k��x���i�����l��	�Zms�`Pľz5�i3�[�$H���O$���ɭ���{+.�:��Ϣ�����JF+���5Wb'�G���y��>��W�+�5'�[<�T���SaX��|9a�Y��ߏj�ǖ��.�6�&k�b&=u�`�Yo4��K_�G醯�����ߢC��Z��}���r���=��Xy���5��~;�L��V��c��qBֽĝT_��,bY��V�,�s�m�\�Ylm�H����$��D��kNޛ����M�Ѳ%��߯
Wj����]�g��M�k�\U��vh��\MN6�'�$�8wn�ǧk��ݛ3 �y��mb��o��@��V��guƬz�w��}����#��1�u�&"�O�gI�]���^7j��㽬��o��v�-?��{G�
�8D,W�r划gQi��Ioڲ9�ڻ��?�?T;�n�0B,}�����먭Fl�p�5s>��WR�CI����3#�=�J���G���"��{z�E�Y��-��h6ƭ���S��x��l�wo�<B1��BPy],�#��Ϣ�F~�*�eI(��}�� =�4�$y"*�-
��w
0���m�I�����^A�����:)w��᳨rHo����+��*��p0����6Q��.�ڷ�S֎B�Р��&szl��������/��~K��g��)��m��V�GW�}ؓ�4�E�=�؀M�@"tחg}�3{/�Z�lu��oU�?;d�������޳     