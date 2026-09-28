import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { temperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.ts"

type LoadedPhrases = Readonly<Record<string, string>>

type Fills = Readonly<Record<string, string | number>>

function unphrased(slug: string): Error {
  return new Error(`web-phrase-loading: no temper-web-phrase page is \`${slug}\``)
}

export async function loadWebPhrases(slugs: readonly string[]): Promise<LoadedPhrases> {
  const { rows } = await getPages({
    pageTypeSlug: temperWebPhrase.slug,
    where: [{ key: "slug", in: slugs }],
    select: ["slug", "title"],
    limit: slugs.length,
  })
  const loaded: Record<string, string> = {}
  for (const row of rows) {
    if (typeof row.slug === "string" && typeof row.title === "string") loaded[row.slug] = row.title
  }
  const missing = slugs.find((slug) => loaded[slug] === undefined)
  if (missing !== undefined) throw unphrased(missing)
  return loaded
}

export function loadedPhrase(phrases: LoadedPhrases, slug: string, fills: Fills = {}): string {
  const title = phrases[slug]
  if (title === undefined) throw unphrased(slug)
  return Object.entries(fills).reduce(
    (text, [name, fill]) => text.split(`{${name}}`).join(String(fill)),
    title
  )
}
