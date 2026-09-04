import { expect, test } from "bun:test"
import {
  getSupabaseClient,
  initSupabaseClient,
  isValidSessionBlob,
  newSupabaseClientHolder,
  type RenewalOutcome,
  renewSession,
  type SessionStore,
  type SessionTokens,
  sessionStoreFor,
  signedOutListener,
} from "./watcher-supabase-session.module.code.ts"

const TOKENS: SessionTokens = { access_token: "a", refresh_token: "r" }
const BLOB = '{"access_token":"a","refresh_token":"r","expires_at":1}'
const KEY = "temper-watcher-session"

function memoryStore(): SessionStore & { readonly held: Map<string, string> } {
  const held = new Map<string, string>()
  return {
    held,
    getItem: (key) => held.get(key) ?? null,
    setItem: (key, value) => {
      held.set(key, value)
      return undefined
    },
    removeItem: (key) => {
      held.delete(key)
      return undefined
    },
  }
}

function fakeClient() {
  const listeners: Array<(event: string) => undefined> = []
  const setCalls: SessionTokens[] = []
  return {
    listeners,
    setCalls,
    auth: {
      setSession: (tokens: SessionTokens): Promise<{ error: { message: string } | null }> => {
        setCalls.push(tokens)
        return Promise.resolve({ error: null })
      },
      onAuthStateChange: (listener: (event: string) => undefined): undefined => {
        listeners.push(listener)
        return undefined
      },
    },
  }
}

test("a full supabase-js session blob is a session", () => {
  const raw = JSON.stringify({
    access_token: "a",
    refresh_token: "r",
    expires_at: 1234567890,
    expires_in: 3600,
    token_type: "bearer",
    user: { id: "u" },
  })
  expect(isValidSessionBlob(raw)).toBe(true)
})

test("the three required keys alone are a session", () => {
  expect(isValidSessionBlob(BLOB)).toBe(true)
})

test("a blob missing a required key is no session", () => {
  expect(isValidSessionBlob('{"access_token":"a","refresh_token":"r"}')).toBe(false)
  expect(isValidSessionBlob('{"refresh_token":"r","expires_at":1}')).toBe(false)
  expect(isValidSessionBlob('{"access_token":"a","expires_at":1}')).toBe(false)
  expect(isValidSessionBlob("{}")).toBe(false)
})

test("nothing at all is no session", () => {
  expect(isValidSessionBlob(null)).toBe(false)
  expect(isValidSessionBlob(undefined)).toBe(false)
})

test("empty text is no session", () => {
  expect(isValidSessionBlob("")).toBe(false)
  expect(isValidSessionBlob("   ")).toBe(false)
})

test("text that is no JSON is no session", () => {
  expect(isValidSessionBlob("{not json")).toBe(false)
  expect(isValidSessionBlob('{"access_token":"a"')).toBe(false)
})

test("a JSON value that is no object is no session", () => {
  expect(isValidSessionBlob("null")).toBe(false)
  expect(isValidSessionBlob("42")).toBe(false)
  expect(isValidSessionBlob('"a string"')).toBe(false)
  expect(isValidSessionBlob("[1,2,3]")).toBe(false)
})

test("a required key of the wrong sort is no session", () => {
  expect(isValidSessionBlob('{"access_token":"a","refresh_token":"r","expires_at":"1"}')).toBe(
    false
  )
  expect(isValidSessionBlob('{"access_token":1,"refresh_token":"r","expires_at":1}')).toBe(false)
  expect(isValidSessionBlob('{"access_token":null,"refresh_token":"r","expires_at":1}')).toBe(false)
  expect(isValidSessionBlob('{"access_token":"a","refresh_token":1,"expires_at":1}')).toBe(false)
  expect(isValidSessionBlob('{"access_token":"a","refresh_token":null,"expires_at":1}')).toBe(false)
})

test("an empty token, a zero expiry and a fractional expiry are all still a session", () => {
  expect(isValidSessionBlob('{"access_token":"","refresh_token":"","expires_at":0}')).toBe(true)
  expect(isValidSessionBlob('{"access_token":"a","refresh_token":"r","expires_at":-5}')).toBe(true)
  expect(isValidSessionBlob('{"access_token":"a","refresh_token":"r","expires_at":1.5}')).toBe(true)
})

test("whitespace around a session blob leaves the blob a session", () => {
  expect(isValidSessionBlob(` ${BLOB} `)).toBe(true)
})

test("the store answers the key it was handed and no other", () => {
  const inner = memoryStore()
  inner.held.set("k", BLOB)
  const guarded = sessionStoreFor(inner, "k")
  expect(guarded.getItem("k")).toBe(BLOB)
  expect(guarded.getItem("other")).toBe(null)
})

