-- =========================================================
-- HADOTI WALE BHAIYA
-- TRAVEL OS - DATABASE v1.0
-- PostgreSQL
-- =========================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,

    password_hash TEXT,

    profile_photo TEXT,
    cover_photo TEXT,
    bio TEXT,

    role VARCHAR(30) DEFAULT 'traveler'
        CHECK (role IN (
            'traveler',
            'business',
            'creator',
            'admin'
        )),

    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- USER PROFILES
-- =========================================================

CREATE TABLE IF NOT EXISTS profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,

    gender VARCHAR(30),
    date_of_birth DATE,

    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),

    travel_level INTEGER DEFAULT 1,
    total_trips INTEGER DEFAULT 0,
    total_distance_km NUMERIC(12,2) DEFAULT 0,

    privacy_public BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- COUNTRIES
-- =========================================================

CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    code VARCHAR(10),
    slug VARCHAR(180) UNIQUE,

    continent VARCHAR(100),

    description TEXT,
    image_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- STATES / PROVINCES
-- =========================================================

CREATE TABLE IF NOT EXISTS states (
    id SERIAL PRIMARY KEY,

    country_id INTEGER NOT NULL
        REFERENCES countries(id) ON DELETE CASCADE,

    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180),

    description TEXT,
    image_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(country_id, slug)
);


-- =========================================================
-- DISTRICTS
-- =========================================================

CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,

    state_id INTEGER NOT NULL
        REFERENCES states(id) ON DELETE CASCADE,

    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180),

    description TEXT,
    image_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(state_id, slug)
);


-- =========================================================
-- CITIES
-- =========================================================

CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,

    district_id INTEGER
        REFERENCES districts(id) ON DELETE SET NULL,

    state_id INTEGER
        REFERENCES states(id) ON DELETE SET NULL,

    country_id INTEGER
        REFERENCES countries(id) ON DELETE SET NULL,

    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180),

    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),

    description TEXT,
    image_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- TOURIST DESTINATIONS
-- =========================================================

CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,

    country_id INTEGER
        REFERENCES countries(id) ON DELETE SET NULL,

    state_id INTEGER
        REFERENCES states(id) ON DELETE SET NULL,

    district_id INTEGER
        REFERENCES districts(id) ON DELETE SET NULL,

    city_id INTEGER
        REFERENCES cities(id) ON DELETE SET NULL,

    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) UNIQUE,

    category VARCHAR(100),

    short_description TEXT,
    description TEXT,

    history TEXT,
    culture TEXT,
    geography TEXT,
    architecture TEXT,

    best_time TEXT,
    weather_info TEXT,

    entry_fee NUMERIC(10,2),
    opening_time TIME,
    closing_time TIME,

    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),

    parking_available BOOLEAN DEFAULT FALSE,

    image_url TEXT,
    video_url TEXT,
    map_url TEXT,

    average_rating NUMERIC(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,

    is_featured BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- DESTINATION PHOTOS
-- =========================================================

CREATE TABLE IF NOT EXISTS destination_photos (
    id BIGSERIAL PRIMARY KEY,

    destination_id INTEGER NOT NULL
        REFERENCES destinations(id) ON DELETE CASCADE,

    uploaded_by UUID
        REFERENCES users(id) ON DELETE SET NULL,

    image_url TEXT NOT NULL,
    caption TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- DESTINATION VIDEOS
-- =========================================================

CREATE TABLE IF NOT EXISTS destination_videos (
    id BIGSERIAL PRIMARY KEY,

    destination_id INTEGER NOT NULL
        REFERENCES destinations(id) ON DELETE CASCADE,

    uploaded_by UUID
        REFERENCES users(id) ON DELETE SET NULL,

    video_url TEXT NOT NULL,
    title VARCHAR(255),

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- BUSINESSES
-- =========================================================

CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    owner_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    business_name VARCHAR(200) NOT NULL,

    business_type VARCHAR(50)
        CHECK (business_type IN (
            'hotel',
            'homestay',
            'hostel',
            'restaurant',
            'taxi',
            'guide',
            'photographer',
            'travel_agency',
            'activity',
            'bike_rental',
            'car_rental'
        )),

    phone VARCHAR(20),
    email VARCHAR(255),

    address TEXT,
    city VARCHAR(150),
    state VARCHAR(150),
    country VARCHAR(150),

    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),

    description TEXT,
    logo_url TEXT,
    cover_url TEXT,

    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- HOTELS / ROOMS
-- =========================================================

CREATE TABLE IF NOT EXISTS hotel_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL
        REFERENCES businesses(id) ON DELETE CASCADE,

    room_name VARCHAR(150) NOT NULL,
    room_type VARCHAR(100),

    capacity INTEGER DEFAULT 2,

    price_per_night NUMERIC(12,2) NOT NULL,

    total_rooms INTEGER DEFAULT 1,

    description TEXT,

    image_url TEXT,

    is_available BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- ROOM BOOKINGS / AVAILABILITY
-- =========================================================

CREATE TABLE IF NOT EXISTS room_availability (
    id BIGSERIAL PRIMARY KEY,

    room_id UUID NOT NULL
        REFERENCES hotel_rooms(id) ON DELETE CASCADE,

    available_date DATE NOT NULL,

    available_rooms INTEGER DEFAULT 0,

    UNIQUE(room_id, available_date)
);


-- =========================================================
-- TRAVEL STORIES / POSTS
-- =========================================================

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    destination_id INTEGER
        REFERENCES destinations(id) ON DELETE SET NULL,

    title VARCHAR(255),

    content TEXT,

    budget NUMERIC(12,2),

    privacy VARCHAR(20) DEFAULT 'public'
        CHECK (privacy IN (
            'public',
            'private'
        )),

    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- POST MEDIA
-- =========================================================

CREATE TABLE IF NOT EXISTS post_media (
    id BIGSERIAL PRIMARY KEY,

    post_id UUID NOT NULL
        REFERENCES posts(id) ON DELETE CASCADE,

    media_type VARCHAR(20)
        CHECK (media_type IN (
            'image',
            'video'
        )),

    media_url TEXT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- COMMENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,

    post_id UUID NOT NULL
        REFERENCES posts(id) ON DELETE CASCADE,

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    parent_id BIGINT
        REFERENCES comments(id) ON DELETE CASCADE,

    content TEXT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- POST LIKES
-- =========================================================

CREATE TABLE IF NOT EXISTS post_likes (
    post_id UUID NOT NULL
        REFERENCES posts(id) ON DELETE CASCADE,

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY(post_id, user_id)
);


-- =========================================================
-- FOLLOW SYSTEM
-- =========================================================

CREATE TABLE IF NOT EXISTS followers (
    follower_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    following_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY(follower_id, following_id),

    CHECK(follower_id <> following_id)
);


-- =========================================================
-- WISHLIST
-- =========================================================

CREATE TABLE IF NOT EXISTS wishlists (
    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    destination_id INTEGER NOT NULL
        REFERENCES destinations(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY(user_id, destination_id)
);


-- =========================================================
-- TRIPS
-- =========================================================

CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    destination_id INTEGER
        REFERENCES destinations(id) ON DELETE SET NULL,

    trip_name VARCHAR(255),

    start_date DATE,
    end_date DATE,

    budget NUMERIC(12,2),

    travel_style VARCHAR(50),

    travelers INTEGER DEFAULT 1,

    status VARCHAR(30) DEFAULT 'planned'
        CHECK (status IN (
            'planned',
            'ongoing',
            'completed',
            'cancelled'
        )),

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- AI ITINERARY
-- =========================================================

CREATE TABLE IF NOT EXISTS trip_itineraries (
    id BIGSERIAL PRIMARY KEY,

    trip_id UUID NOT NULL
        REFERENCES trips(id) ON DELETE CASCADE,

    day_number INTEGER NOT NULL,

    title VARCHAR(255),

    description TEXT,

    estimated_cost NUMERIC(12,2),

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- BOOKINGS
-- =========================================================

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    business_id UUID
        REFERENCES businesses(id) ON DELETE SET NULL,

    room_id UUID
        REFERENCES hotel_rooms(id) ON DELETE SET NULL,

    destination_id INTEGER
        REFERENCES destinations(id) ON DELETE SET NULL,

    booking_type VARCHAR(50),

    check_in DATE,
    check_out DATE,

    travelers INTEGER DEFAULT 1,

    amount NUMERIC(12,2) NOT NULL DEFAULT 0,

    commission_amount NUMERIC(12,2) DEFAULT 0,

    status VARCHAR(30) DEFAULT 'pending'
        CHECK (status IN (
            'pending',
            'confirmed',
            'cancelled',
            'completed',
            'refunded'
        )),

    booking_code VARCHAR(50) UNIQUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- PAYMENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    booking_id UUID NOT NULL
        REFERENCES bookings(id) ON DELETE CASCADE,

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    amount NUMERIC(12,2) NOT NULL,

    payment_method VARCHAR(50),

    transaction_id VARCHAR(255),

    status VARCHAR(30) DEFAULT 'pending'
        CHECK (status IN (
            'pending',
            'success',
            'failed',
            'refunded'
        )),

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- REVIEWS
-- =========================================================

CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    destination_id INTEGER
        REFERENCES destinations(id) ON DELETE CASCADE,

    business_id UUID
        REFERENCES businesses(id) ON DELETE CASCADE,

    booking_id UUID
        REFERENCES bookings(id) ON DELETE SET NULL,

    rating INTEGER NOT NULL
        CHECK (rating BETWEEN 1 AND 5),

    title VARCHAR(255),

    review_text TEXT,

    is_verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- NOTIFICATIONS
-- =========================================================

CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    notification_type VARCHAR(50),

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- REWARDS
-- =========================================================

CREATE TABLE IF NOT EXISTS rewards (
    id BIGSERIAL PRIMARY KEY,

    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    points INTEGER DEFAULT 0,

    reason VARCHAR(255),

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- USER ACHIEVEMENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL UNIQUE,

    description TEXT,

    icon_url TEXT
);


CREATE TABLE IF NOT EXISTS user_achievements (
    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    achievement_id INTEGER NOT NULL
        REFERENCES achievements(id) ON DELETE CASCADE,

    earned_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY(user_id, achievement_id)
);


-- =========================================================
-- SAVED POSTS
-- =========================================================

CREATE TABLE IF NOT EXISTS saved_posts (
    user_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    post_id UUID NOT NULL
        REFERENCES posts(id) ON DELETE CASCADE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY(user_id, post_id)
);


-- =========================================================
-- OTP VERIFICATION
-- =========================================================

CREATE TABLE IF NOT EXISTS otp_verifications (
    id BIGSERIAL PRIMARY KEY,

    phone VARCHAR(20) NOT NULL,

    otp_hash TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    attempts INTEGER DEFAULT 0,

    verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- EMERGENCY CONTACTS
-- =========================================================

CREATE TABLE IF NOT EXISTS emergency_contacts (
    id SERIAL PRIMARY KEY,

    country_id INTEGER
        REFERENCES countries(id) ON DELETE CASCADE,

    name VARCHAR(150) NOT NULL,

    phone VARCHAR(50),

    service_type VARCHAR(100),

    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_users_phone
ON users(phone);

CREATE INDEX IF NOT EXISTS idx_destinations_name
ON destinations(name);

CREATE INDEX IF NOT EXISTS idx_destinations_state
ON destinations(state_id);

CREATE INDEX IF NOT EXISTS idx_destinations_district
ON destinations(district_id);

CREATE INDEX IF NOT EXISTS idx_destinations_city
ON destinations(city_id);

CREATE INDEX IF NOT EXISTS idx_posts_user
ON posts(user_id);

CREATE INDEX IF NOT EXISTS idx_posts_destination
ON posts(destination_id);

CREATE INDEX IF NOT EXISTS idx_bookings_user
ON bookings(user_id);

CREATE INDEX IF NOT EXISTS idx_bookings_business
ON bookings(business_id);

CREATE INDEX IF NOT EXISTS idx_reviews_destination
ON reviews(destination_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user
ON notifications(user_id);


-- =========================================================
-- INITIAL ACHIEVEMENTS
-- =========================================================

INSERT INTO achievements
(name, description)
VALUES

(
    'First Journey',
    'Complete your first trip'
),

(
    'Explorer',
    'Visit 5 destinations'
),

(
    'Adventurer',
    'Visit 10 destinations'
),

(
    'Travel Master',
    'Visit 25 destinations'
),

(
    'India Explorer',
    'Explore multiple states of India'
),

(
    'Storyteller',
    'Publish your first travel story'
)

ON CONFLICT (name) DO NOTHING;


-- =========================================================
-- DEFAULT INDIA RECORD
-- =========================================================

INSERT INTO countries
(name, code, slug, continent)
VALUES
(
    'India',
    'IN',
    'india',
    'Asia'
)
ON CONFLICT (slug) DO NOTHING;


-- =========================================================
-- DATABASE READY
-- =========================================================