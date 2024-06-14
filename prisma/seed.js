import fs from "node:fs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const seed = "prisma/seed.sql"

try {
  await rawSql(loadFile(seed))
  await prisma.$disconnect()
} catch (e) {
  if (e.meta.message === "not an error") {
    // do nothing
  } else {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

function loadFile(path) {
  return fs.readFileSync(path, "utf8")
}

async function rawSql(sql) {
  return prisma.$executeRawUnsafe(sql)
}
