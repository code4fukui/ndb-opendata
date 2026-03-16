# NDB Opendata
日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

NDBオープンデータ、スクレイピング＆ダウンロード in JavaScript/Deno
> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

- NDB: National Database、レセプト情報・特定健診等情報データベース、「高齢者の医療の確保に関する法律」に基づき、厚生労働省が医療費適正化計画の作成、実施及び評価のための調査や分析などに用いるデータベース
JavaScript/Deno project to scrape and download NDB (National Database) open data.

## reference
## Features
- Scrape and download NDB open data files
- Convert Excel (XLSX) files to CSV
- Search for specific keywords in the data

- [【NDB】NDBオープンデータ｜厚生労働省](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000177182.html)
## Requirements
- Deno runtime

## Usage

1. Clone the repository:
```
git clone https://github.com/taisukef/ndb-opendata.git
```

2. Install dependencies:
```
cd ndb-opendata
deno run --allow-net --allow-read --allow-write download.js
deno run --allow-net --allow-read --allow-write xls2csv.js
```

3. Run the search script:
```
deno run --allow-net --allow-read --allow-write findXLS.js
```

## Data / API
This project uses the [NDB Open Data](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000177182.html) provided by the Ministry of Health, Labour and Welfare of Japan.

## License
This project is licensed under the [MIT License](LICENSE).
