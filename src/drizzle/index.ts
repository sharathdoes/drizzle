import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, sql } from 'drizzle-orm';
import { Requests } from './schema';
import { asc, desc } from 'drizzle-orm'; // Import these for sorting

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  // 1. Basic SELECT: Get all records
  const requests = await db.select().from(Requests);
  console.log('Getting all users from the database: ', requests);

  // 2. SELECT with WHERE: Filter by condition (Pending status)
  const filteredRequests = await db
    .select()
    .from(Requests)
    .where(eq(Requests.status, 'pending'));
  console.log('Filtered requests:', filteredRequests);

  // 3. SELECT with ORDER BY: Sorting records by createdAt (descending)
  const sortedRequests = await db
    .select()
    .from(Requests)
    .orderBy(Requests.createdAt, desc()); // Corrected ordering with desc()
  console.log('Requests sorted by creation date:', sortedRequests);

  // 4. SELECT with LIMIT: Get only the first 10 records
  const limitedRequests = await db
    .select()
    .from(Requests)
    .limit(10);
  console.log('Limited requests:', limitedRequests);

  // 5. SELECT with OFFSET: Skip first 20 records for pagination
  const paginatedRequests = await db
    .select()
    .from(Requests)
    .limit(10)
    .offset(20);
  console.log('Paginated requests:', paginatedRequests);

  // 6. SELECT with WHERE + ORDER BY: Filter and sort
  const filteredAndSortedRequests = await db
    .select()
    .from(Requests)
    .where(eq(Requests.status, 'pending'))
    .orderBy(Requests.createdAt, desc()); // Fixed orderBy with desc()
  console.log('Filtered and sorted requests:', filteredAndSortedRequests);

  // 7. SELECT with WHERE + LIMIT + OFFSET: Filter with pagination
  const paginatedFilteredRequests = await db
    .select()
    .from(Requests)
    .where(eq(Requests.status, 'pending'))
    .limit(10)
    .offset(20);
  console.log('Filtered, paginated requests:', paginatedFilteredRequests);

  // 8. SELECT with LIKE: Search for pattern in the 'name' field
  const searchResults = await db
    .select()
    .from(Requests)
    .where(Requests.name.like('%John%')); // Fixed LIKE condition
  console.log('Search results:', searchResults);

  // 9. SELECT with IN: Filter by multiple statuses
  const multipleStatusesRequests = await db
    .select()
    .from(Requests)
    .where(Requests.status.in(['pending', 'completed']));
  console.log('Requests with pending or completed status:', multipleStatusesRequests);

  // 10. SELECT with DISTINCT: Get unique statuses
  const distinctStatuses = await db
    .select(Requests.status.distinct())
    .from(Requests);
  console.log('Distinct statuses:', distinctStatuses);

  // 11. SELECT with JOIN: Assuming a 'users' table exists, join with 'requests'
  // You need to define the 'Users' table for this to work.
  const requestsWithUsers = await db
    .select()
    .from(Requests)
    .innerJoin(Users, eq(Requests.userId, Users.id)); // Replace 'Users' and 'userId' with your actual table/column names
  console.log('Requests with user details:', requestsWithUsers);

  // 12. SELECT with GROUP BY: Group requests by status
  const groupedRequests = await db
    .select(Requests.status, sql<number>`count(*)`)
    .from(Requests)
    .groupBy(Requests.status);
  console.log('Grouped requests by status:', groupedRequests);

  // 13. SELECT with HAVING: Filter groups with count > 5
  const filteredGroupedRequests = await db
    .select(Requests.status, sql<number>`count(*)`)
    .from(Requests)
    .groupBy(Requests.status)
    .having(sql<number>`count(*) > 5`);
  console.log('Grouped requests with more than 5:', filteredGroupedRequests);
}

main();
