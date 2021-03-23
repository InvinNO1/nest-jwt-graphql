CREATE TABLE "user"
(
    id         SERIAL PRIMARY KEY NOT NULL,
    password   varchar(256)       NOT NULL,
    username   varchar(50)        NOT NULL,
    full_name  varchar(100)       NOT NULL,
    enabled    BOOL                        DEFAULT FALSE,
    created_by varchar(50)        NOT NULL,
    created_at TIMESTAMP          NOT NULL default now(),
    updated_by varchar(50)        NOT NULL,
    updated_at TIMESTAMP          NOT NULL default now(),
    version    int                         default 1
);