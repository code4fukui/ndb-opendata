import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const url = "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000177221_00014.html";

// 1度取得したらtemp/にキャッシュする
const html = await fetchOrLoad(url);

// HTMLを解析！
const dom = HTMLParser.parse(html);

// aタグとh4タグを全部取得
const as = dom.querySelectorAll("h3, h4, a");

// リンク一覧
let category1 = "";
let category2 = "";
const items0 = as.map(i => {
  if (i.tagName == "H3") {
    category1 = i.text.trim();
    category2 = "";
    return null;
  } else if (i.tagName == "H4") {
    category2 = i.text.trim();
    return null;
  } else if (i.tagName == "A") {
    return { category1, category2, title: i.text.trim(), url: new URL(i.getAttribute("href"), url).href };
  }
}).filter(i => i);

// xlsxリンク一覧
const items = items0.filter(i => i.url?.endsWith(".xlsx"));

// サイズをタイトルから分離
items.forEach(i => {
  const n = i.title.lastIndexOf("［");
  i.size = i.title.substring(n + 1, i.title.length - 1);
  i.title = i.title.substring(0, n).trim();
});

// 一覧をCSVファイルとして保存
console.log(items, items.length);
await Deno.writeTextFile("ndb-opendata-09.csv", CSV.stringify(items));
