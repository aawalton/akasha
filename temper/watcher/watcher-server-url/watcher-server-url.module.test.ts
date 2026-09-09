import { expect, test } from "bun:test"
import { DEFAULT_SERVER_URL, serverUrlFromEnv } from "./watcher-server-url.module.code.ts"

test("an environment naming no server address answers the default address", () => {
  expect(serverUrlFromEnv({})).toBe(DEFAULT_SERVER_URL)
  expect(DEFAULT_SERVER_URL).toBe("https://tempereso.com")
})

test("the server address named in the environment is the address answered", () => {
  expect(serverUrlFromEnv({ TEMPER_SERVER_URL: "https://staging.test" })).toBe(
    "https://staging.test"
  )
})

test("an empty server address is read as an empty address rather than as none set", () => {
  expect(serverUrlFromEnv({ TEMPER_SERVER_URL: "" })).toBe("")
})
