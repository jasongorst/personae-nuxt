import { z } from 'zod'

export default defineWebAuthnRegisterEventHandler({
  async storeChallenge(event, challenge, attemptId) {
    await useStorage().setItem(`auth:challenge:${attemptId}`, challenge, { ttl: 60 })
  },

  async getChallenge(event, attemptId) {
    const challenge = await useStorage().getItem(`auth:challenge:${attemptId}`)

    if (!challenge) {
      throw createError({
        statusCode: 400,
        message: 'Challenge not found or expired'
      })
    }

    await useStorage().removeItem(`auth:challenge:${attemptId}`)
    return challenge
  },

  validateUser: user => z.object({
    email: z.string().email().toLowerCase().trim(),
    admin: z.boolean()
  }).parseAsync(user),

  async onSuccess(event, { user, credential }) {
    const db = useDB()

    const dbUser = await db.insert(tables.users).values({
      email: user.email,
      admin: user.admin,
      createdAt: new Date(),
      lastLoginAt: new Date()
    }).returning().get().catch(() => {
      throw createError({
        statusCode: 400,
        message: 'User already exists'
      })
    })

    await db.insert(tables.credentials).values({
      userId: dbUser.id,
      id: credential.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      backedUp: credential.backedUp,
      transports: credential.transports
    })

    await setUserSession(event, {
      user: {
        id: dbUser.id,
        email: dbUser.email,
        admin: dbUser.admin
      }
    })
  },

  async excludeCredentials(event, email) {
    return useDB()
      .select({
        id: tables.credentials.id,
        transports: tables.credentials.transports
      })
      .from(tables.users)
      .innerJoin(tables.credentials, eq(tables.credentials.userId, tables.users.id))
      .where(eq(tables.users.email, email.toLowerCase().trim()))
  }
})
