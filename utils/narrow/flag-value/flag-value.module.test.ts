import { expect, test } from "bun:test"
import { flagValue } from "akasha/utils/narrow/flag-value/flag-value.module.code.ts"

test("reads the word after a flag", () => {
  expect(flagValue(["--resource", "gotrue-secrets"], "--resource")).toBe("gotrue-secrets")
})

test("a flag followed by another flag names nothing", () => {
  expect(flagValue(["--resource", "--namespace"], "--resource")).toBeUndefined()
})

test("a flag that is not there names nothing", () => {
  expect(flagValue(["--namespace", "gotrue"], "--resource")).toBeUndefined()
})
