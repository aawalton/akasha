import { expect, test } from "bun:test"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./watcher-supabase-url.module.code.ts"

test("a worker running from source reads an address from somewhere", () => {
  expect(typeof SUPABASE_URL).toBe("string")
  expect(SUPABASE_URL.length).toBeGreaterThan(0)
})

test("the address read from source is the environment's or the fallback", () => {
  expect(SUPABASE_URL).toBe(process.env.SUPABASE_URL ?? "https://supabase.alanwalton.com")
})

test("an anonymous key is always some text, empty where none is set", () => {
  expect(typeof SUPABASE_ANON_KEY).toBe("string")
  expect(SUPABASE_ANON_KEY).toBe(process.env.SUPABASE_ANON_KEY ?? "")
})
