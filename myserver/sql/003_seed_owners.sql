INSERT INTO owners (first_name, last_name, address, city, telephone)
VALUES
  ('George',  'Franklin',  '110 W. Liberty St.',  'Madison',     '6085551023'),
  ('Betty',   'Davis',     '638 Cardinal Ave.',   'Sun Prairie', '6085551749'),
  ('Eduardo', 'Rodriquez', '2693 Commerce St.',   'McFarland',   '6085558763'),
  ('Harold',  'Davis',     '563 Friendly St.',    'Windsor',     '6085553198'),
  ('Peter',   'McTavish',  '2387 S. Fair Way',    'Madison',     '6085552765'),
  ('Jean',    'Coleman',   '105 N. Lake St.',     'Monona',      '6085552654')
ON CONFLICT DO NOTHING;
