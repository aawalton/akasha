// The route serves the archive off disk, so what it answers is read from a real file rather than
// from a stub. `ADDONS_BUNDLE_DIR` is read once when the bundle-dir module loads, so the temporary
// folder is put in the environment before the route's code is imported, and the import is dynamic
// for that reason alone.
//
// What this pins: an absent bundle is a 404 carrying JSON rather than an empty 200 or a throw, and
// a present one is served with the headers a downloader needs — the archive type, the file name to
// save it under, and the length read off the file rather than assumed.

import { beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { AppLoadContext } from "react-router"

const BUNDLE_DIR = mkdtempSync(join(tmpdir(), "temper-addons-"))
process.env["ADDONS_BUNDLE_DIR"] = BUNDLE_DIR

const BUNDLE_FILE = join(BUNDLE_DIR, "temper-addons.zip")

const { loader } = await import("./addon-bundle.route.code.tsx")

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
