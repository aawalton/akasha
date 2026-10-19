import type { SideFileDisk } from "akasha/temper/watcher/modules/watcher-side-file/watcher-side-file.module.code.ts"

interface Held {
  readonly disk: SideFileDisk
  readonly writes: string[]
  readonly content: () => string | undefined
}

export function held(initial: string | undefined): Held {
  let content = initial
  const writes: string[] = []
  const disk: SideFileDisk = {
    read: () => {
      if (content === undefined) throw new Error("ENOENT")
      return content
    },
    write: (_path, next) => {
      content = next
      writes.push(next)
      return undefined
    },
  }
  return { disk, writes, content: () => content }
}
