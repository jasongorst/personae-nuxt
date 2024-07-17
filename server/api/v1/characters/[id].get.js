export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  let character

  try {
    character = await $fetch(`http://localhost:3000/characters/${id}`)
  } catch(error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return character
})
