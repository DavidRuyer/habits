import { db } from "../utils/db.server";

export const createShit = async (args: { shit: string; flag: string }) => {
  await db.shit.create({
    data: {
      shit: args.shit,
      flag: args.flag,
    },
  });
};
