export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let characters

  try {
    characters = await $fetch(
      "http://localhost:3000/characters",
      { query: query }
    )
  } catch(error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return characters
})
