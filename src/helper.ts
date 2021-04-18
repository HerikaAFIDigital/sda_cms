import * as moment from "moment";

export const prettyPrintCertDate = (ts: number) =>
  moment(ts).format("DD.MM.YYYY");

export function nonEmptyString(s: any): s is string {
  return (
    s !== undefined && s !== null && typeof s === "string" && s.trim() !== ""
  );
}

const prettyPrintValidDate = (ts: number) =>
  moment(ts).add(1, "year").format("Do MMMM YYYY");
