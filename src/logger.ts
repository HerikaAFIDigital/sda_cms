import * as winston from "winston";

const level = process.env.NODE_ENV === "dev" ? "debug" : "info";
export const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level, colorize: true }),
      new (winston.transports.File)({ filename: "cert-service.log" }),
    ],
  });
