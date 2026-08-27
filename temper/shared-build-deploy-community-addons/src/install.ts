import { createHash } from "node:crypto"
import { cp, mkdtemp, readdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { OperationalError } from "@shared/errors-core/exit"
import extract from "extract-zip"
import type { FileDetails } from "./catalog"

export interface InstallResult {
  readonly installedDirs: readonly string[]
  readonly version: string
}

function md5Hex(bytes: Uint8Array): string {
  return createHash("md5").update(bytes).digest("hex")
}

async function downloadVerified(details: FileDetails, zipPath: string): Promise<void> {
  let res: Response
  try {
    res = await fetch(details.downloadUrl)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new OperationalError(`network error downloading ${details.downloadUrl}: ${message}`)
  }
  if (!res.ok) {
    throw new OperationalError(`HTTP ${res.status} downloading ${details.downloadUrl}`)
  }
  const bytes = new Uint8Array(await res.arrayBuffer())
  const actual = md5Hex(bytes)
  if (actual !== details.md5) {
    throw new OperationalError(
      `MD5 mismatch for file ${details.uid}: expected ${details.md5}, got ${actual}`
    )
  }
  await writeFile(zipPath, bytes)
}

export async function downloadAndInstall(
  details: FileDetails,
  expectedDirs: readonly string[],
  addonsPath: string
): Promise<InstallResult> {
  const work = await mkdtemp(join(tmpdir(), "temper-addon-"))
  try {
    const zipPath = join(work, "addon.zip")
    await downloadVerified(details, zipPath)

    const staging = join(work, "extract")
    await extract(zipPath, { dir: staging })

    const extracted = await readdir(staging, { withFileTypes: true })
    const topDirs = extracted.filter((e) => e.isDirectory()).map((e) => e.name)
    const expected = new Set(expectedDirs)
    const toInstall = topDirs.filter((d) => expected.has(d))

    const installedDirs: string[] = []
    for (const dir of toInstall) {
      const target = join(addonsPath, dir)
      await rm(target, { recursive: true, force: true })
      await cp(join(staging, dir), target, { recursive: true })
      installedDirs.push(dir)
    }
    return { installedDirs, version: details.version }
  } finally {
    await rm(work, { recursive: true, force: true })
  }
}
