import { describe, expect, test } from "bun:test"
import {
  formatLoadError,
  loadBundleUnderSandbox,
  type SandboxVm,
  summarizeBundle,
} from "./addon-sandbox-load"

function makeFakeVm(options: {
  doStringResult?: () => Promise<unknown> | unknown
  onSetGlobal?: (name: string, value: unknown) => void
}): { vm: SandboxVm; setCalls: ReadonlyArray<{ name: string; value: unknown }> } {
  const setCalls: Array<{ name: string; value: unknown }> = []
  const vm: SandboxVm = {
    setGlobal(name, value) {
      setCalls.push({ name, value })
      options.onSetGlobal?.(name, value)
    },
    async doString(_source) {
      return options.doStringResult ? options.doStringResult() : null
    },
  }
  return { vm, setCalls }
}

describe("loadBundleUnderSandbox", () => {
  test("returns ok:true when VM doString resolves", async () => {
    const { vm } = makeFakeVm({})
    const result = await loadBundleUnderSandbox({ source: "return 1", bundle: "fake.lua" }, vm)
    expect(result.ok).toBe(true)
    expect(result.bundle).toBe("fake.lua")
  })

  test("seeds default ESO APIs (EVENT_MANAGER etc.) before doString", async () => {
    const { vm, setCalls } = makeFakeVm({})
    await loadBundleUnderSandbox({ source: "", bundle: "b.lua" }, vm)
    const names = setCalls.map((c) => c.name)
    expect(names).toContain("EVENT_MANAGER")
    expect(names).toContain("SLASH_COMMANDS")
    expect(names).toContain("EVENT_ADD_ON_LOADED")
  })

  test("never seeds a banned global (debug, io, os, package, require, ...)", async () => {
    const { vm, setCalls } = makeFakeVm({})
    await loadBundleUnderSandbox({ source: "", bundle: "b.lua" }, vm)
    const names = setCalls.map((c) => c.name)
    for (const banned of [
      "debug",
      "io",
      "os",
      "package",
      "require",
      "module",
      "dofile",
      "loadfile",
      "load",
    ]) {
      expect(names).not.toContain(banned)
    }
  })

  test("returns ok:false with VM error text when doString throws Error", async () => {
    const { vm } = makeFakeVm({
      doStringResult: () => {
        throw new Error("attempt to index global 'debug' (a nil value)")
      },
    })
    const result = await loadBundleUnderSandbox({ source: "debug.x()", bundle: "r.lua" }, vm)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toContain("attempt to index global 'debug'")
      expect(result.bundle).toBe("r.lua")
    }
  })

  test("returns ok:false when VM doString throws a plain string", async () => {
    const { vm } = makeFakeVm({
      doStringResult: () => {
        throw "raw lua error string"
      },
    })
    const result = await loadBundleUnderSandbox({ source: "", bundle: "s.lua" }, vm)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toBe("raw lua error string")
  })

  test("truncates multi-line tracebacks to keep CLI output readable", async () => {
    const longTraceback = Array.from({ length: 500 }, (_, i) => `line ${i}`).join("\n")
    const { vm } = makeFakeVm({
      doStringResult: () => {
        throw new Error(longTraceback)
      },
    })
    const result = await loadBundleUnderSandbox({ source: "", bundle: "t.lua" }, vm)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      const lines = result.error.split("\n")
      expect(lines.length).toBeLessThan(20)
      expect(result.error).toContain("more traceback line(s) omitted")
    }
  })

  test("surfaces setGlobal failures as a seed-error result", async () => {
    const { vm } = makeFakeVm({
      onSetGlobal(name) {
        if (name === "EVENT_MANAGER") throw new Error("push failed")
      },
    })
    const result = await loadBundleUnderSandbox({ source: "", bundle: "g.lua" }, vm)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toContain("failed to seed sandbox globals")
  })

  test("honours config.extraGlobals (e.g. per-bundle AddonName)", async () => {
    const { vm, setCalls } = makeFakeVm({})
    await loadBundleUnderSandbox(
      {
        source: "",
        bundle: "x.lua",
        config: { extraGlobals: { MyAddon: { name: "MyAddon" } } },
      },
      vm
    )
    const entry = setCalls.find((c) => c.name === "MyAddon")
    expect(entry).toBeDefined()
    const value = entry?.value
    if (!value || typeof value !== "object" || !("name" in value)) {
      throw new Error("expected entry.value to have name")
    }
    expect(value.name).toBe("MyAddon")
  })
})

