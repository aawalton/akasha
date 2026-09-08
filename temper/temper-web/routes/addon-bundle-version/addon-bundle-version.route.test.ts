import { beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { AppLoadContext } from "react-router"

const SCRATCH_AT = "/var/tmp"

process.env["ADDONS_BUNDLE_DIR"] = mkdtempSync(join(SCRATCH_AT, "temper-addons-"))

const { loader } = await import("./addon-bundle-version.route.code.ts")
const { ADDONS_BUNDLE_DIR } = await import(
  "../../.server/addons-bundle-dir/addons-bundle-dir.module.code.ts"
)

const VERSION_FILE = join(ADDONS_BUNDLE_DIR, "version.txt")

type ResourceLoaderArgs = {
  request: Request
  url: URL
  params: Record<string, never>
  pattern: string
  context: AppLoadContext
}

function loaderArgs(pathname: string): ResourceLoaderArgs {
  const url = new URL(`https://tempereso.com${pathname}`)
  return { request: new Request(url), url, params: {}, pattern: pathname, context: {} }
}

beforeEach(() => {
  rmSync(VERSION_FILE, { force: true })
})

test("404s with a JSON body when the version file is absent", async () => {
  const response = loader(loaderArgs("/api/addons/version"))

  expect(response.status).toBe(404)
  expect(response.headers.get("content-type")).toContain("application/json")
  expect(await response.text()).toBe(
    JSON.stringify({ error: "Addon bundle version not available" })
  )
})

test("reports the trimmed version alongside the download URL", async () => {
  writeFileSync(VERSION_FILE, "4312dc56\n")

  const response = loader(loaderArgs("/api/addons/version"))

  expect(response.status).toBe(200)
  expect(await response.text()).toBe(
    JSON.stringify({ version: "4312dc56", downloadUrl: "/api/addons/download" })
  )
})
