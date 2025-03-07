CREATE DATABASE IF NOT EXISTS pet_adoption;

USE pet_adoption;

CREATE TABLE IF NOT EXISTS Pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('Dog', 'Cat') NOT NULL,
  breed VARCHAR(255),
  dob DATE, 
  gender ENUM('Male','Female'),
  description TEXT,
  imageUrl VARCHAR(512),
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  joinDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Pets (name, type, breed, dob, gender, description, imageUrl, latitude, longitude, joinDate) VALUES
  ('Buddy', 'Dog', 'Golden Retriever', '2020-05-12', 'Male', 'Friendly and loves to play fetch.', 'https://placedog.net/400/300', 40.7128, -74.0060, '2024-01-15 10:30:00'),
  ('Luna', 'Cat', 'Siamese', '2019-08-23', 'Female', 'Elegant and vocal, loves attention.', 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', 34.0522, -118.2437, '2024-02-10 14:15:00'),
  ('Max', 'Dog', 'Labrador', '2021-03-17', 'Male', 'Energetic and great with kids.', 'https://placedog.net/500/400', 51.5074, -0.1278, '2024-03-01 09:45:00'),
  ('Mittens', 'Cat', 'Maine Coon', '2018-11-30', 'Female', 'Fluffy and affectionate.', 'https://cdn2.thecatapi.com/images/9cf.jpg', 41.8781, -87.6298, '2023-12-20 16:20:00'),
  ('Rocky', 'Dog', 'German Shepherd', '2022-01-09', 'Male', 'Loyal and protective.', 'https://placedog.net/600/450', 37.7749, -122.4194, '2024-04-05 12:00:00'),
  ('Whiskers', 'Cat', 'Tabby', '2020-07-14', 'Male', 'Curious and loves to explore.', 'https://cdn2.thecatapi.com/images/MjAxNDAyOA.jpg', 48.8566, 2.3522, '2024-01-25 11:10:00'),
  ('Daisy', 'Dog', 'Beagle', '2019-12-25', 'Female', 'Sweet and loves to sniff around.', 'https://placedog.net/350/250', 33.7490, -84.3880, '2023-11-15 08:50:00'),
  ('Shadow', 'Cat', 'Persian', '2021-06-03', 'Male', 'Calm and enjoys lounging.', 'https://cdn2.thecatapi.com/images/3df.jpg', 35.6762, 139.6503, '2024-02-28 15:30:00'),
  ('Rex', 'Dog', 'Bulldog', '2020-09-18', 'Male', 'Stubborn but lovable.', 'https://placedog.net/450/350', 42.3601, -71.0589, '2024-03-10 13:25:00'),
  ('Bella', 'Cat', 'Ragdoll', '2017-04-22', 'Female', 'Gentle and loves cuddles.', 'https://cdn2.thecatapi.com/images/7is.jpg', 52.5200, 13.4050, '2023-10-05 17:00:00'),
  ('Charlie', 'Dog', 'Poodle', '2021-11-11', 'Male', 'Smart and playful.', 'https://placedog.net/500/500', 29.7604, -95.3698, '2024-05-01 09:15:00'),
  ('Snowball', 'Cat', 'Birman', '2019-02-28', 'Female', 'Soft fur and blue eyes.', 'https://cdn2.thecatapi.com/images/MTUzODA3MA.jpg', 47.6062, -122.3321, '2024-03-20 14:40:00'),
  ('Tucker', 'Dog', 'Husky', '2020-10-05', 'Male', 'Adventurous and vocal.', 'https://placedog.net/400/400', 39.9526, -75.1652, '2024-02-15 10:00:00'),
  ('Coco', 'Cat', 'Sphynx', '2022-03-19', 'Female', 'Hairless and loves warmth.', 'https://cdn2.thecatapi.com/images/6df.jpg', 43.6532, -79.3832, '2024-04-10 12:30:00'),
  ('Duke', 'Dog', 'Boxer', '2018-07-07', 'Male', 'Strong and goofy.', 'https://placedog.net/600/500', 36.1699, -115.1398, '2023-09-25 11:55:00'),
  ('Lily', 'Cat', 'Calico', '2021-01-15', 'Female', 'Colorful and independent.', 'https://cdn2.thecatapi.com/images/MjAyMjAyMg.jpg', 40.4168, -3.7038, '2024-01-30 16:00:00'),
  ('Scout', 'Dog', 'Border Collie', '2019-05-20', 'Male', 'Intelligent and active.', 'https://placedog.net/450/300', 38.9072, -77.0369, '2024-03-25 08:20:00'),
  ('Pippin', 'Cat', 'Bengal', '2020-12-10', 'Male', 'Wild-looking and energetic.', 'https://cdn2.thecatapi.com/images/9cd.jpg', 55.7558, 37.6173, '2024-02-05 13:45:00'),
  ('Rusty', 'Dog', 'Dachshund', '2021-08-30', 'Male', 'Long body and big personality.', 'https://placedog.net/500/350', 32.7157, -117.1611, '2024-04-15 15:10:00'),
  ('Sasha', 'Cat', 'Scottish Fold', '2018-03-27', 'Female', 'Cute ears and playful.', 'https://cdn2.thecatapi.com/images/MTUyNDQ1Nw.jpg', 59.3293, 18.0686, '2023-12-10 10:25:00');
