import { XLSX } from "https://taisukef.github.io/sheetjs-es/es/XLSX.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { Num } from "https://code4fukui.github.io/Num/Num.js";

const extractFilename = (url) => {
  const n = url.lastIndexOf("/");
  return url.substring(n + 1);
};

const fixCSV = (csv, info) => {
  if (info.indexOf("特定健診 ") >= 0) {
    csv.splice(0, 1);
    let mf = "";
    for (let i = 2; i < csv[0].length; i++) {
      if (csv[2][i] === "") continue;
      if (csv[1][i] !== "") mf = csv[1][i];
      csv[0][i] = mf + csv[2][i]; 
    }
    csv.splice(1, 3);
  } else {
    for (let i = 0; i < csv[2].length; i++) {
      if (csv[2][i] === "") {
        csv[2][i] = csv[1][i];
      }
    }
    csv.splice(0, 2);
  }

  // remove cr in name
  for (let i = 0; i < csv[0].length; i++) {
    csv[0][i] = csv[0][i].replace(/\s/g, "");
  }
  // remove comma in value
  const repnames = [
    "分類コード", "分類名称", "診療行為コード", "診療行為",
    "加算",
    "都道府県名", "二次医療圏番号", "二次医療圏名",
  ];
  for (let j = 0; j < csv[0].length; j++) {
    const name = csv[0][j];
    if (repnames.indexOf(name) >= 0) {
      for (let i = 1; i < csv.length; i++) {
        if (csv[i][j] === "" && csv[i][0] !== "二次医療圏判別不可") {
          csv[i][j] = csv[i - 1][j];
        }
      }
    } else {
      for (let i = 1; i < csv.length; i++) {
        csv[i][j] = Num.removeComma(csv[i][j]);
      }
    }
  }
  // remove null columns
  const remc = [];
  A: for (let i = 0; i < csv[0].length; i++) {
    for (let j = 0; j < csv.length; j++) {
      if (csv[j][i]) continue A;
    }
    remc.push(i);
  }
  for (let i = 0; i < csv.length; i++) {
    let d = 0;
    for (const r of remc) {
      csv[i].splice(r - d, 1);
      d++;
    }
  }
};

const xlsx2csv = async (fn) => {
  const bin = await Deno.readFile(fn);
  const ws = XLSX.decode(bin);
  const sheets = Object.keys(ws.Sheets);
  const res = [];
  let idx = 0;
  for (const sheet of sheets) {
    const sh = ws.Sheets[sheet];
    const data = XLSX.toCSV(sh);
    const info = data[0][0];
    fixCSV(data, info);
    const fn0 = fn.replace("download/", "data/");
    const fn2 = fn0.substring(0, fn0.lastIndexOf(".")) + "_" + idx++ + ".csv";
    await Deno.writeTextFile(fn2, CSV.encode(data));
    res.push({ idx, fn, sheet, csv: fn2, info });
    break; // todo
  }
  return res;
};

/*
const list = await CSV.fetchJSON("ndb-opendata-09.csv");
for (const item of list) {
  const fn = "download/09/" + extractFilename(item.url);
  console.log(fn)
  await xlsx2csv(fn);
  break;
}
*/

const updateCSVFile = async (csvfn, list, id) => {
  const data = await CSV.fetchJSON(csvfn, []);
  for (const item of list) {
    const n = data.findIndex(i => i[id] == item[id]);
    if (n >= 0) {
      data[n] = item;
    } else {
      data.push(item);
    }
  }
  await Deno.writeTextFile(csvfn, CSV.stringify(data));
};

/*
// 糖尿病
const fn = "download/09/001258403.xlsx";
const list = await xlsx2csv(fn);
await Deno.writeTextFile("ndb-opendata-sheets-09.csv", CSV.stringify(list));
*/


/*
特定健診　質問票
const fn = "download/09/001258862.xlsx";
const list = await xlsx2csv(fn);
await updateCSVFile("ndb-opendata-sheets-09.csv", list, "csv");
*/

const id = "09";
const list = await CSV.fetchJSON("ndb-opendata-" + id + ".csv");
for (const item of list) {
  if (item.category1 != "特定健診　質問票") continue;
  const fn = "download/" + id + "/" + extractFilename(item.url);
  const csv = await xlsx2csv(fn);
  await updateCSVFile("ndb-opendata-sheets-09.csv", csv, "csv");
}
