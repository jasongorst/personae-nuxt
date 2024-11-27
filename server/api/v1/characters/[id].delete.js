export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  let response

  try {
    response = await $fetch(`http://localhost:3000/characters/${id}`, { method: "delete" })
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return response
})
