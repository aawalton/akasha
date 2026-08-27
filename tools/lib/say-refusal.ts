
import { fromDisk, refusalText } from "./refusal.ts"
import { canonicalize } from "../../repo/path/path"
import { ownRepoRoot } from "../../repo/roots/roots"

type Held = (name: string) => string

const repoRoot = (): string => canonicalize(ownRepoRoot())

const SAYS: Record<string, (v: Held) => string> = {
  "block-addon-direct-install": () => refusalText("block-addon-direct-install", {}, repoRoot(), fromDisk),

  "block-destructive-git-amend": () => refusalText("block-destructive-git-amend", {}, repoRoot(), fromDisk),

  "block-destructive-git-branch-delete": (v) =>
    refusalText("block-destructive-git-branch-delete", { invocation: v("invocation") }, repoRoot(), fromDisk),

  "block-destructive-git-checkout": () => refusalText("block-destructive-git-checkout", {}, repoRoot(), fromDisk),

  "block-destructive-git-clean": () => refusalText("block-destructive-git-clean", {}, repoRoot(), fromDisk),

  "block-destructive-git-force-push": () =>
    refusalText("block-destructive-git-force-push", {}, repoRoot(), fromDisk),

  "block-destructive-git-rebase": () => refusalText("block-destructive-git-rebase", {}, repoRoot(), fromDisk),

  "block-destructive-git-reset": () => refusalText("block-destructive-git-reset", {}, repoRoot(), fromDisk),

  "block-destructive-git-restore": () => refusalText("block-destructive-git-restore", {}, repoRoot(), fromDisk),

  "block-destructive-git-rm": () => refusalText("block-destructive-git-rm", {}, repoRoot(), fromDisk),

  "block-destructive-git-stash": () => refusalText("block-destructive-git-stash", {}, repoRoot(), fromDisk),

  "block-playwright-stray-filename": (v) =>
    refusalText(
      "block-playwright-stray-filename",
      { filename: v("filename"), dir: v("dir"), base: v("base") },
      repoRoot(),
      fromDisk
    ),

  "block-root-filesystem-scan": () => refusalText("block-root-filesystem-scan", {}, repoRoot(), fromDisk),

  "block-whole-suite-run": () => refusalText("block-whole-suite-run", {}, repoRoot(), fromDisk),
}

class Unsayable extends Error {}

function heldBy(pairs: readonly string[]): Held {
  const values = new Map<string, string>()
  for (let i = 0; i < pairs.length; i += 2) {
    const flag = pairs[i]!
    if (!flag.startsWith("--")) throw new Unsayable(`${flag} is not a --<hole> flag`)
    const value = pairs[i + 1]
    if (value === undefined) throw new Unsayable(`${flag} was given no value`)
    values.set(flag.slice(2), value)
  }
  return (name) => {
    const held = values.get(name)
    if (held === undefined) throw new Unsayable(`--${name} was not given`)
    return held
  }
}

function main(): number {
  const argv = Bun.argv.slice(2)
  const slug = argv[0]
  if (slug === undefined) {
    process.stderr.write("say-refusal: name the refusal to say as the first argument\n")
    return 1
  }
  const say = SAYS[slug]
  if (say === undefined) {
    process.stderr.write(`say-refusal: no refusal is named ${slug}\n`)
    return 1
  }
  try {
    process.stdout.write(say(heldBy(argv.slice(1))))
  } catch (thrown) {
    process.stderr.write(`say-refusal: ${slug}: ${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    return 1
  }
  return 0
}

process.exit(main())
