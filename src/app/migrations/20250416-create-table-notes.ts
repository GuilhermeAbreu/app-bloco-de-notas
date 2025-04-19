import { QueryBuildOrmSQlite } from '@guilhermeabreudev/capacitor-orm-sqlite'
import { Note } from '../model/note.model'

const CREATE_TABLE_NOTES_20250416 = new QueryBuildOrmSQlite(Note)
  .createTable([
    {
      name: 'id',
      type: 'INTEGER',
      primaryKey: true,
      autoIncremente: true,
    },
    {
      name: 'title',
      type: 'TEXT',
      notNull: true,
    },
    {
      name: 'description',
      type: 'TEXT',
    },
    {
      name: 'imagePath',
      type: 'TEXT',
    },
    {
      name: 'notifyAt',
      type: 'DATE',
    },
  ])

  export {
  CREATE_TABLE_NOTES_20250416
}
