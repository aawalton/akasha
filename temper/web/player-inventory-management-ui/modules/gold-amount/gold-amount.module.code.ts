import {
  heldWebPhrases,
  phraseIn,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { goldAmountValue } from "akasha/temper/web/phrase/pages/gold-amount-value.temper-web-phrase.ts"

export function formatGold(value: number): string {
  return phraseIn(heldWebPhrases(), goldAmountValue.slug, {
    gold: Math.round(value).toLocaleString(),
  })
}
