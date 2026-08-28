import { join } from "node:path"
import { ownRepoRoot } from "../../repo/roots/roots"

export function booksRoot(): string {
  return ownRepoRoot()
}

export function bookRoot(slug: string): string {
  return join(booksRoot(), slug)
}
