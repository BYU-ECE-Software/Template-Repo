-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_GOOD_STANDING', 'ON_PROBATION', 'SUSPENDED', 'INACTIVE', 'EXPELLED', 'BANNED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'PROFESSOR', 'STAFF', 'DARK_LORD', 'DEATH_EATER', 'ORDER_OF_THE_PHOENIX');

-- CreateEnum
CREATE TYPE "SpellType" AS ENUM ('CHARM', 'DEFENSIVE', 'UTILITY', 'MEMORY', 'CURSE', 'HEX', 'UNFORGIVABLE', 'DARK', 'MIND', 'TRANSFIGURATION', 'BINDING');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "status" "Status" NOT NULL DEFAULT 'IN_GOOD_STANDING',
    "wand" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spells" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SpellType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_spells" (
    "userId" INTEGER NOT NULL,
    "spellId" INTEGER NOT NULL,

    CONSTRAINT "user_spells_pkey" PRIMARY KEY ("userId","spellId")
);

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "spells_name_key" ON "spells"("name");

-- AddForeignKey
ALTER TABLE "user_spells" ADD CONSTRAINT "user_spells_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_spells" ADD CONSTRAINT "user_spells_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "spells"("id") ON DELETE CASCADE ON UPDATE CASCADE;
