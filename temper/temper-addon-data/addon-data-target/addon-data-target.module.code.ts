export type AddonDataModuleTarget = {
  readonly rendered: string
  readonly workspacePackage: string
  readonly moduleSlug: string
  readonly partPrefix: string
  readonly parts: number
}

export type AddonDataEntriesTarget = {
  readonly rendered: string
  readonly pageTypeSlug: string
  readonly propertySlug: string
}

export type AddonDataTarget = AddonDataModuleTarget | AddonDataEntriesTarget

export const ADDON_DATA_TARGETS: readonly AddonDataTarget[] = [
  {
    rendered: "achievement-data.generated.ts",
    pageTypeSlug: "temper-achievement-category",
    propertySlug: "achievements",
  },
  {
    rendered: "alliance-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-alliance-map",
    partPrefix: "character-capture-alliance-map",
    parts: 1,
  },
  {
    rendered: "antiquity-data.generated.ts",
    pageTypeSlug: "temper-antiquity-category",
    propertySlug: "antiquities",
  },
  {
    rendered: "cadwell-data.generated.ts",
    workspacePackage: "temper-player-completion",
    moduleSlug: "completion-cadwell-data",
    partPrefix: "completion-cadwell-data",
    parts: 1,
  },
  {
    rendered: "champion-point-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-champion-point-map",
    partPrefix: "character-capture-champion-point-map",
    parts: 1,
  },
  {
    rendered: "character-class-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-class-map",
    partPrefix: "character-capture-class-map",
    parts: 1,
  },
  {
    rendered: "character-race-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-race-map",
    partPrefix: "character-capture-race-map",
    parts: 1,
  },
  {
    rendered: "codec-constants.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-codec-constants",
    partPrefix: "character-capture-codec-constants",
    parts: 1,
  },
  {
    rendered: "collectibles-data.generated.ts",
    pageTypeSlug: "temper-collectible-category",
    propertySlug: "collectibles",
  },
  {
    rendered: "companion-mappings.generated.ts",
    workspacePackage: "temper-companions-addon",
    moduleSlug: "companions-id-map",
    partPrefix: "companions-id-map",
    parts: 1,
  },
  {
    rendered: "curse-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-curse-map",
    partPrefix: "character-capture-curse-map",
    parts: 1,
  },
  {
    rendered: "food-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-food-map",
    partPrefix: "character-capture-food-map",
    parts: 1,
  },
  {
    rendered: "item-category-tree.generated.ts",
    workspacePackage: "temper-items-core",
    moduleSlug: "item-category-tree-data",
    partPrefix: "item-category-tree-data",
    parts: 1,
  },
  {
    rendered: "lore-shalidor-data.generated.ts",
    workspacePackage: "temper-player-completion",
    moduleSlug: "shalidor-library-collections",
    partPrefix: "shalidor-library-collections",
    parts: 2,
  },
  {
    rendered: "metric-tree.generated.ts",
    workspacePackage: "temper-characters-stats",
    moduleSlug: "metric-tree-data",
    partPrefix: "metric-tree-data",
    parts: 1,
  },
  {
    rendered: "motif-style-lookup.generated.ts",
    workspacePackage: "temper-characters-addon",
    moduleSlug: "characters-motif-style-lookup",
    partPrefix: "characters-motif-style-lookup",
    parts: 2,
  },
  {
    rendered: "mundus-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-mundus-map",
    partPrefix: "character-capture-mundus-map",
    parts: 1,
  },
  {
    rendered: "passive-skill-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-passive-map",
    partPrefix: "character-capture-passive-map",
    parts: 1,
  },
  {
    rendered: "player-equipment-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-equipment-map",
    partPrefix: "character-capture-equipment-map",
    parts: 1,
  },
  {
    rendered: "player-skill-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-skill-map",
    partPrefix: "character-capture-skill-map",
    parts: 1,
  },
  {
    rendered: "poi-data.generated.ts",
    pageTypeSlug: "temper-world-zone",
    propertySlug: "pois",
  },
  {
    rendered: "potion-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-potion-map",
    partPrefix: "character-capture-potion-map",
    parts: 1,
  },
  {
    rendered: "potion-restore-metrics.generated.ts",
    workspacePackage: "temper-items-rules-core",
    moduleSlug: "potion-restore-resolve",
    partPrefix: "potion-restore-resolve",
    parts: 1,
  },
  {
    rendered: "quest-data.generated.ts",
    pageTypeSlug: "temper-world-zone",
    propertySlug: "zone-quests",
  },
  {
    rendered: "scribing-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-scribing-map",
    partPrefix: "character-capture-scribing-map",
    parts: 1,
  },
  {
    rendered: "scribing-sources.generated.ts",
    workspacePackage: "temper-characters-addon",
    moduleSlug: "characters-scribing-source-table",
    partPrefix: "characters-scribing-source-table",
    parts: 1,
  },
  {
    rendered: "scribing-total-script-count.generated.ts",
    workspacePackage: "temper-items-rules-core",
    moduleSlug: "scribing-total-script-count",
    partPrefix: "scribing-total-script-count",
    parts: 1,
  },
  {
    rendered: "set-category-mappings.generated.ts",
    workspacePackage: "temper-items-core",
    moduleSlug: "set-category-mappings",
    partPrefix: "set-category-mappings",
    parts: 1,
  },
  {
    rendered: "set-mappings.generated.ts",
    workspacePackage: "temper-characters-capture-addon",
    moduleSlug: "character-capture-set-map",
    partPrefix: "character-capture-set-map",
    parts: 1,
  },
  {
    rendered: "skill-mappings.generated.ts",
    workspacePackage: "temper-companions-addon",
    moduleSlug: "companions-skill-map",
    partPrefix: "companions-skill-map",
    parts: 1,
  },
  {
    rendered: "temper-activity-category.generated.ts",
    workspacePackage: "temper-player-completion",
    moduleSlug: "activity-categories",
    partPrefix: "activity-categories",
    parts: 1,
  },
  {
    rendered: "temper-armor-enchant.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "armor-enchants",
    partPrefix: "armor-enchants",
    parts: 1,
  },
  {
    rendered: "temper-armor-trait.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "armor-trait-data",
    partPrefix: "armor-trait-data",
    parts: 1,
  },
  {
    rendered: "temper-armor-weight.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "armor-weights",
    partPrefix: "armor-weights",
    parts: 1,
  },
  {
    rendered: "temper-character-skill-activation.generated.ts",
    workspacePackage: "temper-character-skills",
    moduleSlug: "character-skill-activations",
    partPrefix: "character-skill-activations",
    parts: 1,
  },
  {
    rendered: "temper-comparison-op.generated.ts",
    workspacePackage: "temper-items-rules-core",
    moduleSlug: "comparison-op-data",
    partPrefix: "comparison-op-data",
    parts: 1,
  },
  {
    rendered: "temper-completion-category.generated.ts",
    workspacePackage: "temper-player-completion",
    moduleSlug: "completion-category-tree",
    partPrefix: "completion-category-tree",
    parts: 1,
  },
  {
    rendered: "temper-eso-companion-equipment-constant.generated.ts",
    workspacePackage: "temper-items-core",
    moduleSlug: "eso-companion-equipment-constants",
    partPrefix: "eso-companion-equipment-constants",
    parts: 1,
  },
  {
    rendered: "temper-eso-player-equipment-constant.generated.ts",
    workspacePackage: "temper-items-core",
    moduleSlug: "eso-player-equipment-constants",
    partPrefix: "eso-player-equipment-constants",
    parts: 1,
  },
  {
    rendered: "temper-eso-trait-map.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "eso-trait-map",
    partPrefix: "eso-trait-map",
    parts: 1,
  },
  {
    rendered: "temper-grimoire.generated.ts",
    workspacePackage: "temper-character-skills",
    moduleSlug: "scribing-grimoires",
    partPrefix: "scribing-grimoires",
    parts: 4,
  },
  {
    rendered: "temper-inventory-currency.generated.ts",
    workspacePackage: "temper-items-core",
    moduleSlug: "inventory-currency-data",
    partPrefix: "inventory-currency-data",
    parts: 1,
  },
  {
    rendered: "temper-jewelry-enchant.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "jewelry-enchants-data",
    partPrefix: "jewelry-enchants-data",
    parts: 1,
  },
  {
    rendered: "temper-jewelry-trait.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "jewelry-trait-data",
    partPrefix: "jewelry-trait-data",
    parts: 1,
  },
  {
    rendered: "temper-location-type.generated.ts",
    workspacePackage: "temper-items-core",
    moduleSlug: "location-type-data",
    partPrefix: "location-type-data",
    parts: 1,
  },
  {
    rendered: "temper-rule-template.generated.ts",
    workspacePackage: "temper-items-rules-core",
    moduleSlug: "rule-template-table",
    partPrefix: "rule-template-table",
    parts: 1,
  },
  {
    rendered: "temper-scribed-skill.generated.ts",
    workspacePackage: "temper-character-skills",
    moduleSlug: "scribed-skills",
    partPrefix: "scribed-skills",
    parts: 5,
  },
  {
    rendered: "temper-set-category.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "set-categories",
    partPrefix: "set-categories",
    parts: 1,
  },
  {
    rendered: "temper-set.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "sets-all",
    partPrefix: "sets-data",
    parts: 124,
  },
  {
    rendered: "temper-skill-point.generated.ts",
    workspacePackage: "temper-player-completion",
    moduleSlug: "completion-skill-point-sources",
    partPrefix: "completion-skill-point-sources",
    parts: 1,
  },
  {
    rendered: "temper-skill.generated.ts",
    workspacePackage: "temper-character-skills",
    moduleSlug: "character-skills-from-pages",
    partPrefix: "character-skills",
    parts: 85,
  },
  {
    rendered: "temper-weapon-enchant.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "weapon-enchants",
    partPrefix: "weapon-enchants",
    parts: 1,
  },
  {
    rendered: "temper-weapon-trait.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "weapon-trait-data",
    partPrefix: "weapon-trait-data",
    parts: 1,
  },
  {
    rendered: "temper-weapon-type.generated.ts",
    workspacePackage: "temper-characters-equipment",
    moduleSlug: "weapon-types-data",
    partPrefix: "weapon-types-data",
    parts: 1,
  },
  {
    rendered: "trait-research-data.generated.ts",
    pageTypeSlug: "temper-research-line",
    propertySlug: "traits",
  },
  {
    rendered: "tribute-data.generated.ts",
    workspacePackage: "temper-player-completion",
    moduleSlug: "completion-tribute-data",
    partPrefix: "completion-tribute-data",
    parts: 1,
  },
  {
    rendered: "zone-completion-data.generated.ts",
    pageTypeSlug: "temper-world-zone",
    propertySlug: "zone-completion-activities",
  },
]

export function targetOf(rendered: string): AddonDataTarget | undefined {
  return ADDON_DATA_TARGETS.find((one) => one.rendered === rendered)
}

export function partDigitsOf(parts: number): number {
  return Math.max(2, String(parts - 1).length)
}

export function landsAsEntries(target: AddonDataTarget): target is AddonDataEntriesTarget {
  return "pageTypeSlug" in target
}

export function partSlugsOf(target: AddonDataModuleTarget): readonly string[] {
  if (target.parts === 1) return [target.moduleSlug]
  const width = partDigitsOf(target.parts)
  const held: string[] = []
  for (let at = 0; at < target.parts; at += 1) {
    held.push(`${target.partPrefix}-${String(at).padStart(width, "0")}`)
  }
  return held
}
