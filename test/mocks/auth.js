import { eventHandler } from "h3"

export const MOCKED_USER = {
  user: {
    email: "test@example.foo",
    admin: false
  }
}

// app-side mocks
export function useAuth() {
  return {
    data: ref(MOCKED_USER),
    status: ref("authenticated"),
    getSession: () => MOCKED_USER,
    signOut: () => {}
  }
}

// server-side mocks
export const getServerSession = () => MOCKED_USER
export const NuxtAuthHandler = () => eventHandler(() => MOCKED_USER)
