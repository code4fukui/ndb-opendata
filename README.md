# NDB Opendata

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

NDBオープンデータ、スクレイピング＆ダウンロード in JavaScript/Deno

A collection of Deno scripts to scrape, download, and process Japan's NDB (National Database of Health Insurance Claims and Specific Health Checkups) Open Data.

-   **NDB**: National Database. Based on the "Act on Assurance of Medical Care for the Elderly," the Ministry of Health, Labour and Welfare (MHLW) uses this database for research and analysis to create, implement, and evaluate medical cost optimization plans.

## Data Source

-   [【NDB】NDBオープンデータ｜厚生労働省](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000177182.html)

## Features

-   Scrapes the main MHLW page to create an index of all NDB data releases.
-   Scrapes individual release pages to get a list of all `.xlsx` file URLs.
-   Downloads all `.xlsx` files and organizes them into directories by release number.
-   Converts the complex, multi-header Excel files into clean, analysis-ready CSV files.
-   Provides a utility script to search for keywords within all downloaded Excel files.

## Prerequisites

This project requires [Deno](https://deno.land/). Please follow the official installation instructions.

## Usage

The scripts are designed to be run in sequence to build a local copy of the NDB Open Data. The `-A` flag grants the necessary permissions (read, write, net) for the scripts to run.

### 1. Create the Main Data Index

This script scrapes the main NDB Open Data page to find all available data releases.

```sh
deno run -A makeindex.js
```

This creates a file named `ndb-opendata.csv`. Rename it to `index.csv` for the other scripts to use.

```sh
mv ndb-opendata.csv index.csv
```

### 2. Generate Detailed File Lists

This script iterates through `index.csv` and scrapes each data release page to get a list of all individual `.xlsx` files.

```sh
deno run -A makecsv.js
```

This will generate several CSV files, one for each release (e.g., `ndb-opendata-09.csv`).

### 3. Download All Excel Files

This script reads the file lists generated in the previous step and downloads all `.xlsx` files.

```sh
deno run -A download.js
```

Files will be saved to the `download/` directory, organized in subdirectories by their release ID (e.g., `download/09/`).

### 4. Convert Excel to CSV

The `xls2csv.js` script can be used to convert the downloaded `.xlsx` files into cleaned CSVs. You will need to modify the script to specify which files to process. The script performs significant data cleaning, such as restructuring headers and formatting values.

```sh
# Modify xls2csv.js to target the desired files, then run:
deno run -A xls2csv.js
```

Cleaned CSV files will be saved to the `data/` directory.

### Utility: Search for Keywords

You can search for a keyword across all downloaded `.xlsx` files. The default keyword is "糖尿病" (diabetes).

```sh
# Search for the default keyword
deno run -A findXLS.js

# Search for a custom keyword (e.g., "高血圧" - hypertension)
deno run -A findXLS.js "高血圧"
```

The script will output the file path, sheet name, and metadata for any matching files.

## Project Structure

-   `/download`: Stores the original `.xlsx` files downloaded from the MHLW website.
-   `/data`: Stores the processed and cleaned `.csv` files.
-   `/temp`: Caches downloaded HTML pages to speed up subsequent script runs.

## License

This project is available under the MIT License.