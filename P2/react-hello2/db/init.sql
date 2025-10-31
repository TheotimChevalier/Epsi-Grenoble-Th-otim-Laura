CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  value INT NOT NULL
);
INSERT INTO items (name, value) VALUES
  ('alpha', 10),
  ('beta', 20),
  ('gamma', 30),
  ('delta', 40),
  ('epsilon', 50);
