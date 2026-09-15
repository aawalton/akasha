import {
  type Scratch,
  scratchWorld,
} from "akasha/util/fs/modules/scratching/scratching.module.code.ts"

let kept: Scratch | null = null

export function keptAt(prefix: string): string {
  if (kept === null) {
    kept = scratchWorld()
    process.on("exit", kept.sweep)
  }
  return kept.rootFor(prefix)
}
