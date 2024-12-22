export async function useSetSession(user) {
  const { fetch: fetchUserSession, session } = useUserSession()

  // call setSessionUser api
  await $fetch(
    "/api/v1/auth/setSessionUser", {
      method: "POST",
      body: JSON.stringify(user)
    })

  // refresh the session
  await fetchUserSession()

  // return new session
  return session.value
}
