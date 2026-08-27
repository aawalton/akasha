import { afterAll, describe, expect, test } from "bun:test"
import { mkdir, mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { parseManifestVersion, readInstalledAddons } from "./installed"

describe("parseManifestVersion", () => {
  test("reads the ## Version: line", () => {
    expect(parseManifestVersion("## Title: Foo\n## Version: 1.2.3\n")).toBe("1.2.3")
  })

  test("returns undefined when absent", () => {
    expect(parseManifestVersion("## Title: Foo\n")).toBeUndefined()
  })
})

const roots: string[] = []

async function makeAddonsDir(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "community-addons-"))
  roots.push(root)
  return root
}

async function writeAddon(root: string, dir: string, file: string, body: string): Promise<void> {
  const dirPath = join(root, dir)
  await mkdir(dirPath, { recursive: true })
  await writeFile(join(dirPath, file), body, "utf8")
}

afterAll(async () => {
  const { rm } = await import("node:fs/promises")
  for (const root of roots) await rm(root, { recursive: true, force: true })
})

describe("readInstalledAddons", () => {
  test("reads a version from a .txt manifest", async () => {
    const root = await makeAddonsDir()
    await writeAddon(root, "Foo", "Foo.txt", "## Version: 1.0\n")
    const addons = await readInstalledAddons(root)
    expect(addons).toEqual([{ dir: "Foo", version: "1.0" }])
  })

  test("reads a version from a .addon manifest (the extension regression)", async () => {
    const root = await makeAddonsDir()
    await writeAddon(root, "LibGPS", "LibGPS.addon", "## Version: 3.3.3\n")
    const addons = await readInstalledAddons(root)
    expect(addons).toEqual([{ dir: "LibGPS", version: "3.3.3" }])
  })

  test("prefers the .txt manifest when both extensions exist", async () => {
    const root = await makeAddonsDir()
    await writeAddon(root, "Both", "Both.txt", "## Version: 9.9\n")
    await writeAddon(root, "Both", "Both.addon", "## Version: 0.1\n")
    const addons = await readInstalledAddons(root)
    expect(addons).toEqual([{ dir: "Both", version: "9.9" }])
  })

  test("reports a folder with no manifest as version undefined", async () => {
    const root = await makeAddonsDir()
    await mkdir(join(root, "SubLib"), { recursive: true })
    const addons = await readInstalledAddons(root)
    expect(addons).toEqual([{ dir: "SubLib", version: undefined }])
  })
})
