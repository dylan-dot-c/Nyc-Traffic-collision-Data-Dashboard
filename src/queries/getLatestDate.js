import { SodaClient } from "soda3-query";
// import process.env

// Initialize the client
const client = new SodaClient({
  domain: "data.cityofnewyork.us",
  appToken: "xmrs8yC0GCBGmZxmjdOOUIANU", // Optional but recommended
});

const getLatestDate = async () => {
  const result = await client
    .query("h9gi-nx95")
    .select("max(crash_date)")
    .execute();

  console.log(result);

  return result.data[0];
};

export default getLatestDate;
