import "dotenv/config";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import http from "http";
import fs from "fs/promises";

// const config = JSON.parse(await fs.readFile("./config.json"), {
//   encoding: "utf8",
// });

yargs(hideBin(process.argv))
  .command(
    "current",
    "Show current weather",
    (yargs) => {
      return yargs.option("city", {
        alias: "c",
        demandOption: true,
        type: "string",
      });
    },
    (argv) => {
      const baseURL = "http://api.weatherstack.com/current";

      const params = new URLSearchParams();
      params.append("access_key", process.env.API_KEY);
      params.append("query", argv.city);
      // params.append("units", config.units);
      // params.append("language", config.language);

      http.get(baseURL + "?" + params.toString(), (res) => {
        let data = [];
        res
          .on("data", (chunk) => {
            data.push(chunk);
          })
          .on("end", () => {
            let weather = JSON.parse(Buffer.concat(data).toString());
            console.log(weather);
          })
          .on("error", (err) => {
            console.error(err);
          });
      });
    }
  )
  .parse();
