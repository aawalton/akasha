import { describe, expect, test } from "bun:test"
import { componentTestMissingDom } from "./dom-guarding.module.code.ts"

describe("componentTestMissingDom", () => {
  test("lets a run holding a document through", () => {
    expect(componentTestMissingDom(["bun", "test", "a.component.test.tsx"], true)).toBe(false)
  })

  test("names a component test run without a document", () => {
    expect(componentTestMissingDom(["bun", "test", "a.component.test.tsx"], false)).toBe(true)
  })

  test("lets a test that is no component test through", () => {
    expect(componentTestMissingDom(["bun", "test", "a.unit.test.ts"], false)).toBe(false)
  })
})
