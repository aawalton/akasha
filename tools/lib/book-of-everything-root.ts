import { join } from "node:path"
import { resolveRoots } from "../../repo/roots/roots"

export function booksRoot(): string {
  return resolveRoots().books
}

export function bookRoot(slug: string): string {
  return join(booksRoot(), slug)
}
