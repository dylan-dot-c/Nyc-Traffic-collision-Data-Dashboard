import { SodaClient } from "soda3-query";

const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

const getCrash = async (crashID) => {
  const query = client
    .query("h9gi-nx95")
    .select([
      "borough AS borough",
      "collision_id AS collisionId",
      "contributing_factor_vehicle_1 AS contributingFactorVehicle1",
      "crash_date AS crashDate",
      "crash_time AS crashTime",
      "latitude AS latitude",
      "longitude AS longitude",
      "number_of_cyclist_injured AS numberOfCyclistInjured",
      "number_of_cyclist_killed AS numberOfCyclistKilled",
      "number_of_motorist_injured AS numberOfMotoristInjured",
      "number_of_motorist_killed AS numberOfMotoristKilled",
      "number_of_pedestrians_injured AS numberOfPedestriansInjured",
      "number_of_pedestrians_killed AS numberOfPedestriansKilled",
      "number_of_persons_injured AS numberOfPersonsInjured",
      "number_of_persons_killed AS numberOfPersonsKilled",
      "off_street_name AS offStreetName",
      "on_street_name AS onStreetName",
      "vehicle_type_code1 AS vehicleTypeCode1",
    ])
    .where("collision_id", "=", crashID)
    .limit(1);

  const result = await query.execute();
  console.log(result);
  return result;
};

export default getCrash;
