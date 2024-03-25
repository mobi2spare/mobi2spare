CREATE TYPE User_Type AS ENUM (
  'Admin',
  'GeneralUser',
  'DeliveryPartner'
);

CREATE TYPE Order_Status AS ENUM (
  'Success',
  'Failed',
  'Pending'
);

CREATE TYPE Product_Condition AS ENUM (

  'Working',
  'Scrap'
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar(30) NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "avatar" varchar(200),
  "phone" varchar(25),
  "email" varchar(50),
  "password" varchar(1024),
  "user_type" User_Type,
  "organization_name" varchar(50),
  "address" varchar(200)
);

CREATE TABLE "Adhar" (
  "aadhar_number" varchar(12) UNIQUE,
  "is_authenticated" bool DEFAULT false,
  "buyer_id" integer
);

CREATE TABLE "CartItems" (
	"id" SERIAL PRIMARY KEY,
	"cart_id" INTEGER NOT NULL ,
	"product_id" INTEGER NOT NULL,
	quantity INTEGER DEFAULT 0,
	updated_at  timestamp DEFAULT (now())
	

);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "image" varchar(200),
  "brand_id" integer,
  "category_id" integer,
  "quantity" integer NOT NULL,
  "description" varchar(50),
  "seller_id" integer,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "price" double precision NOT NULL,
  "product_condition" Product_Condition DEFAULT 'Working'
);

CREATE TABLE "brands" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "Orders" (
  "id" SERIAL PRIMARY KEY,
  "buyer_id" integer,
  "seller_id" integer,
  "saleprice" integer NOT NULL,
  "product_id" integer,
  "order_status" Order_Status DEFAULT 'Pending'
);

CREATE TABLE "Cart" (
  "id" SERIAL PRIMARY KEY,
  "buyer_id" integer,
  "seller_id" integer,
  "product_id" integer,
  "quantity" integer
);

CREATE TABLE "likes" (
  "id" SERIAL PRIMARY KEY,
  "buyer_id" integer,
  "product_id" integer
);

CREATE TABLE "ratings" (
  "id" SERIAL PRIMARY KEY,
  "buyer_id" integer,
  "product_id" integer,
  "rating" integer DEFAULT 0
);

ALTER TABLE "Adhar" ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "products" ADD FOREIGN KEY ("brand_id") REFERENCES "brands" ("id") ON DELETE CASCADE;

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE;

ALTER TABLE "products" ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id")ON DELETE CASCADE;

ALTER TABLE "Orders" ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "Orders" ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "Orders" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "Cart" ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "Cart" ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "Cart" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "likes" ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "likes" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "ratings" ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "ratings" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "Cart" DROP COLUMN seller_id, DROP COLUMN product_id, DROP COLUMN quantity;

ALTER TABLE "Cart" ADD COLUMN count INTEGER DEFAULT 0 NOT NULL;

ALTER TABLE "Cart" ADD COLUMN updated_at timestamp DEFAULT (now());

ALTER TABLE "CartItems" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "CartItems" ADD FOREIGN KEY ("cart_id") REFERENCES "Cart" ("id") ON DELETE CASCADE;

ALTER TABLE "Adhar" ADD COLUMN "id" INTEGER PRIMARY KEY;



