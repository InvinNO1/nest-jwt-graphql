CREATE TABLE "user"
(
    id         serial primary key,
    username   varchar(50)              not null unique ,
    full_name  varchar(100)             not null,
    password   varchar(256)             not null,
    phone      varchar                  not null,
    enabled    boolean                           default true,
    deleted    boolean                           default false,
    created_by varchar(50)              not null,
    created_at timestamp with time zone not null default now(),
    updated_by varchar(50)              not null,
    updated_at timestamp with time zone not null default now(),
    version    int                               default 1
);

INSERT INTO "user" (username, full_name, password, phone, created_by, updated_by)
VALUES ('admin', 'admin', '$2b$10$e.dIEwoxovP5ed/k6Lfq0./Skr8pPyBNls3ZA5wIpG3K3aa/Vv.Fq', '0389953200',
        'admin', 'admin');