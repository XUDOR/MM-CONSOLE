-- Drop the table if it already exists
DROP TABLE IF EXISTS projects;

-- Create the table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    image_name VARCHAR(255),
    date DATE,
    materials TEXT,
    location TEXT,
    attributes JSONB,
    comment TEXT
);

-- Optionally insert some test data
INSERT INTO projects (project_name, image_name, date, materials, location, attributes, comment)
VALUES 
('Sample Project 1', 'image1.jpg', '2024-12-20', 'Wood, Metal', 'Vancouver', '{"color": "blue", "size": "large"}', 'This is a sample project.'),
('Sample Project 2', 'image2.jpg', '2024-12-21', 'Plastic, Steel', 'Toronto', '{"color": "red", "size": "medium"}', 'Another sample project.');
