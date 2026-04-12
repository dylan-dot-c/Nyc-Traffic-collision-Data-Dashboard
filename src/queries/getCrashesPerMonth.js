import { SodaClient } from "soda3-query";
// import process.env

// Initialize the client
const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

/**
 *  @param {Date} currentMaxDate


*/

const getCrashesPerMonth = async () => {
  const lastYear = new Date();
  lastYear.setMonth(lastYear.getMonth() - 12);
  const lastYearISODate = lastYear.toISOString().split("T")[0];
  const query = client
    .query("h9gi-nx95")
    .select([
      "count(collision_id) AS crash_count",
      "date_trunc_ym(crash_date) AS month",
    ])
    .where("crash_date", ">=", `${lastYearISODate}`)
    .groupBy("date_trunc_ym(crash_date)")
    .orderBy("date_trunc_ym(crash_date)", "ASC")
    .limit(12);

  const result = await query.execute();
  console.log(result);

  return result;
};

export default getCrashesPerMonth;
