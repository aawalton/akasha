import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import { bookRoot } from "./book-of-everything-root.ts"
import type { StatusNode } from "./book-of-everything-coverage-status.ts"
import { displayTitle, readNodeLabel, readStatusField } from "./book-of-everything-profile.ts"

export const BOOK_ROOT = bookRoot("book-of-everything")
const CHILD_DIR = /^\d{2}-/

function isNodeDir(dir: string): boolean {
  return existsSync(join(dir, "profile.md"))
}

export function readStatusTree(startDir: string = BOOK_ROOT): StatusNode {
  const content = readFileSync(join(startDir, "profile.md"), "utf-8")
  const label = readNodeLabel(content)
  const childDirs = readdirSync(startDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && CHILD_DIR.test(e.name))
    .map((e) => e.name)
    .sort() 
    .map((name) => join(startDir, name))
    .filter(isNodeDir)
  const rel = relative(BOOK_ROOT, startDir)
  return {
    path: rel === "" ? "." : rel,
    label,
    title: displayTitle(label),
    status: readStatusField(content),
    children: childDirs.map((d) => readStatusTree(d)),
  }
}

export function resolveBookDir(under: string): string | undefined {
  const dir = join(BOOK_ROOT, under)
  return isNodeDir(dir) ? dir : undefined
}
