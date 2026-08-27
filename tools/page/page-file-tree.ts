import { onceInCall } from "../../during-call/during-call.ts"
import { type Subject, textOf } from "../lib/gate.ts"
import type { FileTree } from "../../page/file-tree.ts"
import { placeDirOf, repoPlacings, scanIn } from "../../page/page-types.ts"
import { targetRepo } from "../../repo/roots/roots"

const INSTRUCTIONS_REPO = "instructions"

export function fileTreeOf(subject: Subject): FileTree {
  const pending = [...subject.pending].sort().join("\n")
  const own = subject.pending.has(subject.relPath) ? "" : subject.relPath
  const going = [...(subject.removing ?? [])].sort().join("\n")
  return onceInCall(
    `tree:${subject.roots.instructions}:${targetRepo(subject.roots)}:${own}:${pending}:${going}`,
    () => readFileTree(subject)
  )
}

function readFileTree(subject: Subject): FileTree {
  const here = targetRepo(subject.roots) === INSTRUCTIONS_REPO
  const placed = repoPlacings(subject.roots)
  const landing = targetRepo(subject.roots)
  const writing = [...subject.pending, subject.relPath]
  const going = new Set(here ? (subject.removing ?? []) : [])
  return {
    root: subject.roots.instructions,
    pending: new Set(here ? writing : []),
    repoOf: (slug) => {
      const held = placed.get(slug)
      if (held !== undefined) return held
      const dir = `${placeDirOf(slug)}/`
      return writing.some((at) => at.startsWith(dir)) ? landing : null
    },
    paths: (pattern) => {
      const patterns = typeof pattern === "string" ? [pattern] : pattern
      const globs = patterns.map((one) => new Bun.Glob(one))
      const standing = scanIn(subject.roots.instructions, patterns, INSTRUCTIONS_REPO)
      const pending = here ? [...subject.pending].filter((at) => globs.some((one) => one.match(at))) : []
      return [...new Set([...standing, ...pending])].filter((at) => !going.has(at)).sort()
    },
    open: (relPath) =>
      here && relPath === subject.relPath
        ? textOf(subject)
        : subject.read(`${subject.roots.instructions}/${relPath}`),
  }
}
