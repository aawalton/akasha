import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { NO_PACKAGES, packagesAt, pathOf } from "./packages.ts"

const SCRATCH = "/var/tmp"

function tree(manifests: Readonly<Record<string, unknown>>): string {
  const root = mkdtempSync(`${SCRATCH}/packages-`)
  for (const [key, held] of Object.entries(manifests)) {
    const at = key.lastIndexOf("/")
    if (at !== -1) mkdirSync(`${root}/${key.slice(0, at)}`, { recursive: true })
    writeFileSync(`${root}/${key}`, JSON.stringify(held))
  }
  return root
}

function within(manifests: Readonly<Record<string, unknown>>, specifier: string): string | null {
  const root = tree(manifests)
  try {
    return pathOf(packagesAt(root), specifier)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

const ROOT = { "package.json": { workspaces: ["packages/*"] } }

const WILDCARD = {
  ...ROOT,
  "packages/page/package.json": {
    name: "@akasha/page",
    exports: { ".": "./index.ts", "./*": "./src/*.ts" },
  },
}

test("a tree with no workspaces holds no packages", () => {
  const root = tree({ "package.json": { name: "akasha" } })
  try {
    expect(packagesAt(root)).toEqual(NO_PACKAGES)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a bare name resolves through the root export", () => {
  expect(within(WILDCARD, "@akasha/page")).toBe("packages/page/index.ts")
})

test("a subpath resolves through the wildcard export", () => {
  expect(within(WILDCARD, "@akasha/page/text")).toBe("packages/page/src/text.ts")
})

test("a deeper subpath fills the wildcard whole", () => {
  expect(within(WILDCARD, "@akasha/page/document/frontmatter")).toBe(
    "packages/page/src/document/frontmatter.ts"
  )
})

test("the more specific pattern wins over the looser one", () => {
  const held = {
    ...ROOT,
    "packages/page/package.json": {
      name: "@akasha/page",
      exports: { "./*": "./src/*.ts", "./setup/*": "./setup/*.ts" },
    },
  }
  expect(within(held, "@akasha/page/setup/one")).toBe("packages/page/setup/one.ts")
})

test("a package with no exports maps its subpath directly", () => {
  const held = { ...ROOT, "packages/page/package.json": { name: "@akasha/page" } }
  expect(within(held, "@akasha/page/text.ts")).toBe("packages/page/text.ts")
})

test("a relative specifier is not a package", () => {
  expect(within(WILDCARD, "../../page/text.ts")).toBeNull()
})

test("a node builtin is not a package", () => {
  expect(within(WILDCARD, "node:path")).toBeNull()
})

test("a name no workspace carries does not resolve", () => {
  expect(within(WILDCARD, "@akasha/graph/ask")).toBeNull()
})

test("a subpath the exports do not cover does not resolve", () => {
  const held = {
    ...ROOT,
    "packages/page/package.json": { name: "@akasha/page", exports: { ".": "./index.ts" } },
  }
  expect(within(held, "@akasha/page/text")).toBeNull()
})

test("two packages claiming one name resolve to the first by path", () => {
  const held = {
    "package.json": { workspaces: ["packages/*"] },
    "packages/aaa/package.json": { name: "@akasha/page", exports: { "./*": "./*.ts" } },
    "packages/zzz/package.json": { name: "@akasha/page", exports: { "./*": "./*.ts" } },
  }
  expect(within(held, "@akasha/page/text")).toBe("packages/aaa/text.ts")
})
