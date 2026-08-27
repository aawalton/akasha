import { describe, expect, test } from "bun:test"
import { buildRrServerModuleInClientCheck } from "./check-configs-capacitor.ts"
import type { RouterApp } from "./router-apps.ts"
import { selectUnbuiltRouterApps } from "./unbuilt-router-apps.ts"

const NESTED_SPA: RouterApp = {
  configPath: "packages/alanwalton/web/app-capacitor/react-router.config.ts",
  appDir: "packages/alanwalton/web/app-capacitor",
  buildRoot: "packages/alanwalton/web/app-capacitor",
}

const BUILT_APP: RouterApp = {
  configPath: "packages/alanwalton/web/react-router.config.ts",
  appDir: "packages/alanwalton/web/app",
  buildRoot: "packages/alanwalton/web",
}

const BUILT_ROOTS = new Set(["packages/alanwalton/web"])

describe("selectUnbuiltRouterApps", () => {
  test("keeps a build root nested inside a built workspace, drops the workspace itself", () => {
    expect(selectUnbuiltRouterApps([NESTED_SPA, BUILT_APP], BUILT_ROOTS)).toEqual([NESTED_SPA])
  })
})

describe("buildRrServerModuleInClientCheck", () => {
  const config = buildRrServerModuleInClientCheck([NESTED_SPA])

  test("scopes the population to the unbuilt app's source root and no other", () => {
    expect(config.dispatchNodeTypes).toEqual([
      { kind: "ts-file", under: "packages/alanwalton/web/app-capacitor" },
      { kind: "tsx-file", under: "packages/alanwalton/web/app-capacitor" },
    ])
  })

  test("wakes on the manifests that decide coverage", () => {
    const watched = config.dispatchNodes ?? []
    expect(watched).toContain("json-file:code:packages/alanwalton/web/app-capacitor/package.json")
    expect(watched).toContain("json-file:code:package.json")
  })

  test("refuses an empty selection rather than watching nothing", () => {
    expect(() => buildRrServerModuleInClientCheck([])).toThrow(/buildRrServerModuleInClientCheck/)
  })
})
