import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { placesIn } from "../../page/page-types.ts"
import type { Roots } from "../../page/page"

export function placesFor(roots: Roots, repo: string, slug: string): readonly string[] {
  const type = registryOf(diskFileTree(roots)).find((one) => one.slug === slug)
  return type === undefined ? [] : placesIn(type, repo)
}

export function documentsOfType(
  roots: Roots,
  repo: string,
  documents: readonly string[],
  slug: string
): readonly string[] {
  const places = placesFor(roots, repo, slug).map((one) => new Bun.Glob(one))
  if (places.length === 0) return []
  return documents.filter((one) => places.some((place) => place.match(one)))
}
