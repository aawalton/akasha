
import { tributeCatalogSchema } from "@akasha/temper-game-catalog-capture-host/tribute-catalog-schema"
import { CATALOG_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

interface TributeCardEntry {
  cardIndex: number
  baseCardName: string
  upgradeCardName: string
}

interface TributePatronEntry {
  patronId: number
  name: string
  categoryName: string
  collectibleId: number
  cards: readonly TributeCardEntry[]
}

function extractTributeDataFromSavedVars(
  accountWide: Record<string, unknown>
): readonly TributePatronEntry[] {
  if (accountWide.tributeCatalog === undefined)
    throw dataError(
      "No tributeCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const tributeCatalog = tributeCatalogSchema.parse(accountWide.tributeCatalog)

  const patrons: TributePatronEntry[] = []
  for (const [patronKey, patron] of Object.entries(tributeCatalog)) {
    const cards: TributeCardEntry[] = []
    for (const [cardKey, card] of Object.entries(patron.cards)) {
      cards.push({
        cardIndex: Number(cardKey),
        baseCardName: card.baseCardName,
        upgradeCardName: card.upgradeCardName,
      })
    }

    cards.sort((a, b) => a.cardIndex - b.cardIndex)

    patrons.push({
      patronId: Number(patronKey),
      name: patron.name,
      categoryName: patron.categoryName,
      collectibleId: patron.collectibleId,
      cards,
    })
  }

  patrons.sort((a, b) => a.name.localeCompare(b.name))

  return patrons
}

function generateDataFile(patrons: readonly TributePatronEntry[], apiVersion: string): string {
  const totalCards = patrons.reduce((sum, p) => sum + p.cards.length, 0)

  return `\
/**
 * Tales of Tribute Static Data (Generated)
 *
 * ${patrons.length} patrons, ${totalCards} upgradeable cards
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate tribute
 */

interface TributeCardEntry {
  cardIndex: number
  baseCardName: string
  upgradeCardName: string
}

interface TributePatronEntry {
  patronId: number
  name: string
  categoryName: string
  collectibleId: number
  cards: readonly TributeCardEntry[]
}

export const tributeData: TributePatronEntry[] = ${JSON.stringify(patrons, null, 2)}
`
}

export const tier: Tier = {
  slug: "tribute",
  summary: "Tales of Tribute patrons and their upgradeable cards",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "temper/player-completion/src/generated/tribute-data.generated.ts",
  format: true,
  emit: (accountWide, apiVersion): TierEmit => {
    const patrons = extractTributeDataFromSavedVars(accountWide)

    const totalCards = patrons.reduce((sum, p) => sum + p.cards.length, 0)

    return {
      content: generateDataFile(patrons, apiVersion),
      report: [
        `Found ${patrons.length} patrons, ${totalCards} upgradeable cards (apiVersion: ${apiVersion})`,
      ],
    }
  },
}
