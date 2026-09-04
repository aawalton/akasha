import { expect, test } from "bun:test"
import { WATCHER_VERSION } from "./watcher-version.module.code.ts"

test("a worker running from source reports itself as dev", () => {
  expect(WATCHER_VERSION).toBe("dev")
})

test("the version is always some text", () => {
  expect(typeof WATCHER_VERSION).toBe("string")
  expect(WATCHER_VERSION.length).toBeGreaterThan(0)
})
