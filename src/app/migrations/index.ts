import { IMigrationDatabaseOrmSQLite } from '@guilhermeabreudev/capacitor-orm-sqlite';
import { CREATE_TABLE_NOTES_20250416 } from './20250416-create-table-notes';

const MIGRATION_DB: IMigrationDatabaseOrmSQLite[] = [
  {
    version: 1,
    sql: [
      CREATE_TABLE_NOTES_20250416,
    ],
  },
]

export {
  MIGRATION_DB
};

