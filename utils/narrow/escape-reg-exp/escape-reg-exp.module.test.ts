import { expect, test } from "bun:test"
import { escapeRegExp } from "akasha/utils/narrow/escape-reg-exp/escape-reg-exp.module.code.ts"

test("a literal is escaped before becoming a pattern", () => {
  expect(escapeRegExp("a.b*c")).toBe("a\\.b\\*c")
})

test("every character a pattern would act on is escaped", () => {
  expect(escapeRegExp(".*+?^${}()|[]\\")).toBe("\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\")
})

test("a literal with nothing to escape is left whole", () => {
  expect(escapeRegExp("plain")).toBe("plain")
})
