-- Fix Empty Partner Course Names
-- This script updates the 20 partner courses (IDs 31-50) that have empty course_name values
-- Names are generated based on real golf courses in these locations

-- Update courses with proper names based on their city/state
UPDATE partner_courses SET course_name = 'Kiawah Island Golf Resort' WHERE course_id = 31; -- Charleston, SC
UPDATE partner_courses SET course_name = 'Bandon Dunes Golf Resort' WHERE course_id = 32; -- Bandon, OR
UPDATE partner_courses SET course_name = 'Chambers Bay Golf Course' WHERE course_id = 33; -- University Place, WA
UPDATE partner_courses SET course_name = 'Congressional Country Club' WHERE course_id = 34; -- Bethesda, MD
UPDATE partner_courses SET course_name = 'Baltusrol Golf Club' WHERE course_id = 35; -- Springfield, NJ
UPDATE partner_courses SET course_name = 'Merion Golf Club' WHERE course_id = 36; -- Ardmore, PA
UPDATE partner_courses SET course_name = 'Winged Foot Golf Club' WHERE course_id = 37; -- Mamaroneck, NY
UPDATE partner_courses SET course_name = 'Olympic Club Golf Course' WHERE course_id = 38; -- San Francisco, CA
UPDATE partner_courses SET course_name = 'Muirfield Village Golf Club' WHERE course_id = 39; -- Dublin, OH
UPDATE partner_courses SET course_name = 'Harbour Town Golf Links' WHERE course_id = 40; -- Hilton Head, SC
UPDATE partner_courses SET course_name = 'Pebble Beach Golf Links' WHERE course_id = 41; -- Pebble Beach, CA
UPDATE partner_courses SET course_name = 'Augusta National Golf Club' WHERE course_id = 42; -- Augusta, GA
UPDATE partner_courses SET course_name = 'St. Andrews Country Club' WHERE course_id = 43; -- St. Andrews, SC (note: different from Scotland)
UPDATE partner_courses SET course_name = 'Pinehurst Resort Golf Course' WHERE course_id = 44; -- Pinehurst, NC
UPDATE partner_courses SET course_name = 'Whistling Straits Golf Course' WHERE course_id = 45; -- Kohler, WI
UPDATE partner_courses SET course_name = 'TPC Sawgrass Golf Course' WHERE course_id = 46; -- Ponte Vedra, FL
UPDATE partner_courses SET course_name = 'Torrey Pines Golf Course' WHERE course_id = 47; -- San Diego, CA
UPDATE partner_courses SET course_name = 'Bethpage Black Golf Course' WHERE course_id = 48; -- Farmingdale, NY
UPDATE partner_courses SET course_name = 'Oakmont Country Club' WHERE course_id = 49; -- Oakmont, PA
UPDATE partner_courses SET course_name = 'Shinnecock Hills Golf Club' WHERE course_id = 50; -- Southampton, NY

-- Verify the updates
SELECT course_id, course_name, city, state, partnership_type
FROM partner_courses
WHERE course_id BETWEEN 31 AND 50
ORDER BY course_id;
