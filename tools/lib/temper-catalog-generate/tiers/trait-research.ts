
import { catalogSchema, CATALOG_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

const SCHEMA_REF = "@temper/game-crafting-capture-host/saved-variables-schema"

interface TraitResearchCatalogTrait {
  name: string
}

interface TraitResearchCatalogLine {
  name: string
  traits: Record<number, TraitResearchCatalogTrait>
}

interface TraitResearchCatalogCraftType {
  name: string
  lines: Record<number, TraitResearchCatalogLine>
}

type TraitResearchCatalog = Record<number, TraitResearchCatalogCraftType>

interface TraitResearchTraitEntry {
  traitIndex: number
  name: string
}

interface TraitResearchLineEntry {
  lineIndex: number
  name: string
  traits: readonly TraitResearchTraitEntry[]
}

interface TraitResearchCraftTypeEntry {
  craftTypeId: number
  name: string
  lines: readonly TraitResearchLineEntry[]
}

async function extractTraitResearchFromSavedVars(
  accountWide: Record<string, unknown>
): Promise<readonly TraitResearchCraftTypeEntry[]> {
  const traitResearchCatalogSchema = await catalogSchema<TraitResearchCatalog>(
    SCHEMA_REF,
    "traitResearchCatalogSchema"
  )

  const rawCatalog = accountWide.traitResearchCatalog
  if (!rawCatalog)
    throw dataError(
      "No traitResearchCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const catalog = traitResearchCatalogSchema.parse(rawCatalog)

  const craftTypes: TraitResearchCraftTypeEntry[] = []

  for (const [craftKey, craftType] of Object.entries(catalog)) {
    const craftTypeId = Number(craftKey)

    const lineEntries: TraitResearchLineEntry[] = []

    for (const [lineKey, line] of Object.entries(craftType.lines)) {
      const lineIndex = Number(lineKey)

      const traitEntries: TraitResearchTraitEntry[] = []

      for (const [traitKey, trait] of Object.entries(line.traits)) {
        const traitIndex = Number(traitKey)
        traitEntries.push({ traitIndex, name: trait.name })
      }

      traitEntries.sort((a, b) => a.traitIndex - b.traitIndex)

      lineEntries.push({ lineIndex, name: line.name, traits: traitEntries })
    }

    lineEntries.sort((a, b) => a.lineIndex - b.lineIndex)

    craftTypes.push({ craftTypeId, name: craftType.name, lines: lineEntries })
  }

  craftTypes.sort((a, b) => a.craftTypeId - b.craftTypeId)

  return craftTypes
}

function generateDataFile(
  craftTypes: readonly TraitResearchCraftTypeEntry[],
  apiVersion: string
): string {
  const totalLines = craftTypes.reduce((sum, c) => sum + c.lines.length, 0)
  const totalTraits = craftTypes.reduce(
    (sum, c) => sum + c.lines.reduce((lSum, l) => lSum + l.traits.length, 0),
    0
  )

  return `\
/**
 * Trait Research Static Data (Generated)
 *
 * ${craftTypes.length} craft types, ${totalLines} research lines, ${totalTraits} traits
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate trait-research
 */

interface TraitResearchTraitEntry {
  traitIndex: number
  name: string
}

interface TraitResearchLineEntry {
  lineIndex: number
  name: string
  traits: readonly TraitResearchTraitEntry[]
}

interface TraitResearchCraftTypeEntry {
  craftTypeId: number
  name: string
  lines: readonly TraitResearchLineEntry[]
}

export const traitResearchData: TraitResearchCraftTypeEntry[] = ${JSON.stringify(craftTypes, null, 2)}
`
}

export const tier: Tier = {
  slug: "trait-research",
  summary: "Craftable traits, by craft type and research line",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "packages/temper/player/completion/src/generated/trait-research-data.generated.ts",
  format: true,
  emit: async (accountWide, apiVersion): Promise<TierEmit> => {
    const craftTypes = await extractTraitResearchFromSavedVars(accountWide)

    const totalLines = craftTypes.reduce((sum, c) => sum + c.lines.length, 0)
    const totalTraits = craftTypes.reduce(
      (sum, c) => sum + c.lines.reduce((lSum, l) => lSum + l.traits.length, 0),
      0
    )

    return {
      content: generateDataFile(craftTypes, apiVersion),
      report: [
        `Found ${craftTypes.length} craft types, ${totalLines} research lines, ${totalTraits} traits (apiVersion: ${apiVersion})`,
      ],
    }
  },
}
