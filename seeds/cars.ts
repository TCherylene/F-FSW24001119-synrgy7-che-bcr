import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // 1 = small
    // 2 = medium
    // 3 = large

    // Inserts seed entries
    await knex("cars").insert([
        {name: "Toyota", price: 100000, photo: "https://via.placeholder.com/150", category: 1, start_rent: new Date(), finish_rent: new Date()},
        {name: "Honda", price: 200000, photo: "https://via.placeholder.com/150", category: 2, start_rent: new Date(), finish_rent: new Date()},
        {name: "Suzuki", price: 300000, photo: "https://via.placeholder.com/150", category: 3, start_rent: new Date(), finish_rent: new Date()},
    ]);
};
