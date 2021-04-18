import * as Koa from "koa";
import { Url } from "url";

export const missingParameter = (ctx: Koa.Context, url: Url) => {
  if (!("name" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter name";
    return true;
  }
  if (!("jobTitle" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter jobTitle";
    return true;
  }
  if (!("certHeader" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certHeader";
    return true;
  }
  if (!("certBody" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certBody";
    return true;
  }
  if (!("certBody1" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certBody1";
    return true;
  }
  if (!("certBody2" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certBody2";
    return true;
  }
  if (!("certDates" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certDates";
    return true;
  }
  if (
    Object.prototype.toString.call(ctx.request.body.certDates) !==
    "[object Array]"
  ) {
    ctx.status = 400;
    ctx.body = "certDates is not an array";
    return true;
  }

  return false;
};
