
import { requiredReadingWhole } from "../required-reading.ts"
import type { Champion } from "./domain.ts"
import { type Roots } from "../../page/page"
import { AKASHA, isDirty, rootFor } from "../../repo/roots/roots"

export interface Descent {
  readonly slugAt: ReadonlyMap<string, string>
  readonly championOfSlug: ReadonlyMap<string, Champion>
}

export interface Answering {
  readonly slug: string
  readonly persona: string | null
  readonly at: string | null
}

export function domainsRequiredFor(
  relPath: string,
  descent: Descent,
  roots: Roots
): readonly Answering[] {
  return requiredReadingWhole(relPath, rootFor(roots, AKASHA)).flatMap((document) => {
    const slug = descent.slugAt.get(document)
    if (slug === undefined) return []
    const champion = descent.championOfSlug.get(slug)
    return [{ slug, persona: champion?.persona ?? null, at: champion?.at ?? null }]
  })
}

function whyNoDomain(relPath: string): string {
  return isDirty(relPath)
    ? "quarantined, so nothing is required for it until someone has read it against what binds it"
    : "no document in this repo declares a glob matching it"
}

export function answersForPath(relPath: string, descent: Descent, roots: Roots): string {
  const answering = domainsRequiredFor(relPath, descent, roots)
  if (answering.length === 0) return `${relPath}  — no domain: ${whyNoDomain(relPath)}`
  const named = answering.map((one) => `${one.slug} (${one.persona ?? "reaching no persona"})`)
  return `${relPath}  — ${named.join(", ")}`
}

export function pathRecord(
  paths: readonly string[],
  descent: Descent,
  roots: Roots
): {
  record: string
  root: string
  paths: readonly { path: string; quarantined: boolean; domains: readonly Answering[] }[]
} {
  return {
    record: "owns-path",
    root: rootFor(roots, AKASHA),
    paths: paths.map((relPath) => ({
      path: relPath,
      quarantined: isDirty(relPath),
      domains: domainsRequiredFor(relPath, descent, roots),
    })),
  }
}
