export default defineEventHandler(async (event) => {
  const sessionData = await readBody(event)

  // replace nuxt-auth-utils user session
  await replaceUserSession(event, sessionData)
})
