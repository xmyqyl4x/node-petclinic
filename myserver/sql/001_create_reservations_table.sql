CREATE TABLE IF NOT EXISTS reservations (
  id BIGSERIAL PRIMARY KEY,
  pet_name VARCHAR(120) NOT NULL,
  pet_type VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service_type VARCHAR(120),
  doctor VARCHAR(120),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  reminder BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservations_appointment_date
  ON reservations (appointment_date);

CREATE INDEX IF NOT EXISTS idx_reservations_created_at
  ON reservations (created_at DESC);
