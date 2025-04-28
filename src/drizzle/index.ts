import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { Requests } from "./schema"
  
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const request: typeof Requests.$inferInsert = {
    name: 'John',
    email: 'john@example.com',
    message: 'Hello, this is a test message!',
    status: 'pending',
    response: null,
  };

  await db.insert(Requests).values(request);
  console.log('New user created!')

  const requests = await db.select().from(Requests);
  console.log('Getting all users from the database: ', requests)

  await db
    .update(Requests)
    .set({
      email: "sharath@gmail.com"
    })
    .where(eq(Requests.email, request.email));
  console.log('User info updated!')

}

main();
