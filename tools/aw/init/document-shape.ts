export const SLUG_MARK = "<slug>"

// A DOCUMENT'S PLACE IS READ OFF THE PAGES STANDING RATHER THAN SPELLED HERE. The akasha tree is
// still being arranged, so a folder written into this file goes stale the next time a page type
// moves, and the shell function built from it then refuses a seat that is perfectly well declared.
// Reading one standing page's own path and blanking its slug survives every move that keeps a page
// named for its slug.
export function shapeOf(path: string, slug: string): string {
  const parts = path.split("/")
  return parts
    .map((part, at) => {
      if (at < parts.length - 2) return part
      if (part === slug) return SLUG_MARK
      if (part.startsWith(`${slug}.`)) return `${SLUG_MARK}${part.slice(slug.length)}`
      return part
    })
    .join("/")
}

export interface Named {
  readonly slug: string
  readonly path: string
}

export function shapesStanding(reading: () => readonly Named[], fallback: string): readonly string[] {
  try {
    const held = reading().map((one) => shapeOf(one.path, one.slug))
    const found = [...new Set(held)].sort()
    return found.length === 0 ? [fallback] : found
  } catch {
    return [fallback]
  }
}

export function pathsFor(shapes: readonly string[], slugVar: string): readonly string[] {
  return shapes.map((shape) => `$_root/${shape.replaceAll(SLUG_MARK, `$${slugVar}`)}`)
}

export function standsShell(paths: readonly string[]): string {
  return paths.map((at) => `[ -f "${at}" ]`).join(" || ")
}
