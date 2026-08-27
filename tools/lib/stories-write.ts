import { existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "../../repo/roots/roots"
import { toolArgv } from "./tool-argv.ts"

const SCRATCH_ROOT = "/var/tmp"

export interface StoryFile {
  readonly relPath: string
  readonly content: string
}

export type StoriesWrite =
  | { readonly kind: "written" }
  | { readonly kind: "unwritten"; readonly why: string }

export function playedStoryRelDir(worldSlug: string, storySlug: string): string {
  return `${worldSlug}/played/${storySlug}`
}

export function worldsHolding(storySlug: string): readonly string[] {
  const root = akashaRoot()
  const worlds: string[] = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue
    if (existsSync(join(root, playedStoryRelDir(entry.name, storySlug)))) worlds.push(entry.name)
  }
  return worlds
}

export function storyFileStands(relPath: string): boolean {
  return existsSync(join(akashaRoot(), relPath))
}

export function writeStoryFiles(files: readonly StoryFile[], message: string): StoriesWrite {
  if (files.length === 0) return { kind: "written" }
  const scratch = mkdtempSync(join(SCRATCH_ROOT, "stories-write-"))
  const payloadPath = join(scratch, "write.json")
  writeFileSync(
    payloadPath,
    JSON.stringify(
      files.map((one) => ({ file_path: join(akashaRoot(), one.relPath), content: one.content }))
    )
  )
  const proc = Bun.spawnSync(
    [
      process.execPath,
      ...toolArgv(
        "write.ts",
        [
          "--repo",
          "akasha",
          "--mechanical",
          "--input-file",
          payloadPath,
          "--message",
          message,
        ],
        akashaRoot()
      ),
    ],
    { cwd: akashaRoot(), stdout: "pipe", stderr: "pipe" }
  )
  const decode = (raw: Uint8Array | null): string =>
    raw === null ? "" : new TextDecoder().decode(raw)
  const output = `${decode(proc.stdout)}${decode(proc.stderr)}`.trim()
  rmSync(scratch, { recursive: true, force: true })
  return proc.exitCode === 0 ? { kind: "written" } : { kind: "unwritten", why: output }
}
