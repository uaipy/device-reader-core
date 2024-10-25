-- create device table
CREATE TABLE tb_device(
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) UNIQUE NOT NULL,
  auth_token TEXT,
  active BOOLEAN NOT NULL DEFAULT 't',
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP
);

-- create message table
CREATE TABLE tb_message(
  id SERIAL PRIMARY KEY,
  device_id INT NOT NULL,
  data jsonb NOT NULL DEFAULT '{}' :: jsonb,
  message_read_date TIMESTAMP NOT NULL,
  is_synced_remotely BOOLEAN NOT NULL DEFAULT 'f',
  active BOOLEAN NOT NULL DEFAULT 't',
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP,
  FOREIGN KEY (device_id) REFERENCES tb_device (id)
);

-- insert into device table
INSERT INTO tb_device (
    name, 
    auth_token, 
    active, 
    created_at, 
    updated_at
) 
VALUES (
    'Device 01',  -- Nome do dispositivo (único)
    'a1b2c3d4e5',  -- Token de autenticação (exemplo)
    TRUE,  -- Ativo
    NOW(),  -- Data de criação (atual)
    NOW()   -- Data de atualização (atual)
);

-- insert into message table
INSERT INTO tb_message (
    device_id, 
    data, 
    message_read_date, 
    created_at, 
    updated_at, 
    active
) 
VALUES (
    1,  -- Supondo que o device_id seja 1
    '{
      "hum": 88,
      "temp": 33
    }',  -- Exemplo de dados em JSON
    '2024-10-24 12:00:00',  -- Data e hora da leitura
    NOW(),  -- Data de criação (atual)
    NOW(),  -- Data de atualização (atual)
    TRUE  -- Ativo
);


-- setar horário oficial de Brasília/São Paulo
SET
  TIMEZONE TO 'America/Sao_Paulo';

-- checar timezone
SELECT
  NOW();