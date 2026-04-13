import { SodaClient } from "soda3-query";
// import process.env

// Initialize the client
const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

// Execute a query
const results = await client
  .query("h9gi-nx95")
  .select(["crash_date", "crash_time", "borough"])
  .where("crash_date", ">=", "2026-03-01T00:00:00.000")
  .limit(100)
  .offset(0)
  .execute();

console.log(results.data);

export default results.data;
