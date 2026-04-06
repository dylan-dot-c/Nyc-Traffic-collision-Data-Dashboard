import { SodaClient } from "soda3-query";

const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

const getTableData = async (borough, crashDate) => {
  const date = new Date(crashDate);
  const dateStr = date.toISOString().split("T")[0];

  let query = client
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
    .where("crash_date", "=", `${dateStr}T00:00:00.000`)
    .orderBy("crash_date", "desc")
    .orderBy("crash_time", "desc")
    .limit(100);

  if (borough != "") {
    query = query.where("borough", "=", borough);
  }

  // now fetch data
  const result = await query.execute();

  return result.data;
};

export default getTableData;
