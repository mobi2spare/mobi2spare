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
  "address" varchar(200),
  "dateofestablishment" DATE;
);

CREATE TABLE "adhar" (
  "aadhar_number" varchar(12) UNIQUE,
  "is_authenticated" bool DEFAULT false,
  "buyer_id" integer
);

CREATE TABLE "cartitems" (
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

CREATE TABLE "attributes" (
  "id" SERIAL PRIMARY KEY,
  "attribute_name" VARCHAR(50)
)

CREATE TABLE "attribute_value" (
  "id" SERIAL PRIMARY KEY,
  "attribute_id" INTEGER,
  "value" varchar(100)
)

CREATE TABLE "product_attributes" (
  "product_id" INTEGER ,
  "attribute_value_id" INTEGER
)

CREATE TABLE "brands" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "orders" (
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

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "image_path" varchar(200)
);

CREATE TABLE "product_image_mapping" (

    "product_id" INTEGER,
    "image_id" INTEGER

);

CREATE TABLE "category_image_mapping" (
  "category_id" INTEGER,
  "image_id" INTEGER
)

ALTER TABLE "products" DROP COLUMN image;

ALTER TABLE "product_image_mapping" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "product_image_mapping" ADD FOREIGN KEY ("image_id") REFERENCES "images" ("id") ON DELETE CASCADE;

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

ALTER TABLE "adhar" ADD COLUMN "id" INTEGER SERIAL PRIMARY KEY;

ALTER TABLE "products" ADD COLUMN "name" VARCHAR(50);

ALTER TABLE "Cart" RENAME COLUMN count to item_count;

ALTER TABLE "product_image_mapping" ADD PRIMARY KEY("product_id","image_id");

ALTER TABLE "category_image_mapping" ADD PRIMARY KEY("category_id","image_id");

ALTER TABLE "Cart" RENAME TO cart;

ALTER TABLE cart ADD UNIQUE(buyer_id);

ALTER TABLE cartitems ADD UNIQUE(cart_id, product_id);

ALTER TABLE cartitems ADD CONSTRAINT quantity CHECK (quantity > 0);

ALTER TABLE "category_image_mapping" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE;

ALTER TABLE "category_image_mapping" ADD FOREIGN KEY ("image_id") REFERENCES "images" ("id") ON DELETE CASCADE;

ALTER TABLE "product_attributes" ADD PRIMARY KEY("product_id","attribute_value_id");

ALTER TABLE "product_attributes" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "product_attributes" ADD FOREIGN KEY ("attribute_value_id") REFERENCES "attribute_value" ("id") ON DELETE CASCADE;

ALTER TABLE "attribute_value" ADD FOREIGN KEY ("attribute_id") REFERENCES "attributes" ("id") ON DELETE CASCADE;
