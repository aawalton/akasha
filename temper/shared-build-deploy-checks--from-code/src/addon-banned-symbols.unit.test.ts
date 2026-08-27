import { describe, expect, test } from "bun:test"
import { join } from "node:path"
import {
  BARE_GLOBAL_NAMES,
  type Issue,
  maskStringLiterals,
  SHIM_ALLOWLIST,
  scanBundle,
  scanBundleFile,
} from "./addon-banned-symbols"
import {
  ESO_AVAILABLE_COROUTINE,
  ESO_AVAILABLE_DEBUG,
  ESO_AVAILABLE_MATH,
  ESO_AVAILABLE_OS,
  ESO_AVAILABLE_STRING,
  ESO_AVAILABLE_TABLE,
  ESO_AVAILABLE_UTF8,
  ESO_WHOLLY_STRIPPED_NAMESPACES,
} from "./eso-sandbox.manifest"

const FIXTURES = join(import.meta.dir, "..", "__fixtures__", "addon-sandbox")

describe("addon-banned-symbols", () => {
  describe("maskStringLiterals", () => {
    test("masks double-quoted string content, preserves length", () => {
      const masked = maskStringLiterals('local s = "debug.getinfo is cool"')
      expect(masked.length).toBe('local s = "debug.getinfo is cool"'.length)
      expect(masked.includes("debug.getinfo")).toBe(false)
    })

    test("masks single-quoted string content", () => {
      const masked = maskStringLiterals("local s = 'io.open'")
      expect(masked.includes("io.open")).toBe(false)
    })

    test("handles backslash escapes inside strings", () => {
      const masked = maskStringLiterals('local s = "a\\"debug.getinfo"')
      expect(masked.includes("debug.getinfo")).toBe(false)
    })

    test("leaves code outside strings untouched", () => {
      const masked = maskStringLiterals('debug.getinfo(1, "f")')
      expect(masked.startsWith("debug.getinfo(1, ")).toBe(true)
    })
  })

  describe("scanBundle — partial-namespace allow-list (manifest-derived)", () => {
    test("debug.traceback is allowed (only ESO-permitted debug member)", () => {
      expect(scanBundle("debug.traceback()", "t.lua")).toEqual([])
      expect(scanBundle('debug.traceback("", 3)', "t.lua")).toEqual([])
    })

    test("debug.getinfo is rejected (not in ESO_AVAILABLE_DEBUG)", () => {
      const issues = scanBundle("debug.getinfo(1)", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("debug.getinfo")
      expect(issue.family).toBe("namespace-member-stripped")
    })

    test("os.time is allowed (Update-15 re-add)", () => {
      expect(scanBundle("local t = os.time()", "t.lua")).toEqual([])
    })

    test("os.execute is rejected", () => {
      const issues = scanBundle("os.execute('ls')", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("os.execute")
      expect(issue.family).toBe("namespace-member-stripped")
    })

    test("coroutine.create is allowed (Update-34 re-add)", () => {
      expect(scanBundle("local co = coroutine.create(f)", "t.lua")).toEqual([])
    })

    test("coroutine.isyieldable is rejected (5.2+, not backported)", () => {
      const issues = scanBundle("coroutine.isyieldable()", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("coroutine.isyieldable")
      expect(issue.family).toBe("namespace-member-stripped")
    })

    test("string.match is allowed", () => {
      expect(scanBundle("string.match(s, p)", "t.lua")).toEqual([])
    })

    test("string.dump is rejected (treated as stripped per inventory)", () => {
      const issues = scanBundle("string.dump(f)", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("string.dump")
      expect(issue.family).toBe("namespace-member-stripped")
    })

    test("table.sort, table.concat are allowed", () => {
      expect(scanBundle("table.sort(t); table.concat(t, ',')", "t.lua")).toEqual([])
    })

    test("table.pack is rejected (5.2+, not backported)", () => {
      const issues = scanBundle("table.pack(1, 2, 3)", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("table.pack")
    })

    test("math.floor, math.huge, math.pi are allowed", () => {
      expect(scanBundle("math.floor(math.huge); local p = math.pi", "t.lua")).toEqual([])
    })

    test("utf8.char, utf8.charpattern are allowed", () => {
      expect(scanBundle("utf8.char(0x41); local p = utf8.charpattern", "t.lua")).toEqual([])
    })
  })

  describe("scanBundle — wholly-stripped namespaces", () => {
    test("io.open is rejected (io is wholly stripped)", () => {
      const issues = scanBundle("io.open('foo')", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("io.open")
      expect(issue.family).toBe("namespace-stripped")
    })

    test("package.path is rejected (package is wholly stripped)", () => {
      const issues = scanBundle("local p = package.path", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("package.path")
      expect(issue.family).toBe("namespace-stripped")
    })

    test("any io.<x> reference is flagged regardless of member name", () => {
      const issues = scanBundle("io.write('hi')", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.family).toBe("namespace-stripped")
    })
  })

  describe("scanBundle — bare-global stripped names", () => {
    test("dofile is rejected", () => {
      const issues = scanBundle("dofile('foo.lua')", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("dofile")
      expect(issue.family).toBe("global-stripped")
    })

    test("loadfile is rejected", () => {
      const issues = scanBundle("loadfile('bar.lua')", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("loadfile")
      expect(issue.family).toBe("global-stripped")
    })

    test("rawlen is rejected (5.2+, not backported)", () => {
      const issues = scanBundle("local n = rawlen(t)", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.symbol).toBe("rawlen")
      expect(issue.family).toBe("global-stripped")
    })

    test("module/load/require are NOT flagged as bare globals (TSTL local shadowing)", () => {
      expect(scanBundle("local module = ____modules['x']", "t.lua")).toEqual([])
      expect(scanBundle("local function require(file) end", "t.lua")).toEqual([])
      expect(scanBundle("local f = load", "t.lua")).toEqual([])
    })

    test("word boundary prevents substring hits like `loadHandlers`", () => {
      expect(scanBundle("local loadHandlers = {}", "t.lua")).toEqual([])
      expect(scanBundle("local dofileX = 1", "t.lua")).toEqual([])
      expect(scanBundle("local ____debugCtx = nil", "t.lua")).toEqual([])
    })
  })

  describe("scanBundle — string-literal masking", () => {
    test("string literal containing a stripped symbol is not flagged", () => {
      expect(scanBundle('local s = "debug.getinfo is fine"', "t.lua")).toEqual([])
      expect(scanBundle('local s = "io.open"', "t.lua")).toEqual([])
      expect(scanBundle('local s = "dofile"', "t.lua")).toEqual([])
    })
  })

  describe("scanBundle — reporting", () => {
    test("reports 1-based line and column", () => {
      const issues = scanBundle("  debug.getinfo(1)", "t.lua")
      expect(issues).toHaveLength(1)
      const [issue] = issues
      if (issue === undefined) throw new Error("expected issue")
      expect(issue.line).toBe(1)
      expect(issue.col).toBe(3)
      expect(issue.symbol).toBe("debug.getinfo")
    })

    test("multiple violations on one line each get their own issue", () => {
      const issues = scanBundle("io.read() + os.exit()", "t.lua")
      expect(issues).toHaveLength(2)
      const families = issues.map((i) => i.family).sort()
      expect(families).toEqual(["namespace-member-stripped", "namespace-stripped"])
    })

    test("SHIM_ALLOWLIST holds the 0 entries declared here, each exempt and each still detectable without it", () => {
      expect(SHIM_ALLOWLIST.size).toBe(0)
      for (const line of SHIM_ALLOWLIST) {
        expect(scanBundle(line, "t.lua")).toEqual([])
        expect(scanBundle(line, "t.lua", new Set()).length).toBeGreaterThan(0)
      }
    })
  })

  describe("scanBundle — one pass over the line", () => {
    test("a line whose banned constructs overlap is still refused", () => {
      const issues = scanBundle("debug.dofile()", "t.lua")
      expect(issues.length).toBeGreaterThan(0)
    })

    test("no manifest name is both an available member and a stripped name", () => {
      const available = [
        ...ESO_AVAILABLE_DEBUG,
        ...ESO_AVAILABLE_OS,
        ...ESO_AVAILABLE_COROUTINE,
        ...ESO_AVAILABLE_STRING,
        ...ESO_AVAILABLE_TABLE,
        ...ESO_AVAILABLE_MATH,
        ...ESO_AVAILABLE_UTF8,
      ]
      expect(available.length).toBeGreaterThan(0)
      const stripped = new Set<string>([...ESO_WHOLLY_STRIPPED_NAMESPACES, ...BARE_GLOBAL_NAMES])
      expect(stripped.size).toBeGreaterThan(0)
      expect(available.filter((name) => stripped.has(name))).toEqual([])
    })
  })

  describe("scanBundleFile — real fixtures", () => {
    test("clean.lua (real TemperInventory bundle, hotfix state) yields zero issues", () => {
      const issues = scanBundleFile(join(FIXTURES, "clean.lua"))
      if (issues.length > 0) {
        const sample = issues
          .slice(0, 5)
          .map((i) => `${i.line}:${i.col} ${i.symbol} [${i.family}]`)
          .join("\n")
        throw new Error(`expected 0 issues in clean.lua, got ${issues.length}:\n${sample}`)
      }
      expect(issues).toEqual([])
    })

    test("regression-7179.lua (real TSTL output with sourceMapTraceback:true) flags debug.getinfo", () => {
      const issues = scanBundleFile(join(FIXTURES, "regression-7179.lua"))
      expect(issues.length).toBeGreaterThan(0)
      const debugGetInfo = issues.filter((i: Issue) => i.symbol === "debug.getinfo")
      expect(debugGetInfo.length).toBeGreaterThan(0)
      const lastDebugGetInfoLine = Math.max(...debugGetInfo.map((i: Issue) => i.line))
      expect(lastDebugGetInfoLine).toBeGreaterThan(13000)
    })

    test("banned-debug-getinfo.lua flags debug.getinfo as namespace-member-stripped", () => {
      const issues = scanBundleFile(join(FIXTURES, "banned-debug-getinfo.lua"))
      expect(issues.length).toBeGreaterThan(0)
      const getinfoIssues = issues.filter((i: Issue) => i.symbol === "debug.getinfo")
      expect(getinfoIssues.length).toBeGreaterThan(0)
      expect(getinfoIssues.every((i: Issue) => i.family === "namespace-member-stripped")).toBe(true)
    })

    test("banned-io.lua flags every io.<x> as namespace-stripped", () => {
      const issues = scanBundleFile(join(FIXTURES, "banned-io.lua"))
      expect(issues.length).toBeGreaterThan(0)
      expect(issues.every((i: Issue) => i.family === "namespace-stripped")).toBe(true)
      expect(issues.every((i: Issue) => i.symbol.startsWith("io."))).toBe(true)
    })

    test("banned-os.lua flags os.execute and os.exit as namespace-member-stripped", () => {
      const issues = scanBundleFile(join(FIXTURES, "banned-os.lua"))
      expect(issues.length).toBeGreaterThan(0)
      expect(issues.every((i: Issue) => i.family === "namespace-member-stripped")).toBe(true)
      const symbols = new Set(issues.map((i: Issue) => i.symbol))
      expect(symbols.has("os.execute")).toBe(true)
      expect(symbols.has("os.exit")).toBe(true)
    })

    test("banned-package.lua flags every package.<x> as namespace-stripped", () => {
      const issues = scanBundleFile(join(FIXTURES, "banned-package.lua"))
      expect(issues.length).toBeGreaterThan(0)
      expect(issues.every((i: Issue) => i.family === "namespace-stripped")).toBe(true)
      expect(issues.every((i: Issue) => i.symbol.startsWith("package."))).toBe(true)
    })

    test("banned-dofile.lua flags dofile and loadfile as global-stripped", () => {
      const issues = scanBundleFile(join(FIXTURES, "banned-dofile.lua"))
      expect(issues.length).toBeGreaterThan(0)
      expect(issues.every((i: Issue) => i.family === "global-stripped")).toBe(true)
      const symbols = new Set(issues.map((i: Issue) => i.symbol))
      expect(symbols.has("dofile")).toBe(true)
      expect(symbols.has("loadfile")).toBe(true)
    })
  })
})
