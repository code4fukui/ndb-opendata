import { CSV } from "https://js.sabae.cc/CSV.js";
import { sleep } from "https://js.sabae.cc/sleep.js";
import { rnd } from "https://js.sabae.cc/rnd.js";

const download = async (id) => {
  const path = "download/" + id;
  await Deno.mkdir(path, { recursive: true });
  const items = await CSV.fetchJSON("ndb-opendata-" + id + ".csv");
  for (const item of items) {
    const fn = item.url.substring(item.url.lastIndexOf("/") + 1);
    console.log(fn);
    const bin = await (await fetch(item.url)).bytes();
    await Deno.writeFile(path + "/" + fn, bin);
    await sleep(50 + rnd(200));
  }
};

const data = await CSV.fetchJSON("index.csv");
for (const d of data) {
  console.log(d.csv);
  await download(d.id);
}

// await download("09");
