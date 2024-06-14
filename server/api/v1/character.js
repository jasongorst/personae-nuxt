export default defineEventHandler(async (_) => {
  try {
    return await prisma.character.findMany({
      orderBy: [
        { name: "asc" }
      ]
    })
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }
})
