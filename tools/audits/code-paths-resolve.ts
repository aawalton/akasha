
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check, RepoView } from "../lib/check.ts"
import { CodeImportError, codeRefFile, codeRefKind } from "../lib/code-import.ts"
import { codeReaches } from "../lib/code-reaches.ts"
import { git } from "../../repo/git/git.ts"
import { judge, over } from "../../outcome/outcome"
import { fromDisk, refusalText } from "../lib/refusal.ts"

const NAME = "code-paths-resolve"

const REFERENCE = "reference naming a code-tree file"

const RESTS_ON =
  "the checkout standing at the commit named above — a reference the branch under it has " +
  "since deleted still resolves there and is never named, which makes this check quieter, and " +
  "one that branch has added and this commit does not carry is named as standing nowhere, which " +
  "makes it louder"

function headOf(root: string): string {
  const said = git(root, ["rev-parse", "HEAD"])
  return said.code === 0 ? said.stdout.slice(0, 7) : "a commit this check could not read"
}

interface Named {
  readonly ref: string
  readonly site: string
  readonly handed: boolean
}

function standsIn(repo: RepoView, ref: string, roots: readonly string[]): string | null {
  for (const one of roots) {
    if (repo.exists(codeRefFile(ref, one))) return one
  }
  return null
}

export const codePathsResolve: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  // THE `code` REPOSITORY IS GONE, absorbed into akasha, so the tree a code-tree reference names is
  // this one. Reading `repo.roots.code` answered `undefined` and returned a skip over a population
  // of zero, which `tools/run-checks.ts` counts as not-refused — so every reference in the tree went
  // unresolved and unseen while the suite wrote green.
  const codeRoot = root
  const reaches = codeReaches(root, codeRoot)
  const named: Named[] = []
  for (const one of reaches.reaches)
    for (const site of one.sites)
      named.push({ ref: one.ref, site, handed: one.handed.includes(site) })

  const looked = [root]
  const unresolved: string[] = []
  let here = 0
  let onlyThere = 0
  for (const { ref, site, handed } of named) {
    if (handed) {
      let file: string | null = null
      try {
        file = codeRefFile(ref, codeRoot)
      } catch (err) {
        if (!(err instanceof CodeImportError)) throw err
      }
      if (file !== null && repo.exists(file)) continue
      unresolved.push(
        codeRefKind(ref) === "path"
          ? refusalText(
              "code-reach-unresolved",
              { path: site, named: ref, root: codeRoot },
              root,
              fromDisk
            )
          : refusalText(
              "code-specifier-unresolved",
              { path: site, specifier: ref, root: codeRoot },
              root,
              fromDisk
            )
      )
      continue
    }
    const found = standsIn(repo, ref, looked)
    if (found === root) {
      here++
      continue
    }
    if (found !== null) {
      onlyThere++
      continue
    }
    unresolved.push(
      refusalText(
        "code-path-unresolved",
        { path: site, named: ref, roots: looked.join(", ") },
        root,
        fromDisk
      )
    )
  }

  const blind =
    reaches.scanned === 0
      ? [
          `${root} holds no TypeScript to read, so no code-tree reference was ` +
            "resolved and this verdict covers nothing",
        ]
      : []
  const handedRefs = named.filter((one) => one.handed)
  const specifiers = handedRefs.filter((one) => codeRefKind(one.ref) === "specifier").length
  const handedPaths = handedRefs.length - specifiers
  const literals = named.length - handedRefs.length
  return {
    ...judge(
      NAME,
      `${handedPaths} path(s) and ${specifiers} package specifier(s) handed to a ` +
        `code-repository loader, which resolves each against ${codeRoot} at ` +
        `${headOf(codeRoot)} and looks nowhere else; ${literals} further code-tree ` +
        "path(s) named as plain literals — dispatch keys, script paths, fixtures, labels — " +
        `which resolve from whichever root holds them, this repository's own first: ${here} ` +
        `of those stand here, ${onlyThere} only in that checkout; ${unresolved.length} ` +
        `standing nowhere, ${reaches.unfollowed.length} call site(s) not followed; read out ` +
        `of the TypeScript in ${root} as it stands and resting on ${RESTS_ON}`,
      [...blind, ...unresolved]
    ),
    population: over(named.length, REFERENCE),
  }
}