test("the store answers nothing where the blob's shape does not fit", () => {
  const inner = memoryStore()
  inner.held.set("k", '{"access_token":"a"}')
  expect(sessionStoreFor(inner, "k").getItem("k")).toBe(null)
})

test("the store answers nothing where the key holds nothing", () => {
  expect(sessionStoreFor(memoryStore(), "k").getItem("k")).toBe(null)
})

test("a write under the key handed in reaches the store under that key", () => {
  const inner = memoryStore()
  const guarded = sessionStoreFor(inner, "k")
  guarded.setItem("k", BLOB)
  expect(inner.held.get("k")).toBe(BLOB)
  expect(guarded.getItem("k")).toBe(BLOB)
})

test("a write under another key reaches the store not at all", () => {
  const inner = memoryStore()
  sessionStoreFor(inner, "k").setItem("other", BLOB)
  expect(inner.held.size).toBe(0)
})

test("a removal under the key handed in empties the store", () => {
  const inner = memoryStore()
  inner.held.set("k", BLOB)
  sessionStoreFor(inner, "k").removeItem("k")
  expect(inner.held.has("k")).toBe(false)
})

test("a removal under another key leaves the store alone", () => {
  const inner = memoryStore()
  inner.held.set("k", BLOB)
  sessionStoreFor(inner, "k").removeItem("other")
  expect(inner.held.get("k")).toBe(BLOB)
})

test("a renewal that lands sets the session and says so", async () => {
  const said: string[] = []
  const client = fakeClient()
  const outcome = await renewSession({
    authenticate: () => Promise.resolve({ session: TOKENS }),
    setter: client.auth,
    log: (m) => {
      said.push(m)
      return undefined
    },
    logError: (m) => {
      said.push(m)
      return undefined
    },
  })
  expect(outcome).toEqual({ kind: "renewed" })
  expect(client.setCalls).toEqual([TOKENS])
  expect(said).toEqual(["Re-authentication successful."])
})

test("a renewal the setter refuses is reported as failed", async () => {
  const said: string[] = []
  const outcome = await renewSession({
    authenticate: () => Promise.resolve({ session: TOKENS }),
    setter: { setSession: () => Promise.resolve({ error: { message: "bad token" } }) },
    logError: (m) => {
      said.push(m)
      return undefined
    },
  })
  expect(outcome).toEqual({ kind: "failed", reason: "bad token" })
  expect(said).toEqual(["Re-authentication failed: bad token"])
})

test("a renewal that throws is reported as failed", async () => {
  const said: string[] = []
  const outcome = await renewSession({
    authenticate: () => Promise.reject(new Error("no browser")),
    setter: fakeClient().auth,
    logError: (m) => {
      said.push(m)
      return undefined
    },
  })
  expect(outcome).toEqual({ kind: "failed", reason: "no browser" })
  expect(said).toEqual(["Re-authentication failed: no browser"])
})

test("a renewal thrown as something other than an error still reads as failed", async () => {
  const outcome = await renewSession({
    authenticate: () => Promise.reject("plain text"),
    setter: fakeClient().auth,
    logError: () => undefined,
  })
  expect(outcome).toEqual({ kind: "failed", reason: "plain text" })
})

test("an event other than a sign-out is left alone", async () => {
  const client = fakeClient()
  const listener = signedOutListener({
    authenticate: () => Promise.resolve({ session: TOKENS }),
    setter: client.auth,
    logError: () => undefined,
  })
  expect(await listener("TOKEN_REFRESHED")).toEqual({ kind: "ignored" })
  expect(client.setCalls).toEqual([])
})

test("a sign-out says the session ended before renewing", async () => {
  const said: string[] = []
  const listener = signedOutListener({
    authenticate: () => Promise.resolve({ session: TOKENS }),
    setter: fakeClient().auth,
    log: () => undefined,
    logError: (m) => {
      said.push(m)
      return undefined
    },
  })
  await listener("SIGNED_OUT")
  expect(said).toEqual(["Session ended (SIGNED_OUT). Re-running auth flow..."])
})

test("a second sign-out arriving mid-renewal is left alone", async () => {
  let starts = 0
  const listener = signedOutListener({
    authenticate: () => {
      starts += 1
      return Promise.resolve({ session: TOKENS })
    },
    setter: fakeClient().auth,
    log: () => undefined,
    logError: () => undefined,
  })
  const first = listener("SIGNED_OUT")
  expect(await listener("SIGNED_OUT")).toEqual({ kind: "ignored" })
  expect(await first).toEqual({ kind: "renewed" })
  await listener("SIGNED_OUT")
  expect(starts).toBe(2)
})

