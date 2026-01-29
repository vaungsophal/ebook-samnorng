-- Seed file to migrate local products to Supabase 'books' table

INSERT INTO public.books (title, description, main_category, category, price, details, image_url, rating, reviews)
VALUES 
('Structural Steel Design to Eurocode 3 and AISC Specifications', 'Comprehensive guide to steel structure design', 'Construction Documents', 'Construction Documents', 49.99, 'This comprehensive book covers all aspects of structural steel design following Eurocode 3 and AISC standards. Perfect for engineers and construction professionals.', '/books/book1.png', 5, 128),

('The Behavior of Multi-Storey Steel Framed Buildings in Fire', 'Fire safety and steel frame behavior', 'M&E Documents', 'M&E Documents', 59.99, 'Deep dive into how steel structures behave during fire incidents with practical safety guidelines.', '/books/book2.png', 4, 95),

('Structural Fire Performance of Steel Portal Frame Buildings', 'Portal frame design and fire resistance', 'Architectural Documentation', 'Architectural Documentation', 47.99, 'Essential resource for designing steel portal frames with fire safety considerations.', '/books/book3.png', 5, 156),

('Steel and Composite Structures - Behavior and Design for Fire Safety', 'Composite structure design and analysis', 'Construction Documents', 'Construction Documents', 67.99, 'Complete guide to steel and composite structure design with emphasis on fire safety requirements.', '/books/book4.png', 5, 203),

('Construction Management Handbook', 'Project management and site supervision', 'Construction Management', 'Construction Management', 42.99, 'Practical handbook for construction managers covering planning, scheduling, and site management.', '/books/book1.png', 4, 87),

('Building Materials: Properties and Applications', 'Comprehensive material properties reference', 'Building Materials', 'Building Materials', 39.99, 'Detailed reference guide on building materials, their properties, and applications in construction.', '/books/book2.png', 4, 142),

('Foundation Design and Construction', 'Foundation engineering principles', 'Foundation Engineering', 'Foundation Engineering', 54.99, 'Complete guide to foundation design, soil mechanics, and construction techniques.', '/books/book3.png', 5, 118),

('Concrete Structures: Design and Construction', 'Reinforced and prestressed concrete design', 'Structural Design', 'Structural Design', 49.99, 'Comprehensive guide to reinforced concrete design with modern construction methods.', '/books/book4.png', 5, 176),

('Geotechnical Engineering Principles', 'Soil mechanics and geotechnical analysis', 'Geotechnical', 'Geotechnical', 52.99, 'Essential principles of soil mechanics and geotechnical engineering applications.', '/books/book1.png', 4, 93),

('Water Resource Engineering', 'Hydraulics and water management', 'Civil Infrastructure', 'Civil Infrastructure', 45.99, 'Practical guide to water resource management and hydraulic engineering.', '/books/book2.png', 4, 76),

('Transportation Engineering Fundamentals', 'Road and traffic engineering basics', 'Transportation', 'Transportation', 43.99, 'Comprehensive resource for transportation and road engineering professionals.', '/books/book3.png', 4, 65),

('Environmental Engineering and Sustainability', 'Environmental impact and green building', 'Environmental', 'Environmental', 40.99, 'Guide to environmental considerations in civil engineering projects and sustainable practices.', '/books/book4.png', 4, 104);
