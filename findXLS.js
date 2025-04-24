import { XLSX } from "https://taisukef.github.io/sheetjs-es/es/XLSX.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { ObjectUtil } from "./ObjectUtil.js";

const findXLS = async (fn, key) => {
  const bin = await Deno.readFile(fn);
  const ws = XLSX.decode(bin);
  const sheets = Object.keys(ws.Sheets);
  const res = [];
  for (const sheet of sheets) {
    const sh = ws.Sheets[sheet];
    if (ObjectUtil.find(sh, key)) {
      res.push({ fn, sheet });
    }
  }
  return res;
};

const extractFilename = (url) => {
  const n = url.lastIndexOf("/");
  return url.substring(n + 1);
};

const keyword = "糖尿病";
const list = await CSV.fetchJSON("ndb-opendata-09.csv");
for (const item of list) {
  const fn = "download/09/" + extractFilename(item.url);
  //console.log(fn)
  //await xlsx2csv(fn);
  const res = await findXLS(fn, keyword);
  if (res.length > 0) {
    console.log(item.category1, item.category2, item.title, res);
  }
}
