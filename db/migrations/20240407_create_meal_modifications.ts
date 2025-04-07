import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meal_modifications', (table) => {
    table.uuid('id').primary()
    table.uuid('meal_id').notNullable()
    table.enum('type', ['create', 'update', 'delete']).notNullable()
    table.json('meal_data').notNullable()
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meal_modifications')
}
