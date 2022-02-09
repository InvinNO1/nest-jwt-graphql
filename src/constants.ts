import { LogLevel } from '@nestjs/common'

export const APP_PORT = process.env.APP_PORT
  ? Number(process.env.APP_PORT)
  : 3000
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_HOST = process.env.DB_HOST
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432
export const DB_SCHEMA = process.env.DB_SCHEMA
export const DB_LOGGING = process.env.DB_LOGGING === 'true'

export const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 60

export const LOG_LEVEL = (process.env.LOG_LEVEL?.split(',') || [
  'error',
  'warn',
]) as LogLevel[]

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
