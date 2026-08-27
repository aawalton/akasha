import { join } from "node:path"
import { BOOKS, resolveRoots, rootFor } from "../../repo/roots/roots"

export function booksRoot(): string {
  return rootFor(resolveRoots(), BOOKS)
}

export function bookRoot(slug: string): string {
  return join(booksRoot(), slug)
}
