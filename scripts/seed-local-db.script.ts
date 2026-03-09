import * as schema from "../server/db/schema";
import { db, pool } from "../server/db/index";
import { seed } from "drizzle-seed";

const seedDB = async () => {
  await seed(db, schema).refine((f) => ({
    todos: {
      columns: {
        title: f.valuesFromArray({
          values: ["Buy Groceries", "read a book", "call mom"],
        }),
        description: f.valuesFromArray({
          values: ["at 5pm", "weekly", "carefully", undefined],
        }),
      },
    },
  }));
};

seedDB()
  .then(() => {
    console.log("database seeded successfully");
    return pool.end();
  })
  .catch((err) => {
    console.error(`failed to seed the database\n${err}`);
    return pool.end();
  });
