import {
  App,
  SlackActionMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";

export const deploy_handler = async ({
  message,
  say,
}: SlackEventMiddlewareArgs<"message">) => {
  // Filters out any message events with subtypes
  if (!!message.subtype && message.subtype !== "bot_message") return;
  // Filters out black messages
  if (!message.text) return;

  const [app, ...args] = message.text.split(/ /).slice(1);

  await say(`application: ${app}\narguments: ${args}`);
};

export const deploy_dispatcher = async ({
  body,
  ack,
  say,
}: SlackActionMiddlewareArgs) => {
  //
};

export const register = (app: App): void => {
  app.message(/^!deploy/, deploy_handler);
  // app.action("dispatch_deploy", deploy_dispatcher)
};
