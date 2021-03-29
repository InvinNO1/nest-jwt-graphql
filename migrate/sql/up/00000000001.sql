CREATE TABLE "user"
(
    id         SERIAL PRIMARY KEY       NOT NULL,
    password   varchar(256)             NOT NULL,
    username   varchar(50)              NOT NULL,
    full_name  varchar(100)             NOT NULL,
    phone      varchar(10)              NOT NULL,
    enabled    BOOL                              DEFAULT TRUE,
    created_by varchar(50)              NULL,
    created_at timestamp with time zone NOT NULL default now(),
    updated_by varchar(50)              NULL,
    updated_at timestamp with time zone NOT NULL default now(),
    version    int                               default 1
);