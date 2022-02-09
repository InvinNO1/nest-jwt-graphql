import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { getMigrate } from './utils'
import { config } from 'dotenv'
import { Connection } from 'typeorm/connection/Connection'
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'

function loadEnv() {
  if (['dev', 'aws'].includes(process.env.APP_ENV)) {
    console.log(`START ON ${process.env.APP_ENV} MODE`)
    config({ path: __dirname + `/../${process.env.APP_ENV}.env` })
  }
}

function getVersion() {
  let version = process.argv[2]
  if (version === '0' || version == null) return version
  version = `00000000000${process.argv[2]}`
  return version.substr(version.length - 11)
}

async function run(version: string) {
  let connection
  try {
    connection = await createConnection({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      logging: true,
      synchronize: false,
    } as ConnectionOptions)
    await migrate(connection, version)
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    if (connection) {
      await connection.close()
    }
  }
}

async function migrate(connection: Connection, version: string) {
  const schema = process.env.DB_SCHEMA
  await connection.query(`create schema if not exists ${schema}`)
  await connection.query(`set search_path = "${schema}"`)
  if (version == null) {
    connection.migrations.push(...getMigrate())
    await connection.runMigrations()
  } else {
    const nVersion = Number(version)
    if (nVersion < 0 || nVersion > 99999999999) {
      throw `Version ${version} is not exist`
    } else {
      const diff = await connection.query(
        'select count(*) from migrations m where m.timestamp >= $1',
        [nVersion],
      )
      const diffCount = diff ? Number(diff[0].count) : null
      if (diffCount == null || diffCount === 0) {
        connection.migrations.push(...getMigrate(nVersion))
        await connection.runMigrations()
      } else if (diffCount > 0) {
        connection.migrations.push(...getMigrate())
        for (let i = nVersion === 0 ? 0 : 1; i < diffCount; i++) {
          await connection.undoLastMigration()
        }
      }
    }
  }
}

// main process
loadEnv()
const version = getVersion()
run(version)
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
