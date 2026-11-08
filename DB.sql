-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.properties (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title text,
  type text,
  category text,
  purpose text,
  rent_type text,
  host text,
  date text,
  price text,
  price_note text,
  rating numeric,
  image text,
  images ARRAY,
  video text,
  description text,
  lat double precision,
  lng double precision,
  address text,
  amenities ARRAY,
  status text DEFAULT 'Active'::text,
  created_at timestamp with time zone DEFAULT now(),
  surface_area numeric,
  typology text,
  bedrooms integer,
  bathrooms integer,
  condition text,
  reference_number text,
  floor_plan_image text,
  CONSTRAINT properties_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reviews (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  client text,
  property text,
  rating numeric,
  comment text,
  date text,
  status text DEFAULT 'Pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id)
);
CREATE TABLE public.bookings (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  property_id bigint,
  property_title text,
  guest_name text,
  guest_email text,
  check_in text,
  check_out text,
  amount text,
  status text DEFAULT 'Pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT bookings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.settings (
  id bigint NOT NULL,
  platform_name text,
  support_email text,
  phone text,
  address text,
  CONSTRAINT settings_pkey PRIMARY KEY (id)
);