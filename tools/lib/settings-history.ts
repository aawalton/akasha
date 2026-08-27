
import { git } from "../../repo/git/git.ts"

interface Revision {
  readonly sha: string
  readonly at: number
}

export interface History {
  readonly revisionAt: (when: number | null) => string | null
  readonly at: (when: number | null) => unknown | null
}

export function historyOf(root: string, relPath: string): History {
  const log = git(root, ["log", "--format=%H %ct", "--", relPath])
  const revisions: readonly Revision[] =
    log.code !== 0
      ? []
      : log.stdout.split("\n").flatMap((line) => {
          const [sha, at] = line.split(" ")
          if (sha === undefined || at === undefined || !/^[0-9]+$/.test(at)) return []
          return [{ sha, at: Number(at) * 1000 }]
        })
  const cache = new Map<string, unknown>()
  const revisionAt = (when: number | null): string | null =>
    when === null ? null : (revisions.find((one) => one.at <= when)?.sha ?? null)
  return {
    revisionAt,
    at: (when) => {
      const sha = revisionAt(when)
      if (sha === null) return null
      if (cache.has(sha)) return cache.get(sha) ?? null
      const blob = git(root, ["show", `${sha}:${relPath}`])
      let document: unknown = null
      if (blob.code === 0) {
        try {
          document = JSON.parse(blob.stdout) as unknown
        } catch {
          document = null
        }
      }
      cache.set(sha, document)
      return document
    },
  }
}
