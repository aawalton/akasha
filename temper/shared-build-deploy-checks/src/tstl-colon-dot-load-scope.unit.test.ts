import { describe, expect, test } from "bun:test"
import { functionDepthByLine } from "./tstl-colon-dot-load-scope"
import { scanBundle } from "./tstl-colon-dot-self-shift"

const COLON = new Set(["SetColor", "SetAnchor", "CreateControl", "GetControl", "ReleaseAllObjects"])

describe("functionDepthByLine", () => {
  test("module-body lines are depth 1; nested-function lines are depth 2", () => {
    const lua = [
      '["m"] = function(...)',
      "  local x = 1",
      "  f = function(self)",
      "    g()",
      "  end",
      "end",
    ].join("\n")
    const d = functionDepthByLine(lua)
    expect(d[0]).toBe(0)
    expect(d[1]).toBe(1)
    expect(d[3]).toBe(2)
    expect(d[5]).toBe(1)
  })

  test("if/for/while/do/repeat blocks do not raise function-depth", () => {
    const lua = [
      '["m"] = function(...)',
      "  if a then",
      "    for i = 1, 3 do",
      "      while b do",
      "        repeat",
      "          x()",
      "        until c",
      "      end",
      "    end",
      "  end",
      "end",
    ].join("\n")
    const d = functionDepthByLine(lua)
    expect(d[5]).toBe(1)
  })

  test("a string or comment containing `function` does not change depth", () => {
    const lua = [
      '["m"] = function(...)',
      '  local s = "function end"',
      "  -- function foo() end",
      "  y()",
      "end",
    ].join("\n")
    const d = functionDepthByLine(lua)
    expect(d[3]).toBe(1)
  })
})

describe("scanBundle (load-scope classification)", () => {
  test("flags a module-body self-shift as loadScope (depth ≤ 1)", () => {
    const lua = ['["m"] = function(...)', "  bg.SetColor(1, 0, 0)", "end"].join("\n")
    const issues = scanBundle(lua, "b.lua", COLON, [])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.loadScope).toBe(true)
  })

  test("a self-shift inside a nested function is NOT loadScope (deferred, depth ≥ 2)", () => {
    const lua = [
      '["m"] = function(...)',
      "  WritCreater.foo = function(self)",
      "    bg.SetColor(1, 0, 0)",
      "  end",
      "end",
    ].join("\n")
    const issues = scanBundle(lua, "b.lua", COLON, [])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.loadScope).toBe(false)
  })

  test("a self-shift after a nested function closes is loadScope again", () => {
    const lua = [
      '["m"] = function(...)',
      "  WritCreater.foo = function(self)",
      "    bg.SetAnchor(1)",
      "  end",
      "  bg.SetColor(1, 0, 0)",
      "end",
    ].join("\n")
    const issues = scanBundle(lua, "b.lua", COLON, [])
    const byMethod = Object.fromEntries(issues.map((i) => [i.method, i.loadScope]))
    expect(byMethod.SetAnchor).toBe(false)
    expect(byMethod.SetColor).toBe(true)
  })

  test("a `for … do … end` loop in the module body does not inflate function-depth", () => {
    const lua = [
      '["m"] = function(...)',
      "  for i = 1, 3 do",
      "    bg.SetColor(i)",
      "  end",
      "end",
    ].join("\n")
    const issues = scanBundle(lua, "b.lua", COLON, [])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.loadScope).toBe(true)
  })

  test("a same-line nested function is not misread as load-scope", () => {
    const lua = [
      '["m"] = function(...)',
      "  t.sort(x, function(a) return bg.SetColor(a) end)",
      "end",
    ].join("\n")
    const issues = scanBundle(lua, "b.lua", COLON, [])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.loadScope).toBe(false)
  })
})
