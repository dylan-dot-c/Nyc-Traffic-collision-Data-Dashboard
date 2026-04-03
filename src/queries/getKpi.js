import { SodaClient } from "soda3-query";

const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

const today = new Date();
const last90 = new Date(today.setDate(today.getDate() - 90));
const last90DateStr = last90.toISOString().split("T")[0];

const getCrashesYTD = async () => {
  const crashes = await client
    .query("h9gi-nx95")
    .select("count(*)")
    .where("crash_date", ">=", `${last90DateStr}T00:00:00.000`)
    .execute();

  console.log(crashes);
  return crashes.data[0].count;
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

const getInjuredYTD = async () => {
  const crashes = await client
    .query("h9gi-nx95")
    .select([
      "sum(number_of_persons_injured) as injuries",
      "sum(number_of_persons_killed) as lives_lost",
    ])
    .where("crash_date", ">=", `${last90DateStr}T00:00:00.000`)
    .execute();

  return crashes.data[0];
};

const getMostDangerousBoroughYTD = async () => {
  const result = await client
    .query("h9gi-nx95")
    .select(["borough", "count(*)"])
    .groupBy("borough")
    .orderBy("count", "DESC")
    .where("crash_date", ">=", `${last90DateStr}T00:00:00.000`)
    .execute();

  return result.data[0];
};

const getMostContributingFactor = async () => {
  const result = await client
    .query("h9gi-nx95")
    .select(["contributing_factor_vehicle_1", "count(*)"])
    .groupBy("contributing_factor_vehicle_1")
    .orderBy("count", "DESC")
    .where("crash_date", ">=", `${last90DateStr}T00:00:00.000`)
    .where("contributing_factor_vehicle_1", "!=", "Unspecified")
    .execute();

  return result;
};

export {
  getCrashesYTD,
  getLastWeekCrashes,
  getCrashesMTD,
  getInjuredYTD,
  getMostDangerousBoroughYTD,
  getMostContributingFactor,
};
