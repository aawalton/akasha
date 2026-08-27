import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Repo } from "../../../page/document/types.ts"
import { AKASHA, resolveRoots, rootFor } from "../../../repo/roots/roots"
import { narrowedTo, type Reach, readProducerReach, withinReach } from "./producer-reach.ts"
import type { BuildContext } from "./types.ts"

const GIT_CEILING_MS = 60_000

const GIT_OUTPUT_CEILING = 512 * 1024 * 1024

const LF = 10

const MISSING = " missing"

const READING_BODIES = "reading the files at a commit"

const CODE_REPO: Repo = "code"

const VENDOR_DIR = "node_modules"

const isVendored = (path: string): boolean => path.split("/").includes(VENDOR_DIR)

const REACHED: Repo = "instructions"

/**
 * The two names the graph labels a node's repository with.
 *
 * BOTH NAME ONE TREE. `code` and `instructions` were separate checkouts; akasha absorbed both, so
 * every root below is the akasha root. Neither is a repository `resolveRoots` answers for, and
 * `rootFor(roots, "code")` throws.
 *
 * THE LABELS ARE NOT RENAMED, because they are written down outside this code: every
 * `dispatchNodes` entry on a `workflow-template` page names `package:code:...` or
 * `workflow:instructions:...`, and the cluster checks match on them too. Renaming here alone would
 * leave every stored seed naming a node no producer emits — a closure over nothing, reported clean.
 *
 * WHAT STILL SEPARATES THEM IS HOW EACH IS READ: `code` is the tree at the commit the snapshot is
 * taken at, and `instructions` is the tree as it stands, narrowed to what the producer pages
 * declare they read.
 */
export const GRAPH_REPOS: readonly Repo[] = ["code", "instructions"]

const detailOf = (error: unknown): string => {
  if (typeof error !== "object" || error === null || !("stderr" in error)) return String(error)
  const text = String(error.stderr ?? "").trim()
  return text === "" ? String(error) : text
}

const timedOut = (error: unknown): boolean =>
  typeof error === "object" && error !== null && "signal" in error && error.signal === "SIGTERM"

const runGitBytes = (
  root: string,
  args: readonly string[],
  reason: string,
  input?: Buffer
): Buffer => {
  try {
    return execFileSync("git", ["-C", root, ...args], {
      input,
      maxBuffer: GIT_OUTPUT_CEILING,
      stdio: [input === undefined ? "ignore" : "pipe", "pipe", "pipe"],
      timeout: GIT_CEILING_MS,
    })
  } catch (error) {
    throw new Error(
      timedOut(error)
        ? `graph: ${reason} in ${root} ran past ${GIT_CEILING_MS}ms without finishing`
        : `graph: ${reason} in ${root} failed: ${detailOf(error)}`
    )
  }
}

const runGit = (root: string, args: readonly string[], reason: string): string =>
  runGitBytes(root, args, reason).toString("utf-8")

const pathsIn = (out: string): readonly string[] =>
  out
    .split("\0")
    .filter((path) => path !== "")
    .sort()

const filesAtCommit = (root: string, commit: string): readonly string[] =>
  pathsIn(runGit(root, ["ls-tree", "-r", "-z", "--name-only", commit], "listing files at a commit"))

const filesAsTheyStand = (root: string): readonly string[] =>
  pathsIn(
    runGit(
      root,
      ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
      "listing files as they stand"
    )
  )

const GIT_DIR = ".git"

const UNWALKED: ReadonlySet<string> = new Set([GIT_DIR, VENDOR_DIR])

const filesInDirectory = (root: string): readonly string[] => {
  const found: string[] = []
  const walk = (at: string, prefix: string): undefined => {
    for (const entry of readdirSync(at, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (UNWALKED.has(entry.name)) continue
        walk(join(at, entry.name), `${prefix}${entry.name}/`)
        continue
      }
      found.push(`${prefix}${entry.name}`)
    }
  }
  walk(root, "")
  return found.sort()
}

const filesHeld = (root: string): readonly string[] =>
  existsSync(join(root, GIT_DIR)) ? filesAsTheyStand(root) : filesInDirectory(root)

