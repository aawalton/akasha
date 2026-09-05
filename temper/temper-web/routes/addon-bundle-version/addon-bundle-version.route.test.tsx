// The route reads the version off disk, so what it answers is read from a real file rather than
// from a stub. `ADDONS_BUNDLE_DIR` is read once when the bundle-dir module loads, so the temporary
// folder is put in the environment before the route's code is imported, and the import is dynamic
// for that reason alone.
//
// What this pins: an absent version file is a 404 carrying JSON rather than an empty 200 or a
// throw, and a present one is answered with the trailing newline off it, since a caller comparing
// the version it holds against this one compares text. The download address rides along so a
// caller that finds itself behind has somewhere to go without knowing the address itself.

import { beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { AppLoadContext } from "react-router"

const BUNDLE_DIR = mkdtempSync(join(tmpdir(), "temper-addons-"))
process.env["ADDONS_BUNDLE_DIR"] = BUNDLE_DIR

const VERSION_FILE = join(BUNDLE_DIR, "version.txt")

const { loader } = await import("./addon-bundle-version.route.code.tsx")

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
