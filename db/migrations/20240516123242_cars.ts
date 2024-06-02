import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.integer('price').notNullable();
        table.text('photo').notNullable();
        table.integer('category').notNullable();
        table.datetime('start_rent').notNullable();
        table.datetime('finish_rent').notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('active').defaultTo(true);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars');
}