import { beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { AppLoadContext } from "react-router"

const SCRATCH_AT = "/var/tmp"

process.env["ADDONS_BUNDLE_DIR"] = mkdtempSync(join(SCRATCH_AT, "temper-addons-"))

const { loader } = await import("./addon-bundle.route.code.ts")
const { ADDONS_BUNDLE_DIR } = await import(
  "../../.server/addons-bundle-dir/addons-bundle-dir.module.code.ts"
)

const BUNDLE_FILE = join(ADDONS_BUNDLE_DIR, "temper-addons.zip")

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

const BUNDLE_BYTES = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x01, 0x02, 0x03])

beforeEach(() => {
  rmSync(BUNDLE_FILE, { force: true })
})

test("404s with a JSON body when the bundle is absent", async () => {
  const response = loader(loaderArgs("/api/addons/download"))

  expect(response.status).toBe(404)
  expect(response.headers.get("content-type")).toContain("application/json")
  expect(await response.text()).toBe(JSON.stringify({ error: "Addon bundle not available" }))
})

test("serves the archive with attachment headers and the on-disk byte length", () => {
  writeFileSync(BUNDLE_FILE, BUNDLE_BYTES)

  const response = loader(loaderArgs("/api/addons/download"))

  expect(response.status).toBe(200)
  expect(response.headers.get("content-type")).toBe("application/zip")
  expect(response.headers.get("content-disposition")).toBe(
    'attachment; filename="temper-addons.zip"'
  )
  expect(response.headers.get("content-length")).toBe(String(BUNDLE_BYTES.byteLength))
})
