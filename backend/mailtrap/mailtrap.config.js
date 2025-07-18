import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Akshit",
};

export const recipients = [
  {
    email: "akshitsingh008@gmail.com",
    name: "Akshit Kumar",
  },
];
