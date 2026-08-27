import { describe, expect, it } from "bun:test"
import {
  extractRouteModulePaths,
  extractValueServerImports,
  isExemptImporter,
  isServerModulePath,
  isServerSpecifier,
  isTestFilePath,
  parseAppDirectory,
  resolveConfigAppDir,
  scanFileForServerLeaks,
} from "./rr-server-module-imports.ts"

const APP = "/repo/app"

describe("parseAppDirectory", () => {
  it("defaults to 'app' when the config declares no appDirectory", () => {
    expect(parseAppDirectory(`export default { ssr: true } satisfies Config`)).toBe("app")
  })
  it("reads a flat-layout '.' appDirectory (root-mounted in-shell SPA)", () => {
    expect(
      parseAppDirectory(`export default { ssr: false, appDirectory: ".", buildDirectory: "build" }`)
    ).toBe(".")
  })
  it("reads a custom appDirectory with either quote style", () => {
    expect(parseAppDirectory(`export default { appDirectory: "src/app" }`)).toBe("src/app")
    expect(parseAppDirectory(`export default { appDirectory: 'client' }`)).toBe("client")
  })
  it("defaults to 'app' for unreadable (undefined) config text", () => {
    expect(parseAppDirectory(undefined)).toBe("app")
  })
})

describe("resolveConfigAppDir", () => {
  const WEB_CFG = "/repo/packages/alanwalton/web/app-capacitor/react-router.config.ts"
  const STD_CFG = "/repo/packages/alanwalton/web/react-router.config.ts"
  it("resolves a flat-layout '.' appDirectory to the config's own dir (not <dir>/app)", () => {
    expect(resolveConfigAppDir(WEB_CFG, `export default { ssr: false, appDirectory: "." }`)).toBe(
      "/repo/packages/alanwalton/web/app-capacitor"
    )
  })
  it("resolves a default (undeclared) appDirectory to the config dir's app/ subdir", () => {
    expect(resolveConfigAppDir(STD_CFG, `export default { ssr: true } satisfies Config`)).toBe(
      "/repo/packages/alanwalton/web/app"
    )
  })
  it("resolves a custom appDirectory relative to the config dir", () => {
    expect(resolveConfigAppDir(STD_CFG, `export default { appDirectory: "src/app" }`)).toBe(
      "/repo/packages/alanwalton/web/src/app"
    )
  })
  it("resolves to the default app/ subdir when config text is unreadable", () => {
    expect(resolveConfigAppDir(STD_CFG, undefined)).toBe("/repo/packages/alanwalton/web/app")
  })
})

describe("isServerModulePath", () => {
  it("matches the .server file suffix with and without extension", () => {
    expect(isServerModulePath("/a/game.server.ts")).toBe(true)
    expect(isServerModulePath("/a/game.server.tsx")).toBe(true)
    expect(isServerModulePath("/a/game.server")).toBe(true)
    expect(isServerModulePath("/a/game.server.mjs")).toBe(true)
  })
  it("matches the /.server/ directory convention", () => {
    expect(isServerModulePath("/a/.server/db.ts")).toBe(true)
  })
  it("does not match plain modules or the 'server' substring without a dot boundary", () => {
    expect(isServerModulePath("/a/game.ts")).toBe(false)
    expect(isServerModulePath("/a/myserver.ts")).toBe(false)
    expect(isServerModulePath("/a/observer.ts")).toBe(false)
  })
})

describe("isServerSpecifier", () => {
  it("matches relative and aliased .server specifiers", () => {
    expect(isServerSpecifier("./lib/game.server")).toBe(true)
    expect(isServerSpecifier("~/lib/supabase.server")).toBe(true)
    expect(isServerSpecifier("../awen/lib/game.server")).toBe(true)
    expect(isServerSpecifier("~/.server/db")).toBe(true)
  })
  it("does not match non-server specifiers (incl. the 'observer' false-friend)", () => {
    expect(isServerSpecifier("./lib/game")).toBe(false)
    expect(isServerSpecifier("./lib/observer")).toBe(false)
    expect(isServerSpecifier("react-router")).toBe(false)
  })
})

describe("isTestFilePath", () => {
  it("matches .test and typed-test suffixes", () => {
    expect(isTestFilePath("/a/x.test.ts")).toBe(true)
    expect(isTestFilePath("/a/x.unit.test.ts")).toBe(true)
    expect(isTestFilePath("/a/x.test.tsx")).toBe(true)
  })
  it("does not match non-test files", () => {
    expect(isTestFilePath("/a/x.ts")).toBe(false)
    expect(isTestFilePath("/a/contest.ts")).toBe(false)
  })
})

