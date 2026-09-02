import { getPages } from "./pages-bridge.ts"
import { withSidecars } from "./catalog-sidecars.ts"
import type { MinedRestorePotion } from "./generators/potion-restore-metrics.ts"
import { fetchMinedRestorePotions } from "./mined-restore-potions.ts"

type PageResult = Awaited<ReturnType<typeof getPages>>

const CHARACTER_SKILL_ACTIVATION_SELECT = ["descriptionTemplate", "activationEffects"]

const COMPANION_SKILL_SELECT = [
  "key",
  "abilityId",
  "companionId",
  "skillLineId",
  "skillType",
  "description",
  "validRoles",
  "tags",
  "alternateAbilityIds",
]

export interface AddonDataPages {
  activityCategoryPages: PageResult
  catalogDomainPages: PageResult
  tributePatronPages: PageResult
  antiquityCategoryPages: PageResult
  affixScriptPages: PageResult
  alliancePages: PageResult
  armorEnchantPages: PageResult
  armorSlotPages: PageResult
  armorTraitPages: PageResult
  armorTypePages: PageResult
  armorWeightPages: PageResult
  buffMajorPages: PageResult
  buffMinorPages: PageResult
  buffOtherPages: PageResult
  characterRolePages: PageResult
  characterSkillActivationPages: PageResult
  classPages: PageResult
  companionActivationBuffPages: PageResult
  companionArmorSlotPages: PageResult
  companionBaseRolePages: PageResult
  companionEquipmentQualityPages: PageResult
  companionJewelrySlotPages: PageResult
  companionPages: PageResult
  companionPassiveMetricPages: PageResult
  companionRolePages: PageResult
  companionSkillPages: PageResult
  companionSkillLinePages: PageResult
  companionSkillSlotPages: PageResult
  companionTraitPages: PageResult
  companionWeaponRolePages: PageResult
  companionWeaponSlotPages: PageResult
  companionWeaponTypePages: PageResult
  comparisonOpPages: PageResult
  completionCategoryPages: PageResult
  cursePages: PageResult
  debuffMajorPages: PageResult
  debuffMinorPages: PageResult
  debuffOtherPages: PageResult
  dungeonPages: PageResult
  questGiverPages: PageResult
  esoCompanionEquipmentConstantPages: PageResult
  esoPlayerEquipmentConstantPages: PageResult
  esoTraitMapPages: PageResult
  focusScriptPages: PageResult
  grimoirePages: PageResult
  inventoryCurrencyPages: PageResult
  itemCategoryTreePages: PageResult
  jewelryEnchantPages: PageResult
  jewelrySlotPages: PageResult
  jewelryTraitPages: PageResult
  jewelryTypePages: PageResult
  locationTypePages: PageResult
  metricTreePages: PageResult
  motifStylePages: PageResult
  poisonEffectPages: PageResult
  potionCraftedPages: PageResult
  potionCrownPages: PageResult
  potionDroppedPages: PageResult
  qualityPages: PageResult
  racePages: PageResult
  reagentPages: PageResult
  rotationBreakdownRowPages: PageResult
  ruleTemplatePages: PageResult
  scribedSkillPages: PageResult
  scribingSourcePages: PageResult
  setPages: PageResult
  setCategoryPages: PageResult
  signatureScriptPages: PageResult
  skillBarPages: PageResult
  skillPages: PageResult
  skillLinePages: PageResult
  skillLineCategoryPages: PageResult
  skillPointPages: PageResult
  skillSlotPages: PageResult
  skillTypePages: PageResult
  sourceCategoryPages: PageResult
  specialEffectTypePages: PageResult
  statusEffectTypePages: PageResult
  targetArmorPages: PageResult
  targetScopePages: PageResult
  targetTypePages: PageResult
  ttcKioskLocationPages: PageResult
  vampireStagePages: PageResult
  weaponBarPages: PageResult
  weaponEnchantPages: PageResult
  weaponSlotPages: PageResult
  weaponTraitPages: PageResult
  weaponTypePages: PageResult
  zonePages: PageResult
  minedRestorePotions: readonly MinedRestorePotion[]
}

