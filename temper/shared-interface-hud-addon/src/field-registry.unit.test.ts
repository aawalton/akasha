import { describe, expect, test } from "bun:test"
import { createFieldRegistry } from "./field-registry"
import type { HudCell, HudField } from "./types"

const cell = (text: string): (() => HudCell) => {
  return () => ({ text })
}

const field = (id: string, order: number, text = ""): HudField => {
  return { id, order, padWidth: 8, compute: cell(text) }
}

describe("createFieldRegistry", () => {
  test("an empty registry lists nothing", () => {
    const reg = createFieldRegistry()
    expect(reg.list()).toEqual([])
  })

  test("registered fields list in ascending order, regardless of insert order", () => {
    const reg = createFieldRegistry()
    reg.register(field("session", 30, "00:00"))
    reg.register(field("fps", 10, "60 fps"))
    reg.register(field("latency", 20, "42 ms"))
    expect(reg.list().map((f) => f.id)).toEqual(["fps", "latency", "session"])
  })

  test("re-registering an id replaces the prior field rather than duplicating", () => {
    const reg = createFieldRegistry()
    reg.register(field("bag", 30, "10/60"))
    reg.register(field("bag", 35, "11/60"))
    const fields = reg.list()
    expect(fields).toHaveLength(1)
    expect(fields[0]?.order).toBe(35)
    expect(fields[0]?.compute().text).toBe("11/60")
  })

  test("fields with equal order keep registration order (stable)", () => {
    const reg = createFieldRegistry()
    reg.register(field("first", 50, "a"))
    reg.register(field("second", 50, "b"))
    expect(reg.list().map((f) => f.id)).toEqual(["first", "second"])
  })

  test("interleaved built-in and injected orders sort into the documented layout", () => {
    const reg = createFieldRegistry()
    reg.register(field("fps", 10))
    reg.register(field("latency", 20))
    reg.register(field("session", 30))
    reg.register(field("bag", 40))
    reg.register(field("delta", 50))
    reg.register(field("burst", 60))
    expect(reg.list().map((f) => f.id)).toEqual([
      "fps",
      "latency",
      "session",
      "bag",
      "delta",
      "burst",
    ])
  })
})
