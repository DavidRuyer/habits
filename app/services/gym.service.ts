import z from "zod";
import { db } from "../utils/db.server";

export const RepsSchema = z.array(
  z.object({
    rating: z.number(),
    weight: z.number(),
  })
);

export type Reps = z.infer<typeof RepsSchema>;

export const createSession = async (data: { slug: string; reps: Reps }) => {
  // Validate shape before submit
  RepsSchema.parse(data.reps);

  await db.exercise.create({
    data,
  });

  return;
};

export const getLastSession = async (slug: string) => {
  const exercise = await db.exercise.findFirst({
    where: { slug },
    orderBy: { createdAt: "desc" },
  });

  return exercise;
};
