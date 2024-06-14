-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "player" TEXT NOT NULL,
    "mortalName" TEXT,
    "faeName" TEXT,
    "rank" TEXT,
    "kith" TEXT,
    "location" TEXT,
    "position" TEXT,
    "seeming" TEXT,
    "house" TEXT,
    "bannerhouse" TEXT,
    "description" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
