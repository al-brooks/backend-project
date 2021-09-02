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

-- Pulling review info from Database
SELECT
users.user_name,
reviews.title,
reviews.body,
to_char(reviews.date_created, 'MON-DD-YYYY') AS "date_created"
FROM reviews
INNER JOIN users
ON users.user_id = reviews.user_id
WHERE movie_id = '[insert movie id]'
