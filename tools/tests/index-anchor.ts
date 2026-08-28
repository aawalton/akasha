import { mkdtempSync, realpathSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Stated } from "../../page/index/identity/identity.ts"
import { indexRoot } from "../../page/index/place/place.ts"
import { keepPages } from "../../page/index/store/store.ts"

export interface Anchor {
  readonly root: string
  keep: (rows: readonly Stated[]) => void
  discard: () => void
}

export function anchorIndex(named: string): Anchor {
  const root = realpathSync(mkdtempSync(`${tmpdir()}/${named}-index-`))
  Bun.spawnSync(["git", "init", "-q", "-b", "main", "."], { cwd: root })
  const priorRoot = process.env.AKASHA_ROOT
  process.env.AKASHA_ROOT = root
  const stands = indexRoot()
  const won = stands === root || stands.startsWith(`${root}/`)
  return {
    root,
    keep: (rows: readonly Stated[]): void => {
      if (!won) {
        throw new Error(
          `the page index stands at ${stands}, outside this file's anchor at ${root}, so some other file in this process asked for it first. Writing these rows would replace that index whole. Run this file on its own.`
        )
      }
      keepPages(rows)
    },
    discard: (): void => {
      if (priorRoot === undefined) delete process.env.AKASHA_ROOT
      else process.env.AKASHA_ROOT = priorRoot
      rmSync(root, { recursive: true, force: true })
    },
  }
}
