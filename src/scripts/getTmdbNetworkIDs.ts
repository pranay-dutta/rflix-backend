import https from "https";
import fs from "fs";
import zlib from "zlib";
import readline from "readline";

const date = new Date();
date.setDate(date.getDate() - 1);
const [year, month, day] = date
  .toISOString()
  .split("T")[0]
  .replace(/-/g, "_")
  .split("_");

const FILE_DATE = `${month}_${day}_${year}`;
const url = `https://files.tmdb.org/p/exports/tv_network_ids_${FILE_DATE}.json.gz`;

const outputGz = "tv_network_ids.json.gz";
const outputJson = "tv_network_ids.json";

const options = {
  headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
};

https
  .get(url, options, (res) => {
    if (res.statusCode !== 200) {
      console.error("Failed:", res.statusCode);
      return;
    }

    const fileStream = fs.createWriteStream(outputGz);
    res.pipe(fileStream);

    fileStream.on("finish", () => {
      const gunzip = zlib.createGunzip();
      fs.createReadStream(outputGz)
        .pipe(gunzip)
        .pipe(fs.createWriteStream(outputJson))
        .on("finish", () => {
          const rl = readline.createInterface({
            input: fs.createReadStream(outputJson),
            crlfDelay: Infinity,
          });

          rl.on("line", (line) => {
            const obj = JSON.parse(line);
          });
        });
    });
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
