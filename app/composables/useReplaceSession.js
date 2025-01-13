export async function useReplaceSession(sessionData) {
  const { fetch: fetchUserSession, session } = useUserSession()

  // call setSessionUser api
  await $fetch(
    "/api/v1/auth/replaceUserSession", {
      method: "POST",
      body: JSON.stringify(sessionData)
    })

  // refresh the session
  await fetchUserSession()

  // return new session
  return session.value
}
