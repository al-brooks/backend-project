-- create users table
CREATE TABLE users (
  	user_id SERIAL PRIMARY KEY,
  	first_name VARCHAR(30),
  	last_name VARCHAR(30),
  	user_name TEXT UNIQUE,
  	user_email TEXT UNIQUE,
  	user_password VARCHAR(300)
  )

CREATE TABLE reviews (
	review_id SERIAL PRIMARY KEY,
	movie_id VARCHAR(20),
  	title VARCHAR (200),
  	body TEXT,
  	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	is_published BOOLEAN DEFAULT TRUE,
  	user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE
)

CREATE TABLE comments (
	comment_id SERIAL PRIMARY KEY,
  	title VARCHAR (200),
  	body TEXT,
  	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	is_published BOOLEAN DEFAULT TRUE,
  	user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
  	review_id INTEGER REFERENCES reviews (review_id) ON DELETE CASCADE
)

-- Added column to users table
ALTER TABLE users
ADD COLUMN user_email TEXT UNIQUE

-- Delete all test users from users table
DELETE FROM users