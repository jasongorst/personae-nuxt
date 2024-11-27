import { snakeCase } from "lodash-es"

export default defineEventHandler(async (event) => {
  const character = await readBody(event)
  let response

  try {
    response = await $fetch(
      "http://localhost:3000/characters", {
        method: "post",
        body: deepConvertKeys(character, snakeCase)
      })
  } catch(error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return response
})
