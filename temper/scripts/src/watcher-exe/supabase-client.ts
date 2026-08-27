import { createClient, type SupabaseUserClient } from "@shared/supabase-client/client"
import { z } from "zod"
import { authenticate, loadConfig, SESSION_STORAGE_KEY, saveConfig } from "./auth"
import { log, logError } from "./logger"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-url"

const SESSION_SHAPE_SCHEMA = z
  .object({
    access_token: z.string(),
    refresh_token: z.string(),
    expires_at: z.number(),
  })
  .passthrough()

export function isValidSessionBlob(raw: string | null | undefined): boolean {
  if (raw == null || raw === "") return false
  try {
    const result = SESSION_SHAPE_SCHEMA.safeParse(JSON.parse(raw))
    return result.success
  } catch {
    return false
  }
}

const fileStorage = {
  getItem(key: string): string | null {
    if (key !== SESSION_STORAGE_KEY) return null
    const raw = loadConfig()?.[SESSION_STORAGE_KEY] ?? null
    return isValidSessionBlob(raw) ? raw : null
  },
  setItem(key: string, value: string): undefined {
    if (key !== SESSION_STORAGE_KEY) return
    saveConfig({ [SESSION_STORAGE_KEY]: value })
  },
  removeItem(key: string): undefined {
    if (key !== SESSION_STORAGE_KEY) return
    saveConfig({ [SESSION_STORAGE_KEY]: undefined })
  },
}

export type WatcherSupabaseClient = SupabaseUserClient

let client: WatcherSupabaseClient | null = null
let initPromise: Promise<WatcherSupabaseClient> | null = null

export async function initSupabaseClient(): Promise<WatcherSupabaseClient> {
  if (client) return client
  if (initPromise) return initPromise

  initPromise = (async () => {
    if (SUPABASE_ANON_KEY === "") {
      throw new Error(
        "Supabase anon key is not set. The watcher build must bake in __SUPABASE_ANON_KEY__."
      )
    }

    const instance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      storage: fileStorage,
      storageKey: SESSION_STORAGE_KEY,
    })

    let reAuthInProgress = false
    instance.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_OUT" || reAuthInProgress) return
      reAuthInProgress = true
      void (async () => {
        try {
          logError("Session ended (SIGNED_OUT). Re-running auth flow...")
          const { session: newSession } = await authenticate()
          const { error } = await instance.auth.setSession({
            access_token: newSession.access_token,
            refresh_token: newSession.refresh_token,
          })
          if (error) {
            logError(`Re-authentication failed: ${error.message}`)
            process.exit(1)
          }
          log("Re-authentication successful.")
        } catch (err) {
          logError(`Re-authentication failed: ${err instanceof Error ? err.message : err}`)
          process.exit(1)
        } finally {
          reAuthInProgress = false
        }
      })()
    })

    client = instance
    return instance
  })()

  return initPromise
}

export function getSupabaseClient(): WatcherSupabaseClient {
  if (!client) {
    throw new Error("getSupabaseClient: client not initialized. Call initSupabaseClient() first.")
  }
  return client
}
