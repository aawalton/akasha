import { beforeEach, describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { AppLoadContext } from "react-router"

const BUNDLE_DIR = mkdtempSync(join(tmpdir(), "temper-addons-"))
process.env["ADDONS_BUNDLE_DIR"] = BUNDLE_DIR

const BUNDLE_FILE = join(BUNDLE_DIR, "temper-addons.zip")
const VERSION_FILE = join(BUNDLE_DIR, "version.txt")

const { loader: downloadLoader } = await import("./api.addons.download")
const { loader: versionLoader } = await import("./api.addons.version")

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
  rmSync(VERSION_FILE, { force: true })
})

describe("GET /api/addons/download", () => {
  it("404s with a JSON body when the bundle is absent", async () => {
    const response = downloadLoader(loaderArgs("/api/addons/download"))

    expect(response.status).toBe(404)
    expect(response.headers.get("content-type")).toContain("application/json")
    expect(await response.text()).toBe(JSON.stringify({ error: "Addon bundle not available" }))
  })

  it("serves the archive with attachment headers and the on-disk byte length", async () => {
    writeFileSync(BUNDLE_FILE, BUNDLE_BYTES)

    const response = downloadLoader(loaderArgs("/api/addons/download"))

    expect(response.status).toBe(200)
    expect(response.headers.get("content-type")).toBe("application/zip")
    expect(response.headers.get("content-disposition")).toBe(
      'attachment; filename="temper-addons.zip"'
    )
    expect(response.headers.get("content-length")).toBe(String(BUNDLE_BYTES.byteLength))
  })
})

describe("GET /api/addons/version", () => {
  it("404s with a JSON body when the version file is absent", async () => {
    const response = versionLoader(loaderArgs("/api/addons/version"))

    expect(response.status).toBe(404)
    expect(response.headers.get("content-type")).toContain("application/json")
    expect(await response.text()).toBe(
      JSON.stringify({ error: "Addon bundle version not available" })
    )
  })

  it("reports the trimmed version alongside the download URL", async () => {
    writeFileSync(VERSION_FILE, "4312dc56\n")

    const response = versionLoader(loaderArgs("/api/addons/version"))

    expect(response.status).toBe(200)
    expect(await response.text()).toBe(
      JSON.stringify({ version: "4312dc56", downloadUrl: "/api/addons/download" })
    )
  })
})
