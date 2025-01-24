-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "company_tags" TEXT[],
    "difficulty" "Difficulty" NOT NULL DEFAULT 'easy',

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);
