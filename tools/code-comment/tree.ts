import { isGeneratedFile } from "../../generated-file/generated-file.ts"
import { requiredReadingForEach, requiredReadingWhole } from "../required-reading.ts"
import { DOMAIN_DOC } from "./forms.ts"

export type Tree = "instructions" | "code"

export const TREES: readonly Tree[] = ["instructions", "code"]

export function isTree(name: string): name is Tree {
  return (TREES as readonly string[]).includes(name)
}

export function tracked(root: string): readonly string[] {
  const listed = Bun.spawnSync(["git", "-C", root, "ls-files", "-z"])
  if (!listed.success) throw new Error(`git could not list ${root}: ${listed.stderr.toString()}`)
  return listed.stdout.toString().split("\0").filter((relPath) => relPath !== "")
}

export function reachedIn(pagesRoot: string, root: string, tree: Tree): readonly string[] {
  const paths = tracked(root)
  const answered = requiredReadingForEach(paths, pagesRoot, tree)
  return paths.filter((relPath) => (answered.get(relPath) ?? []).includes(DOMAIN_DOC))
}

export function reachedBy(pagesRoot: string, relPath: string, tree: Tree): boolean {
  return requiredReadingWhole(relPath, pagesRoot, tree).includes(DOMAIN_DOC)
}

export function packagesIn(files: readonly string[]): readonly string[] {
  const dirs = files
    .filter((relPath) => relPath === "package.json" || relPath.endsWith("/package.json"))
    .map((relPath) => relPath.slice(0, Math.max(relPath.lastIndexOf("/"), 0)))
  return [...new Set(dirs)].sort((one, other) => other.length - one.length)
}

export function packageOf(relPath: string, packages: readonly string[]): string {
  return packages.find((dir) => dir === "" || relPath.startsWith(`${dir}/`)) ?? ""
}

const UNDER_TEST = /(^|\/)__fixtures__(\/|$)/

export const SET_ASIDE = ["machine-written", "under test"] as const

export type SetAside = (typeof SET_ASIDE)[number]

export function setAside(relPath: string, bodyOf: () => string): SetAside | null {
  if (UNDER_TEST.test(relPath)) return "under test"
  return isGeneratedFile(relPath, bodyOf()) ? "machine-written" : null
}

export function reasonSaid(reason: SetAside): string {
  return reason === "machine-written"
    ? "their comments belong to whatever writes them"
    : "a comment in a fixture is a specimen under test rather than commentary"
}
