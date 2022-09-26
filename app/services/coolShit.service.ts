import type { Dayjs } from "dayjs";
import dayjs from "../utils/dayjs";
import { db } from "../utils/db.server";

export const createShit = async (args: { shit: string }) => {
  await db.shit.create({
    data: {
      shit: args.shit,
    },
  });
};
