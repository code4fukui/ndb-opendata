import { CSV } from "https://js.sabae.cc/CSV.js";
import { makeExcelList } from "./makeExcelList.js";

/*
const url = "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000177221_00014.html";
const csvfn = "ndb-opendata-09.csv";
await makeExcelList(url, csvfn);
*/

const data = await CSV.fetchJSON("index.csv");
for (const d of data) {
  console.log(d.csv);
  //if (d.csv == "ndb-opendata-09.csv") continue;
  await makeExcelList(d.url, d.csv);
}
