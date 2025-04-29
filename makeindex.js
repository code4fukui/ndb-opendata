import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { Num } from "https://js.sabae.cc/Num.js";

const url = "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000177182.html";

// 1度取得したらtemp/にキャッシュする
const html = await fetchOrLoad(url);

// HTMLを解析！
const dom = HTMLParser.parse(html);

// aタグとh4タグを全部取得
const as = dom.querySelectorAll("a");

const items = as
  .map(i => {
    const id = Num.fixnum(parseInt(i.text.match(/\d+/)), 2);
    return {
      id,
      url: new URL(i.getAttribute("href"), url).href,
      title: i.text,
      csv: "ndb-opendata-" + id + ".csv",
    };
  })
  .filter(i => i.title.endsWith("NDBオープンデータ"));

// 一覧をCSVファイルとして保存
console.log(items, items.length);
await Deno.writeTextFile("ndb-opendata.csv", CSV.stringify(items));
