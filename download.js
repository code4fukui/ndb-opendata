import { CSV } from "https://js.sabae.cc/CSV.js";

const items = await CSV.fetchJSON("ndb-opendata-09.csv");

for (const item of items) {
  const fn = item.url.substring(item.url.lastIndexOf("/") + 1);
  console.log(fn);
  const bin = await (await fetch(item.url)).bytes();
  await Deno.writeFile("download/09/" + fn, bin);
}
