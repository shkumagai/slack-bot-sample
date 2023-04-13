import { App, LogLevel } from "@slack/bolt";

import * as deploy from "./modules/deploy";
import * as hello from "./modules/hello";

import * as dotenv from "dotenv";
dotenv.config({ path: `env/.env.${process.env.STAGE}` });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  developerMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: Number(process.env.APP_LISTEN_PORT) || 3000,
  logLevel: LogLevel.DEBUG,
});

deploy.register(app);
hello.register(app);

(async () => {
  await app.start();

  console.log("⚡Bolt app is running!");
})();
