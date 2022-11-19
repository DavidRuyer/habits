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
  const shit = await db.shit.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return shit;
};
