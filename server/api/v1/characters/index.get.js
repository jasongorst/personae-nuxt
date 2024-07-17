export default defineEventHandler(async () => {
  let characters

  try {
    characters = await $fetch("http://localhost:3000/characters")
  } catch(error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return characters
})
