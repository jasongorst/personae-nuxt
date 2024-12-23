export default defineEventHandler(async (event) => {
  const user = await readBody(event)

  // replace nuxt-auth-utils user session
  await replaceUserSession(event, {
    user: {
      username: user.email,
      admin: user.admin
    },
    loggedInWith: "nuxt-auth"
  })
})
