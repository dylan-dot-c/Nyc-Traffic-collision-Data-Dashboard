import { SodaClient } from "soda3-query";

const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

const today = new Date();
const last90 = new Date(today.setDate(today.getDate() - 90));
const last90DateStr = last90.toISOString().split("T")[0];

const getTableData = async () => {
  const result = await client
    .query("h9gi-nx95")
    .select([
      "collision_id",
      "crash_date",
      "crash_time",
      "COALESCE(borough, 'Unknown') as borough",
      "COALESCE(on_street_name, 'Unknown') as on_street_name",
      "COALESCE(number_of_persons_injured, 0) as number_of_persons_injured",
      "COALESCE(number_of_persons_killed, 0) as number_of_persons_killed",
      "COALESCE(contributing_factor_vehicle_1, 'Unknown') as contributing_factor_vehicle_1",
      "COALESCE(vehicle_type_code1, 'Unknown') as vehicle_type_code1",
    ])
    .where("crash_time", ">=", `${last90DateStr}T00:00:00.000`)
    .orderBy("crash_date", "desc")
    .limit(100)
    .execute();

  console.log("DATA RETURNED", result.data);

  return result.data;
};

export default getTableData;