export const readRepos = (
  commit: string,
  repos: readonly Repo[] = GRAPH_REPOS
): BuildContext => {
  const roots = resolveRoots()
  const root = rootFor(roots, AKASHA)
  const repoRoots = new Map<Repo, string>()
  const repoFiles = new Map<Repo, readonly string[]>()
  for (const repo of repos) {
    const files = repo === CODE_REPO ? filesAtCommit(root, commit) : filesHeld(root)
    if (files.length === 0) {
      throw new Error(`graph: ${repo} at ${root} listed no files, so nothing could be read from it`)
    }
    repoRoots.set(repo, root)
    repoFiles.set(repo, files)
  }
  const reach = reachOver(repoRoots, repoFiles)
  const reached = new Map<Repo, readonly string[]>()
  for (const [repo, files] of repoFiles) {
    const narrowed = narrowedTo(files, reach.get(repo))
    // A REACH THAT LEAVES NOTHING IS REFUSED, never carried. Every producer over a repository reads
    // this list, so a narrowing to zero hands each of them an empty tree: no nodes, no edges, and
    // every check over them green over nothing. A folder rename under `pages/` did exactly that.
    if (narrowed.length === 0) {
      throw new Error(
        `graph: ${repo} at ${root} listed ${files.length} file(s) and the declared reach ` +
          `(${(reach.get(repo) ?? []).join(", ")}) left none of them, so every producer reading ` +
          `${repo} would build from an empty tree`
      )
    }
    reached.set(repo, narrowed)
  }
  return { repoRoots, repoFiles: reached, commit, reach }
}

const reachOver = (
  repoRoots: ReadonlyMap<Repo, string>,
  repoFiles: ReadonlyMap<Repo, readonly string[]>
): Reach =>
  readProducerReach({
    files: repoFiles.get(REACHED) ?? [],
    read: (path) => {
      const root = repoRoots.get(REACHED)
      if (root === undefined) return null
      try {
        return readFileSync(join(root, path), "utf-8")
      } catch {
        return null
      }
    },
  })
const bodiesAtCommit = (
  root: string,
  commit: string,
  paths: readonly string[]
): ReadonlyMap<string, Buffer> => {
  const bodies = new Map<string, Buffer>()
  if (paths.length === 0) return bodies
  const out = runGitBytes(
    root,
    ["cat-file", "--batch", "-z"],
    READING_BODIES,
    Buffer.from(paths.map((path) => `${commit}:${path}\0`).join(""), "utf-8")
  )
  let at = 0
  for (const path of paths) {
    const stop = out.indexOf(LF, at)
    if (stop < 0) {
      throw new Error(`graph: ${READING_BODIES} in ${root} stopped before it answered for ${path}`)
    }
    const header = out.toString("utf-8", at, stop)
    at = stop + 1
    if (header.endsWith(MISSING)) continue
    const size = Number(header.slice(header.lastIndexOf(" ") + 1))
    if (!Number.isSafeInteger(size) || size < 0) {
      throw new Error(
        `graph: ${READING_BODIES} in ${root} answered \`${header}\` for ${path}, which names no size`
      )
    }
    bodies.set(path, out.subarray(at, at + size))
    at += size + 1
  }
  if (at !== out.length) {
    throw new Error(
      `graph: ${READING_BODIES} in ${root} answered ${out.length} bytes and ${at} were accounted for`
    )
  }
  return bodies
}

const bodiesHeld = new WeakMap<BuildContext, ReadonlyMap<string, Buffer>>()

const bodiesFor = (ctx: BuildContext, root: string): ReadonlyMap<string, Buffer> => {
  const held = bodiesHeld.get(ctx)
  if (held !== undefined) return held
  const bodies = bodiesAtCommit(
    root,
    ctx.commit,
    ctx.repoFiles.get(CODE_REPO) ?? filesAtCommit(root, ctx.commit)
  )
  bodiesHeld.set(ctx, bodies)
  return bodies
}

export const readRepoFile = (ctx: BuildContext, repo: Repo, path: string): string | null => {
  const globs = ctx.reach?.get(repo)
  if (globs !== undefined && !isVendored(path) && !withinReach(path, globs)) {
    throw new Error(
      `graph: ${repo}:${path} stands outside every producer's declared reach, so no snapshot would notice it change`
    )
  }
  const root = ctx.repoRoots.get(repo)
  if (root === undefined) return null
  if (repo !== CODE_REPO) {
    try {
      return readFileSync(join(root, path), "utf-8")
    } catch {
      return null
    }
  }
  return bodiesFor(ctx, root).get(path)?.toString("utf-8") ?? null
}
