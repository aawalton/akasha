
export const summary = "Report what share of the code repo's graph files a deploy carries, with the shas measured at and the rule applied"

import type { CommandHelp } from "../../ops/surface.ts"
import { changeBranchWorktree } from "../../lib/branch-worktree.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { git } from "../../../repo/git/git.ts"
import { buildFrom, readAt } from "../../lib/graph/held-snapshot.ts"
import { repoFiles } from "../../lib/graph/producers/lib/repo-files.ts"
import {
  countByType,
  figureOverFiles,
  inDomainPaths,
  type OutsideFigure,
  type Population,
  populationOf,
  standingOutsideTheFigure,
  standsForFile,
  type TypeCount,
} from "../../lib/graph/queries/file-figure.ts"
import {
  deployedNodeTypes,
  rootedIn,
  rootingEdgeTypes,
  unrootedNamedAsString,
} from "../../lib/graph/queries/rooted.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { AKASHA, CODE, resolveRoots, rootFor } from "../../../repo/roots/roots"

const CODE_REPO = "code"

const INSTRUCTIONS_REPO = "instructions"

const PACKAGE_NODE_TYPE = "package"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      description:
        "Branch sequence number. A worktree belongs to one branch, so this names the worktree " +
        "outright; the code repository is read at that worktree's HEAD commit. Reach for this " +
        "rather than `--commit HEAD`, which names the main checkout and not your branch.",
    },
    {
      name: "--commit",
      argLabel: "<rev>",
      valueShape: "token",
      description:
        "A revision of the code repository, resolved and printed back as a full sha with its " +
        "subject line, so you can see which commit answered. `HEAD` here resolves against " +
        "`~/repos/code`, the main checkout, which is behind every live branch — name a sha, or " +
        "reach for `--seq`.",
    },
    {
      name: "--json",
      description: "Emit JSON result instead of human text.",
    },
    {
      name: "--ids",
      description:
        "List the path of every unrooted file beside the counts. Left out unless asked for: a " +
        "reading holds thousands, and it is a comparison of two readings that needs them, where " +
        "a count that fell can hide a file that arrived against one that left.",
    },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description:
        "Branch sequence number. A worktree belongs to one branch, so this names the worktree " +
        "outright; the code repository is read at that worktree's HEAD commit.",
    },
  ],
  mutuallyExclusive: [["--seq", "--commit"]],
  exits: [
    { code: 0, meaning: "reading printed" },
    { code: 1, meaning: "input error: neither or both of --seq and --commit, or an absent worktree" },
    { code: 3, meaning: "operational error: the commit to measure at could not be read" },
  ],
  examples: [
    "ops graph rooted 19458",
    "ops graph rooted --seq 19458",
    "ops graph rooted --commit 792daa3fc9",
    "ops graph rooted --seq 19458 --json",
  ],
}

interface Measured {
  readonly sha: string
  readonly subject: string
}

interface Standing {
  readonly sha: string
  readonly differing: number
}

interface NamedBy {
  readonly key: string
  readonly namedBy: readonly string[]
}

interface Reading {
  readonly code: Measured
  readonly instructions: Standing
  readonly population: Population
  readonly deployedNodeTypes: readonly string[]
  readonly rootingEdgeTypes: readonly string[]
  readonly total: number
  readonly rooted: number
  readonly unrooted: number
  readonly percent: number
  readonly standingAsNoNode: number
  readonly unrootedByType: readonly TypeCount[]
  readonly fileNodes: number
  readonly nodesOfUnrootedFiles: number
  readonly outsideTheFigure: readonly OutsideFigure[]
  readonly unrootedPackages: readonly string[]
  readonly namedAsString: readonly NamedBy[]
  readonly unrootedFiles?: readonly string[]
  readonly outside: { readonly repo: string; readonly total: number; readonly rooted: number }
}

function subjectOf(root: string, sha: string): string {
  const said = git(root, ["log", "-1", "--format=%s", sha])
  return said.code === 0 ? said.stdout : "(no subject — this commit is not in ~/repos/code)"
}

