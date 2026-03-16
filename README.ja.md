# NDB Opendata
English README is here: [README.md](README.md)

NDBオープンデータのスクレイピングとダウンロードを行う JavaScript/Deno プロジェクトです。

## 機能

- NDBオープンデータのダウンロードとCSV形式への変換
- キーワードでNDBオープンデータのXLSXファイルを検索

## 必要環境

- JavaScript/Deno環境

## 使い方

1. リポジトリをクローンする
2. `deno run --allow-read --allow-write --allow-net download.js` を実行してデータをダウンロードする
3. `deno run findXLS.js [キーワード]` を実行してキーワードに合致するXLSXファイルを検索

## データ・API

- [【NDB】NDBオープンデータ｜厚生労働省](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000177182.html)

## ライセンス
このプロジェクトは [MIT License](LICENSE) のもとで公開されています。