describe("extractValueServerImports", () => {
  it("flags a plain named value import of a .server specifier", () => {
    const refs = extractValueServerImports("c.tsx", `import { loadGame } from "./lib/game.server"`)
    expect(refs.map((r) => r.specifier)).toEqual(["./lib/game.server"])
    expect(refs[0]?.line).toBe(1)
  })
  it("ignores `import type` and named-type-only imports (erased — no runtime edge)", () => {
    expect(extractValueServerImports("c.ts", `import type { Cfg } from "./game.server"`)).toEqual(
      []
    )
    expect(extractValueServerImports("c.ts", `import { type Cfg } from "./game.server"`)).toEqual(
      []
    )
  })
  it("flags a mixed import that has at least one value binding", () => {
    const refs = extractValueServerImports(
      "c.ts",
      `import { type Cfg, loadGame } from "./game.server"`
    )
    expect(refs).toHaveLength(1)
  })
  it("flags a namespace import and a bare side-effect import", () => {
    expect(extractValueServerImports("c.ts", `import * as g from "./game.server"`)).toHaveLength(1)
    expect(extractValueServerImports("c.ts", `import "./boot.server"`)).toHaveLength(1)
  })
  it("flags a value re-export but ignores a type-only re-export", () => {
    expect(extractValueServerImports("c.ts", `export { x } from "./game.server"`)).toHaveLength(1)
    expect(extractValueServerImports("c.ts", `export type { T } from "./game.server"`)).toEqual([])
  })
  it("flags a dynamic import of a .server specifier", () => {
    expect(extractValueServerImports("c.ts", `const m = import("./game.server")`)).toHaveLength(1)
  })
  it("ignores imports of non-server modules", () => {
    expect(extractValueServerImports("c.ts", `import { foo } from "./regular"`)).toEqual([])
  })
})

describe("extractRouteModulePaths", () => {
  const routesText = `
    import { index, layout, route } from "@react-router/dev/routes"
    export default [
      layout("routes/_app-layout.tsx", [
        index("routes/home.tsx"),
        route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx"),
      ]),
      route("api/errors", "routes/api.errors.ts"),
    ]
  `
  const set = extractRouteModulePaths(APP, routesText)
  it("collects each declared route module file (resolved against appDir)", () => {
    expect(set.has(`${APP}/routes/_app-layout.tsx`)).toBe(true)
    expect(set.has(`${APP}/routes/home.tsx`)).toBe(true)
    expect(set.has(`${APP}/routes/page-detail.tsx`)).toBe(true)
    expect(set.has(`${APP}/routes/api.errors.ts`)).toBe(true)
  })
  it("includes the implicit root route and server entry", () => {
    expect(set.has(`${APP}/root.tsx`)).toBe(true)
    expect(set.has(`${APP}/entry.server.tsx`)).toBe(true)
  })
  it("does not treat URL path args as route module files", () => {
    expect(set.has(`${APP}/api/errors`)).toBe(false)
    expect([...set].some((p) => p.includes(":pageTypeSlug"))).toBe(false)
  })
})

describe("isExemptImporter", () => {
  const routes = extractRouteModulePaths(APP, `export default [route("home", "routes/home.tsx")]`)
  it("exempts server modules, test files, route modules, root, entry.server, and routes.ts", () => {
    expect(isExemptImporter(`${APP}/lib/db.server.ts`, APP, routes)).toBe(true)
    expect(isExemptImporter(`${APP}/lib/x.unit.test.ts`, APP, routes)).toBe(true)
    expect(isExemptImporter(`${APP}/routes/home.tsx`, APP, routes)).toBe(true)
    expect(isExemptImporter(`${APP}/root.tsx`, APP, routes)).toBe(true)
    expect(isExemptImporter(`${APP}/entry.server.tsx`, APP, routes)).toBe(true)
    expect(isExemptImporter(`${APP}/routes.ts`, APP, routes)).toBe(true)
  })
  it("does not exempt a regular client component", () => {
    expect(isExemptImporter(`${APP}/awen/game-reader.tsx`, APP, routes)).toBe(false)
    expect(isExemptImporter(`${APP}/components/widget.tsx`, APP, routes)).toBe(false)
  })
})

describe("scanFileForServerLeaks", () => {
  const routes = extractRouteModulePaths(APP, `export default [route("home", "routes/home.tsx")]`)
  const scan = (absPath: string, text: string) =>
    scanFileForServerLeaks({
      absPath,
      relPath: absPath.replace("/repo/", ""),
      text,
      appDir: APP,
      routeModules: routes,
    })

  it("flags a non-route component that value-imports a .server module (the #13877 shape)", () => {
    const v = scan(`${APP}/awen/game-reader.tsx`, `import { loadGame } from "./lib/game.server"`)
    expect(v).toHaveLength(1)
    expect(v[0]?.specifier).toBe("./lib/game.server")
    expect(v[0]?.file).toBe("app/awen/game-reader.tsx")
  })
  it("does not flag a route module importing a .server loader", () => {
    expect(scan(`${APP}/routes/home.tsx`, `import { load } from "../lib/x.server"`)).toEqual([])
  })
  it("does not flag a .server module importing another .server module", () => {
    expect(scan(`${APP}/lib/a.server.ts`, `import { b } from "./b.server"`)).toEqual([])
  })
  it("does not flag a test file importing a .server module", () => {
    expect(scan(`${APP}/lib/x.unit.test.ts`, `import { b } from "./b.server"`)).toEqual([])
  })
  it("does not flag a type-only import in a non-route module", () => {
    expect(scan(`${APP}/components/w.tsx`, `import type { T } from "./t.server"`)).toEqual([])
  })
})
