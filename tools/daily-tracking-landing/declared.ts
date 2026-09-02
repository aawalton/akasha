/**
 * What akasha declares a tracked day may carry, read off the page type itself.
 *
 * The dry run counts property pages with a glob over every folder akasha holds, and a glob is
 * location blind: `date`, `title`, `version` and `meals` are slugs other page types own too, so a
 * page property standing for some other type reads as this one's and the gap looks closed when it is
 * not. Worse, it looks for `*-property.ts` and the two entry declarations are named
 * `*.page-property-entry.ts`, so those two never satisfy it however they land.
 *
 * A landing wants the true answer, so it asks the page type what its properties are rather than
 * asking the disk what files exist. A key the type does not declare is a key no day page can carry.
 */

import { DAY_PAGE_TYPE } from "../daily-tracking-migration/shape.ts"

/** The properties every page carries by being a page, declared by `page.page-type.ts`. */
export const OF_EVERY_PAGE: readonly string[] = ["id", "page-type-slug", "slug", "cover"]

export type Declared = {
  readonly at: string
  readonly slugs: ReadonlySet<string>
  /**
   * What the type says its pages are filed under, which is where a new day page goes.
   *
   * `pathFor` in the pages system service reads this off the page type to place a page it is
   * composing, so a landing that wants to put its days where the service would put them has to read
   * the same value off the same page rather than name a folder of its own.
   */
  readonly plural: string | null
}

type PageTypeShape = {
  readonly pageTypeSlug?: unknown
  readonly slug?: unknown
  readonly pluralSlug?: unknown
  readonly properties?: readonly { readonly pagePropertySlug?: unknown }[]
}

/** Every path under `akasha/` naming this page type, so two of them refuse rather than one winning. */
export function pageTypeFilesIn(akashaDir: string): readonly string[] {
  const glob = new Bun.Glob(`**/${DAY_PAGE_TYPE}.page-type.ts`)
  return [...glob.scanSync({ cwd: akashaDir, onlyFiles: true })].sort()
}

export async function declaredIn(path: string): Promise<Declared | { readonly refused: string }> {
  let loaded: Record<string, unknown>
  try {
    loaded = (await import(path)) as Record<string, unknown>
  } catch (error) {
    return { refused: `'${path}' will not load (${(error as Error).message})` }
  }
  for (const exported of Object.values(loaded)) {
    if (exported === null || typeof exported !== "object" || Array.isArray(exported)) continue
    const shape = exported as PageTypeShape
    if (shape.pageTypeSlug !== "page-type" || shape.slug !== DAY_PAGE_TYPE) continue
    const slugs = new Set<string>(OF_EVERY_PAGE)
    for (const one of shape.properties ?? []) {
      if (typeof one.pagePropertySlug === "string") slugs.add(one.pagePropertySlug)
    }
    return {
      at: path,
      slugs,
      plural: typeof shape.pluralSlug === "string" ? shape.pluralSlug : null,
    }
  }
  return {
    refused: `'${path}' exports no page type slugged '${DAY_PAGE_TYPE}', so what a day may carry is unstated`,
  }
}

/** Every slug asked for that the page type does not declare. */
export function undeclaredAmong(declared: Declared, asked: Iterable<string>): readonly string[] {
  const missing: string[] = []
  for (const slug of asked) {
    if (!declared.slugs.has(slug)) missing.push(slug)
  }
  return [...new Set(missing)].sort()
}
