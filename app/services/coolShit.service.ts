import { db } from "../utils/db.server";

export const createShit = async (args: { shit: string; flag: string }) => {
  await db.shit.create({
    data: {
      shit: args.shit,
      flag: args.flag,
    },
  });
};

export const getLastShit = async () => {
  const shit = await db.shit.findFirst({
    orderBy: { createdAt: "desc" },
  });

  return shit;
};
