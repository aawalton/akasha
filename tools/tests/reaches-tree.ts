import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { installRepos } from "./fixture.ts"

const SCRATCH = "/var/tmp"

export const SEAM = 'import { codeModule } from "../lib/code-import.ts"\n'

export function tree(files: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(`${SCRATCH}/reaches-`)
  for (const [relPath, body] of Object.entries(files)) {
    const at = `${root}/${relPath}`
    mkdirSync(at.split("/").slice(0, -1).join("/"), { recursive: true })
    writeFileSync(at, body)
  }
  // THE REPO PAGES SAY WHICH REPOSITORIES THERE ARE, read out of the root `AKASHA_ROOT` names, so a
  // temp tree without them makes `roots.ts` throw before `reaches.ts` scans anything. They are
  // markdown, so nothing here counts them: the scan reads `.ts` only.
  installRepos(root)
  // A ROOT IS NAMED ONLY WHERE IT IS CLONED — `resolveRoots` skips a directory holding no `.git`.
  Bun.spawnSync(["git", "init", "-q"], { cwd: root })
  return root
}