describe("formatLoadError", () => {
  test("includes bundle path and error text without project pointer", () => {
    const line = formatLoadError({
      ok: false,
      bundle: "pkg/thing.lua",
      error: "stack overflow",
    })
    expect(line).toContain("pkg/thing.lua")
    expect(line).toContain("stack overflow")
    expect(line).not.toContain("project #")
  })

  test("appends a diagnostics trailer when diagnostics are attached", () => {
    const line = formatLoadError({
      ok: false,
      bundle: "pkg/thing.lua",
      error: "module 'x' not found",
      diagnostics: {
        byteLen: 12345,
        moduleEntryCount: 47,
        hasFooterEntry: true,
        firstLine: "local ____modules = {}",
        mtimeIso: "2026-05-01T12:00:00.000Z",
      },
    })
    expect(line).toContain("47 modules")
    expect(line).toContain("12345 bytes")
    expect(line).toContain("footer:yes")
    expect(line).toContain("2026-05-01T12:00:00.000Z")
  })

  test("omits the diagnostics trailer when diagnostics are absent", () => {
    const line = formatLoadError({
      ok: false,
      bundle: "pkg/thing.lua",
      error: "boom",
    })
    expect(line).not.toContain("modules")
    expect(line).not.toContain("bytes")
    expect(line).not.toContain("footer:")
  })
})

describe("summarizeBundle", () => {
  test("counts module-table entries and detects the footer require call", () => {
    const source = [
      "local ____modules = {}",
      "local function require(...) end",
      "____modules = {",
      '["temper.inventory.addon.src.main"] = function(...)',
      "  return 1",
      " end,",
      '["temper.inventory.addon.src.types"] = function(...)',
      "  return {}",
      " end,",
      "}",
      'local ____entry = require("temper.inventory.addon.src.main", ...)',
      "return ____entry",
    ].join("\n")
    const summary = summarizeBundle(source)
    expect(summary.moduleEntryCount).toBe(2)
    expect(summary.hasFooterEntry).toBe(true)
    expect(summary.byteLen).toBe(Buffer.byteLength(source, "utf8"))
    expect(summary.firstLine).toBe("local ____modules = {}")
  })

  test("reports no footer and zero modules on an empty bundle", () => {
    const summary = summarizeBundle("")
    expect(summary.moduleEntryCount).toBe(0)
    expect(summary.hasFooterEntry).toBe(false)
    expect(summary.byteLen).toBe(0)
    expect(summary.firstLine).toBe("")
  })

  test("reports footer:no when modules exist but the trailing require call is missing", () => {
    const truncated = [
      "local function require(...) end",
      "____modules = {",
      '["temper.inventory.addon.src.main"] = function(...)',
      "  return 1",
      " end,",
      "}",
    ].join("\n")
    const summary = summarizeBundle(truncated)
    expect(summary.moduleEntryCount).toBe(1)
    expect(summary.hasFooterEntry).toBe(false)
  })

  test("ignores escaped quotes inside module-key strings (no false positives)", () => {
    const source = [
      "____modules = {",
      "}",
      'local x = "[\\"not.a.real.module\\"] = function(...)"',
    ].join("\n")
    const summary = summarizeBundle(source)
    expect(summary.moduleEntryCount).toBe(0)
  })
})
