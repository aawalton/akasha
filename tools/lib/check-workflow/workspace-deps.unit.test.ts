import { describe, expect, test } from "bun:test"
import {
  commandNamesFromScript,
  computeTransitiveClosure,
  declaredDepsOf,
  extractPackageName,
  indexWorkspacesByName,
  type WorkspaceInfo,
} from "./workspace-deps.ts"

describe("extractPackageName", () => {
  test("returns the bare package for a single-segment specifier", () => {
    expect(extractPackageName("react")).toBe("react")
  })

  test("returns scope/name for scoped packages", () => {
    expect(extractPackageName("@scope/pkg")).toBe("@scope/pkg")
  })

  test("strips sub-paths from unscoped specifiers", () => {
    expect(extractPackageName("pkg/sub/path")).toBe("pkg")
  })

  test("strips sub-paths from scoped specifiers", () => {
    expect(extractPackageName("@scope/pkg/sub/path")).toBe("@scope/pkg")
  })

  test("returns null for relative or absolute specifiers", () => {
    expect(extractPackageName("./relative")).toBe(null)
    expect(extractPackageName("../up")).toBe(null)
    expect(extractPackageName("/abs")).toBe(null)
  })

  test("returns null for protocol-prefixed specifiers", () => {
    expect(extractPackageName("node:fs")).toBe(null)
    expect(extractPackageName("bun:test")).toBe(null)
  })

  test("returns null for path-alias specifiers", () => {
    expect(extractPackageName("@/components/Foo")).toBe(null)
    expect(extractPackageName("~/lib/util")).toBe(null)
  })

  test("returns null for template-literal specifiers", () => {
    expect(extractPackageName("pkg-${name}")).toBe(null)
  })

  test("returns null for empty input", () => {
    expect(extractPackageName("")).toBe(null)
  })

  test("returns null for invalid scope", () => {
    expect(extractPackageName("@bad scope/pkg")).toBe(null)
  })

  test("returns null for an isolated @ with no name segment", () => {
    expect(extractPackageName("@scope")).toBe(null)
  })
})

describe("declaredDepsOf", () => {
  test("returns empty sets for a package with no declared deps", () => {
    const r = declaredDepsOf({})
    expect(r.dependencies.size).toBe(0)
    expect(r.devDependencies.size).toBe(0)
    expect(r.all.size).toBe(0)
  })

  test("partitions dependencies and devDependencies", () => {
    const r = declaredDepsOf({
      dependencies: { a: "1", b: "2" },
      devDependencies: { c: "3" },
    })
    expect([...r.dependencies].sort()).toEqual(["a", "b"])
    expect([...r.devDependencies]).toEqual(["c"])
    expect([...r.all].sort()).toEqual(["a", "b", "c"])
  })

  test("merges overlapping dep and devDep entries into all without duplication", () => {
    const r = declaredDepsOf({
      dependencies: { shared: "1" },
      devDependencies: { shared: "1", extra: "2" },
    })
    expect([...r.all].sort()).toEqual(["extra", "shared"])
  })
})

describe("indexWorkspacesByName", () => {
  function ws(over: Partial<WorkspaceInfo>): WorkspaceInfo {
    return {
      root: "shared/x",
      name: "@scope/x",
      packageJsonPath: "/abs/shared/x/package.json",
      pkg: {},
      ...over,
    }
  }

  test("maps workspaces by their package.json name", () => {
    const a = ws({ name: "@s/a", root: "shared/a" })
    const b = ws({ name: "@s/b", root: "shared/b" })
    const idx = indexWorkspacesByName([a, b])
    expect(idx.get("@s/a")).toBe(a)
    expect(idx.get("@s/b")).toBe(b)
  })

  test("omits workspaces missing a name field", () => {
    const a = ws({ name: "@s/a", root: "shared/a" })
    const nameless = ws({ name: "", root: "shared/nameless" })
    const idx = indexWorkspacesByName([a, nameless])
    expect(idx.size).toBe(1)
    expect(idx.has("@s/a")).toBe(true)
  })
})

describe("computeTransitiveClosure", () => {
  function ws(name: string, root: string, deps: readonly string[] = []): WorkspaceInfo {
    return {
      root,
      name,
      packageJsonPath: `/abs/${root}/package.json`,
      pkg: { dependencies: Object.fromEntries(deps.map((d) => [d, "workspace:*"])) },
    }
  }

  test("includes the workspace itself in its closure", () => {
    const a = ws("@s/a", "shared/a")
    const closure = computeTransitiveClosure([a])
    expect([...(closure.get("shared/a") ?? [])]).toEqual(["shared/a"])
  })

  test("follows dependency edges through the workspace graph", () => {
    const a = ws("@s/a", "shared/a", ["@s/b"])
    const b = ws("@s/b", "shared/b", ["@s/c"])
    const c = ws("@s/c", "shared/c")
    const closure = computeTransitiveClosure([a, b, c])
    expect([...(closure.get("shared/a") ?? [])].sort()).toEqual([
      "shared/a",
      "shared/b",
      "shared/c",
    ])
    expect([...(closure.get("shared/c") ?? [])]).toEqual(["shared/c"])
  })

  test("ignores deps that are not workspaces", () => {
    const a = ws("@s/a", "shared/a", ["react", "@s/b"])
    const b = ws("@s/b", "shared/b")
    const closure = computeTransitiveClosure([a, b])
    expect([...(closure.get("shared/a") ?? [])].sort()).toEqual(["shared/a", "shared/b"])
  })

  test("terminates on workspace dependency cycles", () => {
    const a = ws("@s/a", "shared/a", ["@s/b"])
    const b = ws("@s/b", "shared/b", ["@s/a"])
    const closure = computeTransitiveClosure([a, b])
    expect([...(closure.get("shared/a") ?? [])].sort()).toEqual(["shared/a", "shared/b"])
    expect([...(closure.get("shared/b") ?? [])].sort()).toEqual(["shared/a", "shared/b"])
  })
})

describe("commandNamesFromScript", () => {
  test("returns the binary name from a single command", () => {
    expect(commandNamesFromScript("tsc -b")).toEqual(["tsc"])
  })

  test("emits both bunx and the runned package", () => {
    expect(commandNamesFromScript("bunx knip")).toEqual(["bunx", "knip"])
  })

  test("strips an @version suffix from bunx targets", () => {
    expect(commandNamesFromScript("bunx knip@5")).toEqual(["bunx", "knip"])
  })

  test("emits both bun and the runned package for bun x", () => {
    expect(commandNamesFromScript("bun x @foo/bar --arg")).toEqual(["bun", "@foo/bar"])
  })

  test("does NOT credit script aliases in bun run (those are processed via the script body)", () => {
    expect(commandNamesFromScript("bun run --cwd foo build")).toEqual(["bun"])
  })

  test("walks chained subcommands", () => {
    expect(commandNamesFromScript("biome check . && tsc -b")).toEqual(["biome", "tsc"])
  })

  test("handles env-prefixed commands inside chains", () => {
    expect(commandNamesFromScript("FOO=1 next build")).toEqual(["next"])
  })

  test("strips an @version suffix from scoped bun-x targets", () => {
    expect(commandNamesFromScript("bun x @foo/bar@1.2.3")).toEqual(["bun", "@foo/bar"])
  })
})
