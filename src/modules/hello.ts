import {
  App,
  SlackActionMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt";

export const hello_message = async ({
  message,
  say,
}: SlackEventMiddlewareArgs<"message">) => {
  // Filters out any message events with subtypes
  if (!!message.subtype && message.subtype !== "bot_message") return;

  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hi there <@${message.user}>`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me!",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hi there <@${message.user}>`,
  });
};

export const hello_action = async ({
  body,
  ack,
  say,
}: SlackActionMiddlewareArgs) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
};

export const register = (app: App): void => {
  app.message("hello", hello_message);
  app.action("button_click", hello_action);
};
