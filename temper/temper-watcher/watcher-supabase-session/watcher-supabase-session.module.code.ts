import type { SupabaseUserClient } from "@akasha/supabase-client/user-client"
import { z } from "zod"
import { log, logError } from "../watcher-logging/watcher-logging.module.code.ts"
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} from "../watcher-supabase-url/watcher-supabase-url.module.code.ts"

const SESSION_SHAPE_SCHEMA = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_at: z.number(),
})

export function isValidSessionBlob(raw: string | null | undefined): boolean {
  if (raw == null || raw === "") return false
  try {
    return SESSION_SHAPE_SCHEMA.safeParse(JSON.parse(raw)).success
  } catch {
    return false
  }
}

export type WatcherSupabaseClient = SupabaseUserClient

export interface SessionStore {
  readonly getItem: (key: string) => string | null
  readonly setItem: (key: string, value: string) => undefined
  readonly removeItem: (key: string) => undefined
}

export function sessionStoreFor(store: SessionStore, storageKey: string): SessionStore {
  return {
    getItem(key: string): string | null {
      if (key !== storageKey) return null
      const raw = store.getItem(storageKey)
      return isValidSessionBlob(raw) ? raw : null
    },
    setItem(key: string, value: string): undefined {
      if (key !== storageKey) return undefined
      return store.setItem(storageKey, value)
    },
    removeItem(key: string): undefined {
      if (key !== storageKey) return undefined
      return store.removeItem(storageKey)
    },
  }
}

export interface SessionTokens {
  readonly access_token: string
  readonly refresh_token: string
}

export interface SessionSetter {
  readonly setSession: (tokens: SessionTokens) => Promise<{ error: { message: string } | null }>
}

export interface AuthEvents {
  readonly onAuthStateChange: (listener: (event: string) => undefined) => unknown
}

export interface SessionClient {
  readonly auth: SessionSetter & AuthEvents
}

export type RenewalOutcome =
  | { readonly kind: "ignored" }
  | { readonly kind: "renewed" }
  | { readonly kind: "failed"; readonly reason: string }

export interface RenewalDeps {
  readonly authenticate: () => Promise<{ session: SessionTokens }>
  readonly setter: SessionSetter
  readonly onOutcome?: (outcome: RenewalOutcome) => undefined
  readonly log?: (message: string) => undefined
  readonly logError?: (message: string) => undefined
}

export async function renewSession(deps: RenewalDeps): Promise<RenewalOutcome> {
  const say = deps.log ?? log
  const complain = deps.logError ?? logError
  try {
    const { session } = await deps.authenticate()
    const { error } = await deps.setter.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    })
    if (error) {
      complain(`Re-authentication failed: ${error.message}`)
      return { kind: "failed", reason: error.message }
    }
    say("Re-authentication successful.")
    return { kind: "renewed" }
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    complain(`Re-authentication failed: ${reason}`)
    return { kind: "failed", reason }
  }
}

export function signedOutListener(deps: RenewalDeps): (event: string) => Promise<RenewalOutcome> {
  let renewing = false
  return async (event: string): Promise<RenewalOutcome> => {
    if (event !== "SIGNED_OUT" || renewing) return { kind: "ignored" }
    renewing = true
    const complain = deps.logError ?? logError
    complain("Session ended (SIGNED_OUT). Re-running auth flow...")
    try {
      const outcome = await renewSession(deps)
      deps.onOutcome?.(outcome)
      return outcome
    } finally {
      renewing = false
    }
  }
}

export interface SupabaseClientHolder<Client extends SessionClient = WatcherSupabaseClient> {
  client: Client | null
}

export function newSupabaseClientHolder<
  Client extends SessionClient = WatcherSupabaseClient,
>(): SupabaseClientHolder<Client> {
  return { client: null }
}

export interface ClientOptions {
  readonly storage: SessionStore
  readonly storageKey: string
}

export interface SupabaseClientDeps<Client extends SessionClient = WatcherSupabaseClient> {
  readonly makeClient: (url: string, anonKey: string, options: ClientOptions) => Client
  readonly store: SessionStore
  readonly storageKey: string
  readonly authenticate: () => Promise<{ session: SessionTokens }>
  readonly onOutcome?: (outcome: RenewalOutcome) => undefined
  readonly url?: string
  readonly anonKey?: string
  readonly log?: (message: string) => undefined
  readonly logError?: (message: string) => undefined
}

function startSupabaseClient<Client extends SessionClient>(
  holder: SupabaseClientHolder<Client>,
  deps: SupabaseClientDeps<Client>
): Client {
  const anonKey = deps.anonKey ?? SUPABASE_ANON_KEY
  if (anonKey === "") {
    throw new Error(
      "Supabase anon key is not set. The watcher build must bake in __SUPABASE_ANON_KEY__."
    )
  }
  const instance = deps.makeClient(deps.url ?? SUPABASE_URL, anonKey, {
    storage: sessionStoreFor(deps.store, deps.storageKey),
    storageKey: deps.storageKey,
  })
  const listener = signedOutListener({
    authenticate: deps.authenticate,
    setter: instance.auth,
    onOutcome: deps.onOutcome,
    log: deps.log,
    logError: deps.logError,
  })
  instance.auth.onAuthStateChange((event: string): undefined => {
    void listener(event)
    return undefined
  })
  holder.client = instance
  return instance
}

export async function initSupabaseClient<Client extends SessionClient>(
  holder: SupabaseClientHolder<Client>,
  deps: SupabaseClientDeps<Client>
): Promise<Client> {
  const ready = holder.client
  if (ready !== null) return ready
  return startSupabaseClient(holder, deps)
}

export function getSupabaseClient<Client extends SessionClient>(
  holder: SupabaseClientHolder<Client>
): Client {
  const ready = holder.client
  if (ready === null) {
    throw new Error("getSupabaseClient: client not initialized. Call initSupabaseClient() first.")
  }
  return ready
}
