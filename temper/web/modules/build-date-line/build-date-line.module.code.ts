import {
  heldWebPhrases,
  phraseIn,
  type WebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { buildDateLineCreated } from "akasha/temper/web/phrase/pages/build-date-line-created.temper-web-phrase.ts"
import { buildDateLineUpdated } from "akasha/temper/web/phrase/pages/build-date-line-updated.temper-web-phrase.ts"

export function buildDateLine(
  build: {
    readonly createdAt: number | null
    readonly updatedAt: number
  },
  phrases: WebPhrases | null = heldWebPhrases()
): string {
  if (build.updatedAt > 0 && build.updatedAt !== build.createdAt) {
    const date = new Date(build.updatedAt).toLocaleDateString()
    return phraseIn(phrases, buildDateLineUpdated.slug, { date })
  }
  if (build.createdAt === null) return ""
  const date = new Date(build.createdAt).toLocaleDateString()
  return phraseIn(phrases, buildDateLineCreated.slug, { date })
}