function codeAtWorktree(seq: number): Measured {
  const worktree = changeBranchWorktree(seq)
  if (!worktree.ok) throw inputError(worktree.why)
  const head = git(worktree.path, ["rev-parse", "HEAD"])
  if (head.code !== 0) {
    throw operationalError(
      `${worktree.name} has its worktree at ${worktree.path}, whose HEAD commit could not be ` +
        `read, so there is no state to measure: ${head.stderr}`
    )
  }
  return { sha: head.stdout, subject: subjectOf(rootFor(resolveRoots(), CODE), head.stdout) }
}

function codeAtRev(rev: string): Measured {
  const root = rootFor(resolveRoots(), CODE)
  const found = git(root, ["rev-parse", `${rev}^{commit}`])
  if (found.code !== 0) {
    throw operationalError(
      `--commit ${rev} names nothing ${root} resolves to a commit, so there is no state to ` +
        `measure: ${found.stderr}`
    )
  }
  return { sha: found.stdout, subject: subjectOf(root, found.stdout) }
}

function instructionsStanding(): Standing {
  const root = rootFor(resolveRoots(), AKASHA)
  const head = git(root, ["rev-parse", "HEAD"])
  const standing = git(root, ["status", "--porcelain"])
  return {
    sha: head.code === 0 ? head.stdout : "(unreadable)",
    differing: standing.code === 0 && standing.stdout !== "" ? standing.stdout.split("\n").length : 0,
  }
}

async function takeReading(code: Measured, ids: boolean): Promise<Reading> {
  const instructions = instructionsStanding()
  const snapshot = readAt(code.sha)
  const graph = await buildFrom(snapshot.ctx)
  const rooted = rootedIn(graph)
  const all = graph.nodes()
  const mine = all.filter((one) => one.repo === CODE_REPO)
  const theirs = all.filter((one) => one.repo === INSTRUCTIONS_REPO)
  const wholeRepo = { includeFixtures: true, includeGenerated: true }
  const tracked = repoFiles(snapshot.ctx, CODE_REPO, wholeRepo)
  const mineInDomain = inDomainPaths(tracked)
  const fileNodes = mine.filter((one) => standsForFile(one, mineInDomain))
  const otherNodes = mine.filter((one) => !standsForFile(one, mineInDomain))
  const figure = figureOverFiles(fileNodes, rooted)
  const theirInDomain = inDomainPaths(repoFiles(snapshot.ctx, INSTRUCTIONS_REPO, wholeRepo))
  const theirFigure = figureOverFiles(
    theirs.filter((one) => standsForFile(one, theirInDomain)),
    rooted
  )
  const population = populationOf(tracked, mine)
  const lostPaths = new Set(figure.unrootedPaths)
  return {
    code,
    instructions,
    population,
    deployedNodeTypes: deployedNodeTypes(),
    rootingEdgeTypes: rootingEdgeTypes(),
    total: figure.total,
    rooted: figure.rooted,
    unrooted: figure.unrooted,
    percent: figure.percent,
    standingAsNoNode: population.noNode,
    unrootedByType: countByType(figure.nodesOfUnrootedFiles),
    fileNodes: fileNodes.length,
    nodesOfUnrootedFiles: figure.nodesOfUnrootedFiles.length,
    outsideTheFigure: standingOutsideTheFigure(otherNodes, rooted),
    unrootedPackages: otherNodes
      .filter((one) => one.type === PACKAGE_NODE_TYPE && !rooted.has(one.id))
      .map((one) => String(one.key))
      .sort((a, b) => a.localeCompare(b)),
    namedAsString: unrootedNamedAsString(graph, CODE_REPO)
      .filter((one) => !standsForFile(one.node, mineInDomain) || lostPaths.has(String(one.node.key)))
      .map((one) => ({ key: String(one.node.key), namedBy: one.namedBy })),
    ...(ids && { unrootedFiles: figure.unrootedPaths }),
    outside: { repo: INSTRUCTIONS_REPO, total: theirFigure.total, rooted: theirFigure.rooted },
  }
}

