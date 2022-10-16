/*
 Warnings:
 
 - Added the required column `kind` to the `Hit` table without a default value. This is not possible if the table is not empty.
 
 */
-- AlterTable
ALTER TABLE
  "Hit"
ADD
  COLUMN "kind" TEXT;

UPDATE
  "Hit"
SET
  kind = 'smoke';

ALTER TABLE
  "Hit"
ALTER COLUMN
  "kind"
SET
  NOT NULL;

CREATE INDEX "Hit_kind_idx" ON "Hit"("kind");