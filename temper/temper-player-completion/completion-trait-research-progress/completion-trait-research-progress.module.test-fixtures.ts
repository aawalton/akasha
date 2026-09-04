import type {
  CharacterCompletion,
  TraitResearchCraftType,
  TraitResearchLine,
  TraitResearchTrait,
} from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import type {
  TraitResearchCatalogCraftType,
  TraitResearchCatalogLine,
  TraitResearchCatalogTrait,
} from "./completion-trait-research-progress.module.code.ts"

const WEAPON_TRAIT_NAMES: readonly string[] = [
  "Powered",
  "Charged",
  "Precise",
  "Infused",
  "Defending",
  "Training",
  "Sharpened",
  "Decisive",
  "Nirnhoned",
]

const ARMOR_TRAIT_NAMES: readonly string[] = [
  "Sturdy",
  "Impenetrable",
  "Reinforced",
  "Well-fitted",
  "Training",
  "Infused",
  "Invigorating",
  "Divines",
  "Nirnhoned",
]

const JEWELRY_TRAIT_NAMES: readonly string[] = [
  "Arcane",
  "Healthy",
  "Robust",
  "Triune",
  "Infused",
  "Protective",
  "Swift",
  "Harmony",
  "Bloodthirsty",
]

function traitsNamed(names: readonly string[]): readonly TraitResearchCatalogTrait[] {
  return names.map((traitName, index) => ({ traitIndex: index + 1, traitName }))
}

export const BLACKSMITHING: TraitResearchCatalogCraftType = {
  slug: "blacksmithing",
  title: "Blacksmithing",
  esoCraftTypeId: 1,
}

export const AXE: TraitResearchCatalogLine = {
  slug: "axe",
  title: "Axe",
  displayOrder: 1,
  parent: "blacksmithing",
  traits: traitsNamed(WEAPON_TRAIT_NAMES),
}

export const POWERED: TraitResearchCatalogTrait = { traitIndex: 1, traitName: "Powered" }

export const CATALOG_CRAFT_TYPES: readonly TraitResearchCatalogCraftType[] = [
  BLACKSMITHING,
  { slug: "clothing", title: "Clothing", esoCraftTypeId: 2 },
  { slug: "woodworking", title: "Woodworking", esoCraftTypeId: 6 },
  { slug: "jewelry-crafting", title: "Jewelry Crafting", esoCraftTypeId: 7 },
]

export const CATALOG_RESEARCH_LINES: readonly TraitResearchCatalogLine[] = [
  AXE,
  {
    slug: "mace",
    title: "Mace",
    displayOrder: 2,
    parent: "blacksmithing",
    traits: traitsNamed(WEAPON_TRAIT_NAMES),
  },
  {
    slug: "robe-and-jerkin",
    title: "Robe & Jerkin",
    displayOrder: 1,
    parent: "clothing",
    traits: traitsNamed(ARMOR_TRAIT_NAMES),
  },
  {
    slug: "bow",
    title: "Bow",
    displayOrder: 1,
    parent: "woodworking",
    traits: traitsNamed(WEAPON_TRAIT_NAMES),
  },
  {
    slug: "ring",
    title: "Ring",
    displayOrder: 1,
    parent: "jewelry-crafting",
    traits: traitsNamed(JEWELRY_TRAIT_NAMES),
  },
  {
    slug: "necklace",
    title: "Necklace",
    displayOrder: 2,
    parent: "jewelry-crafting",
    traits: traitsNamed(JEWELRY_TRAIT_NAMES),
  },
]

export const TOTAL_CATALOG_TRAITS = CATALOG_RESEARCH_LINES.reduce(
  (sum, line) => sum + line.traits.length,
  0
)

export function linesUnderCraft(craftSlug: string): readonly TraitResearchCatalogLine[] {
  return CATALOG_RESEARCH_LINES.filter((line) => line.parent === craftSlug)
}

export const ROSTER_ONLY: CharacterCompletion = {
  gender: 1,
  level: 27,
  classId: 3,
  allianceId: 2,
  raceId: 5,
  className: "Sorcerer",
  classIcon: "/esoui/art/class/sorcerer.dds",
}

export function characterRow(
  id: string,
  completion: CharacterCompletion | null
): CompletionCharacterRow {
  return {
    id,
    userId: "user-1",
    esoCharacterId: `eso-${id}`,
    completion,
    createdAt: 0,
    updatedAt: 0,
    roles: [],
  }
}

export function capturedTraitResearch(opts: {
  craftTypeIds?: readonly number[]
  known?: (craftTypeId: number, lineIndex: number, traitIndex: number) => boolean
}): Record<number, TraitResearchCraftType> {
  const out: Record<number, TraitResearchCraftType> = {}
  for (const craft of CATALOG_CRAFT_TYPES) {
    if (opts.craftTypeIds !== undefined && !opts.craftTypeIds.includes(craft.esoCraftTypeId))
      continue
    const lines: Record<number, TraitResearchLine> = {}
    for (const line of linesUnderCraft(craft.slug)) {
      const traits: Record<number, TraitResearchTrait> = {}
      for (const trait of line.traits) {
        traits[trait.traitIndex] = {
          name: trait.traitName,
          known: opts.known?.(craft.esoCraftTypeId, line.displayOrder, trait.traitIndex) ?? false,
        }
      }
      lines[line.displayOrder] = { name: line.title, traits }
    }
    out[craft.esoCraftTypeId] = { name: craft.title, lines }
  }
  return out
}
