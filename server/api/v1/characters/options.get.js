export default defineEventHandler(async () => {
  let options

  try {
    options = await $fetch("http://localhost:3000/characters/options")
  } catch(error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return options
})
