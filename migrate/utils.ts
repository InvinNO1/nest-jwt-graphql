import { readdirSync, readFileSync } from 'fs'
import { MigrationInterface, QueryRunner } from 'typeorm'

const readQuery = (path: string) => {
  let queryString
  try {
    queryString = readFileSync(`${__dirname}/sql/${path}`, {
      encoding: 'utf8',
      flag: 'r',
    })
  } catch (e) {
    console.error(e)
  }
  if (queryString) {
    return queryString.split(';\n')
  } else {
    return []
  }
}

class BMigration implements MigrationInterface {
  name: string

  constructor(name: string) {
    this.name = name
  }

  public up(queryRunner: QueryRunner) {
    return this.runQuery('up/', queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return this.runQuery('down/', queryRunner)
  }

  private async runQuery(type: string, queryRunner: QueryRunner) {
    const queryList = readQuery(`${type}${this.name}`)
    for (const query of queryList) {
      await queryRunner.query(query)
    }
  }
}

export function getMigrate(currentVersion?: number) {
  const migrateFiles = readdirSync(`${__dirname}/sql/up`)
  if (migrateFiles) {
    const versionList = []
    const migrateList = []
    migrateFiles.forEach((file) => {
      if (/^\d{11}\.sql$/.test(file)) {
        const version = Number(file.replace('.sql', ''))
        if (currentVersion == null || version <= currentVersion) {
          versionList.push(version)
          migrateList.push(new BMigration(file))
        }
      }
    })
    console.log('VERSION LIST')
    console.log(versionList)
    return migrateList
  } else {
    return []
  }
}
