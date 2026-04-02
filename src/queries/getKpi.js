import { SodaClient } from "soda3-query";

const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

const getCrashesYTD = async () => {
  const today = new Date();
  const thisYearStart = new Date(today.getFullYear(), 0, 1);
  const thisYearStartStr = thisYearStart.toISOString().split("T")[0];

  const crashes = await client
    .query("h9gi-nx95")
    .select("count(*)")
    .where("crash_date", ">=", `${thisYearStartStr}T00:00:00.000`)
    .execute();

  return crashes;
};

const getLastWeekCrashes = async () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().split("T")[0];

  const crashes = await client
    .query("h9gi-nx95")
    .select("count(*)")
    .where("crash_date", ">=", `${sevenDaysAgoStr}T00:00:00.000`)
    .execute();

  return crashes;
};

const getCrashesMTD = async () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfMonthStr = startOfMonth.toISOString().split("T")[0];

  const crashes = await client
    .query("h9gi-nx95")
    .select("count(*)")
    .where("crash_date", ">=", `${startOfMonthStr}T00:00:00.000`)
    .execute();

  return crashes;
};

export { getCrashesYTD, getLastWeekCrashes, getCrashesMTD };
