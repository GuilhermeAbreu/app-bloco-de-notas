// src/app/services/database.service.ts
import { Injectable } from '@angular/core';
import { DatabaseConnectionOrmSQlite } from '@guilhermeabreudev/capacitor-orm-sqlite';
import { MIGRATION_DB } from 'src/app/migrations';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  public initMigration() {
    DatabaseConnectionOrmSQlite.runMigrationsIfNeeded(MIGRATION_DB);
  }

}