test("a failed renewal reaches the caller rather than ending the process", async () => {
  const seen: RenewalOutcome[] = []
  const listener = signedOutListener({
    authenticate: () => Promise.reject(new Error("no browser")),
    setter: fakeClient().auth,
    onOutcome: (outcome) => {
      seen.push(outcome)
      return undefined
    },
    logError: () => undefined,
  })
  await listener("SIGNED_OUT")
  expect(seen).toEqual([{ kind: "failed", reason: "no browser" }])
})

type Fake = ReturnType<typeof fakeClient>

function deps(client: Fake) {
  return {
    makeClient: () => client,
    store: memoryStore(),
    storageKey: KEY,
    authenticate: () => Promise.resolve({ session: TOKENS }),
    anonKey: "anon",
    url: "https://example.invalid",
    log: () => undefined,
    logError: () => undefined,
  }
}

test("a holder starts out holding nothing, and answering it throws", () => {
  const holder = newSupabaseClientHolder<Fake>()
  expect(holder.client).toBe(null)
  expect(() => getSupabaseClient(holder)).toThrow(
    "getSupabaseClient: client not initialized. Call initSupabaseClient() first."
  )
})

test("a started holder hands the client back", async () => {
  const client = fakeClient()
  const holder = newSupabaseClientHolder<Fake>()
  expect(await initSupabaseClient(holder, deps(client))).toBe(client)
  expect(getSupabaseClient(holder)).toBe(client)
})

test("a second start hands back the client the first start made", async () => {
  const client = fakeClient()
  const holder = newSupabaseClientHolder<Fake>()
  const one = deps(client)
  await initSupabaseClient(holder, one)
  expect(await initSupabaseClient(holder, one)).toBe(client)
  const [a, b] = await Promise.all([
    initSupabaseClient(holder, one),
    initSupabaseClient(holder, one),
  ])
  expect(a).toBe(client)
  expect(b).toBe(client)
  expect(client.listeners.length).toBe(1)
})

test("an empty anonymous key is refused as none baked in", async () => {
  const holder = newSupabaseClientHolder<Fake>()
  await expect(initSupabaseClient(holder, { ...deps(fakeClient()), anonKey: "" })).rejects.toThrow(
    "Supabase anon key is not set. The watcher build must bake in __SUPABASE_ANON_KEY__."
  )
})

test("a start that threw leaves the holder ready to start afresh", async () => {
  const client = fakeClient()
  const holder = newSupabaseClientHolder<Fake>()
  await initSupabaseClient(holder, { ...deps(client), anonKey: "" }).catch(() => undefined)
  expect(holder.client).toBe(null)
  expect(await initSupabaseClient(holder, deps(client))).toBe(client)
})

test("the started client is handed the address, the key and the storage key", async () => {
  const client = fakeClient()
  const holder = newSupabaseClientHolder<Fake>()
  const seen: Array<{ url: string; key: string; storageKey: string }> = []
  await initSupabaseClient(holder, {
    ...deps(client),
    makeClient: (url, anonKey, options) => {
      seen.push({ url, key: anonKey, storageKey: options.storageKey })
      return client
    },
  })
  expect(seen).toEqual([{ url: "https://example.invalid", key: "anon", storageKey: KEY }])
})

test("the storage the client is handed guards the caller's key", async () => {
  const client = fakeClient()
  const holder = newSupabaseClientHolder<Fake>()
  const inner = memoryStore()
  inner.held.set(KEY, BLOB)
  const handed: SessionStore[] = []
  await initSupabaseClient(holder, {
    ...deps(client),
    store: inner,
    makeClient: (_url, _anonKey, options) => {
      handed.push(options.storage)
      return client
    },
  })
  const storage = handed[0]
  expect(storage).toBeDefined()
  expect(storage?.getItem(KEY)).toBe(BLOB)
  expect(storage?.getItem("something-else")).toBe(null)
})

test("a sign-out on the started client renews the session", async () => {
  const client = fakeClient()
  const holder = newSupabaseClientHolder<Fake>()
  const seen: RenewalOutcome[] = []
  let settle: () => void = () => undefined
  const settled = new Promise<void>((resolve) => {
    settle = resolve
  })
  await initSupabaseClient(holder, {
    ...deps(client),
    onOutcome: (outcome) => {
      seen.push(outcome)
      settle()
      return undefined
    },
  })
  const listener = client.listeners[0]
  expect(listener).toBeDefined()
  listener?.("SIGNED_OUT")
  await settled
  expect(seen).toEqual([{ kind: "renewed" }])
  expect(client.setCalls).toEqual([TOKENS])
})
