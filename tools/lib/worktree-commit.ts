
import { commitAuthor } from "../../agent/commit-author"
import { git } from "../../repo/git/git.ts"

const FORMATTABLE = [".ts", ".tsx", ".js", ".jsx", ".json", ".css"]

export type WorktreeCommit =
  | { readonly ok: true; readonly sha: string }
  | { readonly ok: false; readonly why: string }

function stagedNames(root: string, filter: readonly string[]): readonly string[] {
  const listed = git(root, ["diff", "--cached", "--name-only", ...filter])
  if (listed.code !== 0 || listed.stdout === "") return []
  return listed.stdout.split("\n")
}

interface Ran {
  readonly ok: boolean
  readonly said: string
}

function biome(root: string, args: readonly string[]): Ran {
  const proc = Bun.spawnSync(["bunx", "biome", ...args], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
  })
  const decode = (raw: Uint8Array | null): string =>
    raw === null ? "" : new TextDecoder().decode(raw)
  return { ok: proc.exitCode === 0, said: `${decode(proc.stdout)}${decode(proc.stderr)}`.trim() }
}

function whyFormattingFailed(root: string): string | null {
  const present = stagedNames(root, ["--diff-filter=d"]).filter((one) =>
    FORMATTABLE.some((ext) => one.endsWith(ext))
  )
  if (present.length === 0) return null
  biome(root, ["check", "--write", "--no-errors-on-unmatched", ...present])
  const added = git(root, ["add", "--", ...present])
  if (added.code !== 0) return `git add after formatting failed: ${added.stderr}`
  const checked = biome(root, ["check", "--no-errors-on-unmatched", ...present])
  return checked.ok ? null : `biome found what it could not fix: ${checked.said}`
}

export function commitWorktree(root: string, message: string): WorktreeCommit {
  const added = git(root, ["add", "-A"])
  if (added.code !== 0) return { ok: false, why: `git add -A failed: ${added.stderr}` }
  if (stagedNames(root, []).length === 0) {
    return { ok: false, why: `nothing stands in ${root} to commit` }
  }
  const unfixable = whyFormattingFailed(root)
  if (unfixable !== null) return { ok: false, why: unfixable }
  const committed = git(root, ["commit", `--author=${commitAuthor()}`, "-m", message])
  if (committed.code !== 0) {
    const said = committed.stderr !== "" ? committed.stderr : committed.stdout
    return { ok: false, why: `git commit failed: ${said}` }
  }
  const head = git(root, ["rev-parse", "HEAD"])
  if (head.code !== 0) {
    return { ok: false, why: `${message} committed, but its sha could not be read: ${head.stderr}` }
  }
  return { ok: true, sha: head.stdout }
}
