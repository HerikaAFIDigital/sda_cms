import * as Koa from "koa";
import { Url } from "url";
import { logger } from "./logger";

export const handleGeneration = async (ctx: Koa.Context, url: Url) => {
    logger.info("Generating certificate");
    ctx.body = "OK";
};