function spell(reading: Reading): string {
  const lines: string[] = []
  lines.push(
    `rooted ${reading.percent.toFixed(2)}% — ${reading.total} code-repo files, ` +
      `${reading.rooted} rooted, ${reading.unrooted} unrooted`
  )
  lines.push("")
  lines.push("measured at")
  lines.push(`  code          ${reading.code.sha}  read at this commit`)
  lines.push(`                ${reading.code.subject}`)
  lines.push(
    `  instructions  ${reading.instructions.sha}  read AS IT STANDS, at no commit` +
      (reading.instructions.differing === 0
        ? ""
        : `, and ${reading.instructions.differing} path(s) differ from that one`)
  )
  lines.push(
    `  population    ${reading.population.kinds} node kinds stand in the code repo; of its ` +
      `${reading.population.trackedFiles} tracked files ${reading.population.outsideDomain} stand`
  )
  lines.push(
    `                outside the graph's own domain, and ${reading.population.noNode} of the ` +
      `remaining ${reading.population.inDomain} stand as no node —`
  )
  lines.push(
    `                ${reading.population.ofNoKind} of a kind there is no node type for, ` +
      `${reading.population.leftOut} left out of a kind there is`
  )
  lines.push(
    `  reconciles    ${reading.total} counted + ${reading.standingAsNoNode} standing as no node ` +
      `= ${reading.total + reading.standingAsNoNode} of ${reading.population.inDomain} in domain, ` +
      `standing as ${reading.fileNodes} file nodes`
  )
  lines.push("")
  lines.push("rule applied")
  lines.push(
    `  deployed node types (${reading.deployedNodeTypes.length}): ${reading.deployedNodeTypes.join(", ")}`
  )
  lines.push(
    `  rooting edge types (${reading.rootingEdgeTypes.length}): ${reading.rootingEdgeTypes.join(", ")}`
  )
  lines.push("")
  lines.push(
    `unrooted by node type — ${reading.nodesOfUnrootedFiles} file nodes over ` +
      `${reading.unrooted} unrooted files, a file under each type it stands as`
  )
  for (const one of reading.unrootedByType) lines.push(`  ${String(one.n).padStart(6)}  ${one.type}`)
  lines.push("")
  lines.push(
    `outside the figure (${reading.outsideTheFigure.length} node types) — not counted above, ` +
      `not dropped from the walk`
  )
  for (const one of reading.outsideTheFigure) {
    lines.push(`  ${String(one.total).padStart(6)}  ${one.type} — ${one.rooted} rooted`)
  }
  lines.push("")
  lines.push(`unrooted packages (${reading.unrootedPackages.length}), standing outside the figure`)
  for (const one of reading.unrootedPackages) lines.push(`  ${one}`)
  lines.push("")
  lines.push(`unrooted and named as a string (${reading.namedAsString.length})`)
  if (reading.namedAsString.length > 0) {
    lines.push("  a string-load roots nothing, so being unrooted here says nothing either way about")
    lines.push("  whether anything runs them — ask that at what names each.")
    for (const one of reading.namedAsString) {
      lines.push(`  ${one.key}`)
      lines.push(`      named by ${one.namedBy.join(", ")}`)
    }
  }
  if (reading.unrootedFiles !== undefined) {
    lines.push("")
    lines.push(`unrooted files (${reading.unrootedFiles.length})`)
    for (const one of reading.unrootedFiles) lines.push(`  ${one}`)
  }
  lines.push("")
  lines.push("outside the measure")
  lines.push(
    `  ${reading.outside.total} ${reading.outside.repo}-repo files, ${reading.outside.rooted} of ` +
      `them rooted, none of them counted above`
  )
  return lines.join("\n")
}

export default async function graphRooted(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.nonNegativeInt("--seq")
  const rev = parsed.string("--commit")
  const json = parsed.boolean("--json")
  const ids = parsed.boolean("--ids")
  if (seq === undefined && rev === undefined) {
    throw inputError(
      "name what to measure at: `--seq <n>` for a branch worktree's HEAD, or `--commit <rev>` " +
        "for a revision of the code repository. There is no default, because the only obvious " +
        "one — `HEAD` against ~/repos/code — is the main checkout rather than any live branch, " +
        "and a reading taken there would be quoted as though it were yours."
    )
  }
  const code = rev === undefined ? codeAtWorktree(seq ?? 0) : codeAtRev(rev)
  const reading = await takeReading(code, ids)
  process.stdout.write(json ? `${JSON.stringify(reading, null, 2)}\n` : `${spell(reading)}\n`)
}
