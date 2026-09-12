import { createHash } from "node:crypto"
import { cp, mkdtemp, readdir, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { FileDetails } from "akasha/temper/community-addons/esoui-catalog/esoui-catalog.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import extract from "extract-zip"

export type InstallResult = {
  readonly installedDirs: readonly string[]
  readonly version: string
}

function md5Hex(bytes: Uint8Array): string {
  return createHash("md5").update(bytes).digest("hex")
}

async function downloadProved(details: FileDetails, zipPath: string): Promise<void> {
  let answered: Response
  try {
    answered = await fetch(details.downloadUrl)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    throw new OperationalError(`network error downloading ${details.downloadUrl}: ${why}`)
  }
  if (!answered.ok) {
    throw new OperationalError(`HTTP ${String(answered.status)} downloading ${details.downloadUrl}`)
  }
  const bytes = new Uint8Array(await answered.arrayBuffer())
  const found = md5Hex(bytes)
  if (found !== details.md5) {
    throw new OperationalError(
      `MD5 mismatch for file ${details.uid}: ESOUI states ${details.md5} and the download is ${found}`
    )
  }
  await writeFile(zipPath, bytes)
}

export type Laying = {
  readonly cleared: (at: string) => Promise<void>
  readonly laid: (from: string, to: string) => Promise<void>
}

export const LAYING: Laying = {
  cleared: async (at) => {
    await rm(at, { recursive: true, force: true })
  },
  laid: async (from, to) => {
    await cp(from, to, { recursive: true })
  },
}

export function clearedSaid(dir: string, addonsPath: string): string {
  return `${dir} was cleared from ${addonsPath}`
}

export function laidSaid(dir: string, addonsPath: string): string {
  return `${dir} was laid into ${addonsPath}`
}

export async function layEach(
  laying: readonly string[],
  staging: string,
  addonsPath: string,
  lay: Laying,
  done: string[]
): Promise<readonly string[]> {
  const installedDirs: string[] = []
  for (const dir of laying) {
    const target = join(addonsPath, dir)
    await lay.cleared(target)
    done.push(clearedSaid(dir, addonsPath))
    await lay.laid(join(staging, dir), target)
    done.push(laidSaid(dir, addonsPath))
    installedDirs.push(dir)
  }
  return installedDirs
}

export async function downloadAndInstall(
  details: FileDetails,
  expectedDirs: readonly string[],
  addonsPath: string,
  done: string[] = [],
  lay: Laying = LAYING
): Promise<InstallResult> {
  const work = await mkdtemp(join(SCRATCH_AT, "temper-addon-"))
  try {
    const zipPath = join(work, "addon.zip")
    await downloadProved(details, zipPath)

    const staging = join(work, "extract")
    await extract(zipPath, { dir: staging })

    const unpacked = await readdir(staging, { withFileTypes: true })
    const expected = new Set(expectedDirs)
    const laying = unpacked
      .filter((one) => one.isDirectory())
      .map((one) => one.name)
      .filter((name) => expected.has(name))

    const installedDirs = await layEach(laying, staging, addonsPath, lay, done)
    return { installedDirs, version: details.version }
  } finally {
    await rm(work, { recursive: true, force: true })
  }
}
