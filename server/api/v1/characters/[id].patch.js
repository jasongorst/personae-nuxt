import { snakeCase } from "lodash-es"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const character = await readBody(event)
  let response

  try {
    response = await event.$fetch(
      `http://localhost:3000/characters/${id}`, {
        method: "patch",
        body: deepConvertKeys(character, snakeCase),
      })
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return response
})
