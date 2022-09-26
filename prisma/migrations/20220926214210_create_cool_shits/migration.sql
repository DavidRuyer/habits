-- CreateTable
CREATE TABLE "Shit" (
    "id" TEXT NOT NULL,
    "shit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Shit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Shit_createdAt_idx" ON "Shit"("createdAt");