async function catalogPages(pageTypeSlug: string, limit = 1000): Promise<PageResult> {
  const got = await getPages({ pageTypeSlug, limit })
  return { ...got, rows: withSidecars(pageTypeSlug, got.rows) }
}

export async function fetchAddonDataPages(): Promise<AddonDataPages> {
  const [
    activityCategoryPages,
    affixScriptPages,
    alliancePages,
    armorEnchantPages,
    armorSlotPages,
    armorTraitPages,
    armorTypePages,
    armorWeightPages,
    buffMajorPages,
    buffMinorPages,
    buffOtherPages,
    characterRolePages,
    characterSkillActivationPages,
    classPages,
    companionActivationBuffPages,
    companionArmorSlotPages,
    companionBaseRolePages,
    companionEquipmentQualityPages,
    companionJewelrySlotPages,
    companionPages,
    companionPassiveMetricPages,
    companionRolePages,
    companionSkillPages,
    companionSkillLinePages,
    companionSkillSlotPages,
    companionTraitPages,
    companionWeaponRolePages,
    companionWeaponSlotPages,
    companionWeaponTypePages,
    comparisonOpPages,
    completionCategoryPages,
    cursePages,
    debuffMajorPages,
    debuffMinorPages,
    debuffOtherPages,
    dungeonPages,
    questGiverPages,
    esoCompanionEquipmentConstantPages,
    esoPlayerEquipmentConstantPages,
    esoTraitMapPages,
    focusScriptPages,
    grimoirePages,
    inventoryCurrencyPages,
    itemCategoryTreePages,
    jewelryEnchantPages,
    jewelrySlotPages,
    jewelryTraitPages,
    jewelryTypePages,
    locationTypePages,
    metricTreePages,
    motifStylePages,
    poisonEffectPages,
    potionCraftedPages,
    potionDroppedPages,
    qualityPages,
    racePages,
    reagentPages,
    rotationBreakdownRowPages,
    ruleTemplatePages,
    scribedSkillPages,
    scribingSourcePages,
    setPages,
    setCategoryPages,
    signatureScriptPages,
    skillBarPages,
    skillPages,
    skillLinePages,
    skillLineCategoryPages,
    skillPointPages,
    skillSlotPages,
    skillTypePages,
    sourceCategoryPages,
    specialEffectTypePages,
    statusEffectTypePages,
    targetArmorPages,
    targetScopePages,
    targetTypePages,
    ttcKioskLocationPages,
    vampireStagePages,
    weaponBarPages,
    weaponEnchantPages,
    weaponSlotPages,
    weaponTraitPages,
    weaponTypePages,
    zonePages,
    potionCrownPages,
    catalogDomainPages,
    tributePatronPages,
    antiquityCategoryPages,
  ] = await Promise.all([
    getPages({ pageTypeSlug: "temper-activity-category", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-affix-script", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-alliance", limit: 1000 }),
    catalogPages("temper-armor-enchant"),
    getPages({ pageTypeSlug: "temper-armor-slot", limit: 1000 }),
    catalogPages("temper-armor-trait"),
    getPages({ pageTypeSlug: "temper-armor-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-armor-weight", limit: 1000 }),
    catalogPages("temper-buff-major"),
    catalogPages("temper-buff-minor"),
    catalogPages("temper-buff-other"),
    getPages({ pageTypeSlug: "temper-character-role", limit: 1000 }),
    getPages({
      pageTypeSlug: "temper-character-skill-activation",
      limit: 1000,
      select: CHARACTER_SKILL_ACTIVATION_SELECT,
    }),
    getPages({ pageTypeSlug: "temper-class", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-activation-buff", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-armor-slot", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-base-role", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-equipment-quality", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-jewelry-slot", limit: 1000 }),
    catalogPages("temper-eso-companion"),
    getPages({ pageTypeSlug: "temper-companion-passive-metric", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-role", limit: 1000 }),
    getPages({
      pageTypeSlug: "temper-companion-skill",
      limit: 1000,
      select: COMPANION_SKILL_SELECT,
    }),
    getPages({ pageTypeSlug: "temper-companion-skill-line", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-skill-slot", limit: 1000 }),
    catalogPages("temper-companion-trait"),
    getPages({ pageTypeSlug: "temper-companion-weapon-role", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-weapon-slot", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-companion-weapon-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-comparison-op", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-completion-category", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-curse", limit: 1000 }),
    catalogPages("temper-debuff-major"),
    catalogPages("temper-debuff-minor"),
    catalogPages("temper-debuff-other"),
    getPages({ pageTypeSlug: "temper-dungeon", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-quest-giver", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-eso-companion-equipment-constant", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-eso-player-equipment-constant", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-eso-trait-map", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-focus-script", limit: 1000 }),
    catalogPages("temper-grimoire"),
    getPages({ pageTypeSlug: "temper-inventory-currency", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-item-category-tree", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-jewelry-enchant", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-jewelry-slot", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-jewelry-trait", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-jewelry-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-location-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-metric-tree", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-motif-style", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-poison-effect", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-potion-crafted", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-potion-dropped", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-quality", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-race", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-reagent", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-rotation-breakdown-row", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-rule-template", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-scribed-skill", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-scribing-source", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-set", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-set-category", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-signature-script", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-skill-bar", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-skill", limit: 5000 }),
    getPages({ pageTypeSlug: "temper-skill-line", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-skill-line-category", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-skill-point", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-skill-slot", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-skill-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-source-category", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-special-effect-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-status-effect-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-target-armor", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-target-scope", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-target-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-guild-trader", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-vampire-stage", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-weapon-bar", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-weapon-enchant", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-weapon-slot", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-weapon-trait", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-weapon-type", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-zone", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-potion-crown", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-catalog-domain", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-tribute-patron", limit: 1000 }),
    getPages({ pageTypeSlug: "temper-antiquity-category", limit: 1000 }),
  ])
  const minedRestorePotions = await fetchMinedRestorePotions()

  return {
    activityCategoryPages,
    catalogDomainPages,
    tributePatronPages,
    antiquityCategoryPages,
    affixScriptPages,
    alliancePages,
    armorEnchantPages,
    armorSlotPages,
    armorTraitPages,
    armorTypePages,
    armorWeightPages,
    buffMajorPages,
    buffMinorPages,
    buffOtherPages,
    characterRolePages,
    characterSkillActivationPages,
    classPages,
    companionActivationBuffPages,
    companionArmorSlotPages,
    companionBaseRolePages,
    companionEquipmentQualityPages,
    companionJewelrySlotPages,
    companionPages,
    companionPassiveMetricPages,
    companionRolePages,
    companionSkillPages,
    companionSkillLinePages,
    companionSkillSlotPages,
    companionTraitPages,
    companionWeaponRolePages,
    companionWeaponSlotPages,
    companionWeaponTypePages,
    comparisonOpPages,
    completionCategoryPages,
    cursePages,
    debuffMajorPages,
    debuffMinorPages,
    debuffOtherPages,
    dungeonPages,
    questGiverPages,
    esoCompanionEquipmentConstantPages,
    esoPlayerEquipmentConstantPages,
    esoTraitMapPages,
    focusScriptPages,
    grimoirePages,
    inventoryCurrencyPages,
    itemCategoryTreePages,
    jewelryEnchantPages,
    jewelrySlotPages,
    jewelryTraitPages,
    jewelryTypePages,
    locationTypePages,
    metricTreePages,
    motifStylePages,
    poisonEffectPages,
    potionCraftedPages,
    potionCrownPages,
    potionDroppedPages,
    qualityPages,
    racePages,
    reagentPages,
    rotationBreakdownRowPages,
    ruleTemplatePages,
    scribedSkillPages,
    scribingSourcePages,
    setPages,
    setCategoryPages,
    signatureScriptPages,
    skillBarPages,
    skillPages,
    skillLinePages,
    skillLineCategoryPages,
    skillPointPages,
    skillSlotPages,
    skillTypePages,
    sourceCategoryPages,
    specialEffectTypePages,
    statusEffectTypePages,
    targetArmorPages,
    targetScopePages,
    targetTypePages,
    ttcKioskLocationPages,
    vampireStagePages,
    weaponBarPages,
    weaponEnchantPages,
    weaponSlotPages,
    weaponTraitPages,
    weaponTypePages,
    zonePages,
    minedRestorePotions,
  }
}
