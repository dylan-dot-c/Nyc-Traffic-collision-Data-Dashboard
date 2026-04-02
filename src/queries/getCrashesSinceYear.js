import { SodaClient } from "soda3-query";

const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

// const date = new Date("2026-01-01T00:00:00.000");
// Execute a query
const crashes = await client
  .query("h9gi-nx95")
  .select("count(*)")
  .where("crash_date", ">=", "2026-01-01T00:00:00.000")
  .execute();

// console.log(results.data);

export default crashes.data;
