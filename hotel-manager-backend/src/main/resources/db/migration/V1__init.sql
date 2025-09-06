CREATE TABLE room (
  id BIGSERIAL PRIMARY KEY,
  number INT NOT NULL,
  type VARCHAR(16) NOT NULL,
  has_minibar BOOLEAN NOT NULL,
  available BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at TIMESTAMP NULL
);

-- Uniqueness only for active (non-deleted) rows
CREATE UNIQUE INDEX uk_room_number_active ON room (number) WHERE deleted = FALSE;
