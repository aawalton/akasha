import type { AddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"

type Rows = { rows: ReadonlyArray<unknown> }

export function buildPageRowTotals(p: AddonDataPages): Record<string, Rows> {
  return {
    "temper-affix-script": p.affixScriptPages,
    "temper-alliance": p.alliancePages,
    "temper-armor-enchant": p.armorEnchantPages,
    "temper-armor-slot": p.armorSlotPages,
    "temper-armor-trait": p.armorTraitPages,
    "temper-armor-type": p.armorTypePages,
    "temper-armor-weight": p.armorWeightPages,
    "temper-buff-major": p.buffMajorPages,
    "temper-buff-minor": p.buffMinorPages,
    "temper-buff-other": p.buffOtherPages,
    "temper-character-role": p.characterRolePages,
    "temper-character-skill-activation": p.characterSkillActivationPages,
    "temper-class": p.classPages,
    "temper-eso-companion": p.companionPages,
    "temper-companion-activation-buff": p.companionActivationBuffPages,
    "temper-companion-armor-slot": p.companionArmorSlotPages,
    "temper-companion-base-role": p.companionBaseRolePages,
    "temper-companion-equipment-quality": p.companionEquipmentQualityPages,
    "temper-companion-jewelry-slot": p.companionJewelrySlotPages,
    "temper-companion-passive-metric": p.companionPassiveMetricPages,
    "temper-companion-role": p.companionRolePages,
    "temper-companion-skill": p.companionSkillPages,
    "temper-companion-skill-line": p.companionSkillLinePages,
    "temper-companion-skill-slot": p.companionSkillSlotPages,
    "temper-companion-trait": p.companionTraitPages,
    "temper-companion-weapon-role": p.companionWeaponRolePages,
    "temper-companion-weapon-slot": p.companionWeaponSlotPages,
    "temper-companion-weapon-type": p.companionWeaponTypePages,
    "temper-comparison-op": p.comparisonOpPages,
    "temper-curse": p.cursePages,
    "temper-debuff-major": p.debuffMajorPages,
    "temper-debuff-minor": p.debuffMinorPages,
    "temper-debuff-other": p.debuffOtherPages,
    "temper-dungeon": p.dungeonPages,
    "temper-eso-companion-equipment-constant": p.esoCompanionEquipmentConstantPages,
    "temper-eso-player-equipment-constant": p.esoPlayerEquipmentConstantPages,
    "temper-eso-trait-map": p.esoTraitMapPages,
    "temper-focus-script": p.focusScriptPages,
    "temper-grimoire": p.grimoirePages,
    "temper-inventory-currency": p.inventoryCurrencyPages,
    "temper-item-category-tree": p.itemCategoryTreePages,
    "temper-jewelry-enchant": p.jewelryEnchantPages,
    "temper-jewelry-slot": p.jewelrySlotPages,
    "temper-jewelry-trait": p.jewelryTraitPages,
    "temper-jewelry-type": p.jewelryTypePages,
    "temper-location-type": p.locationTypePages,
    "temper-metric-tree": p.metricTreePages,
    "temper-motif-style": p.motifStylePages,
    "temper-poison-effect": p.poisonEffectPages,
    "temper-potion-crafted": p.potionCraftedPages,
    "temper-potion-crown": p.potionCrownPages,
    "temper-potion-dropped": p.potionDroppedPages,
    "temper-quality": p.qualityPages,
    "temper-quest-giver": p.questGiverPages,
    "temper-race": p.racePages,
    "temper-reagent": p.reagentPages,
    "temper-rotation-breakdown-row": p.rotationBreakdownRowPages,
    "temper-scribed-skill": p.scribedSkillPages,
    "temper-scribing-source": p.scribingSourcePages,
    "temper-set": p.setPages,
    "temper-set-category": p.setCategoryPages,
    "temper-signature-script": p.signatureScriptPages,
    "temper-skill": p.skillPages,
    "temper-skill-bar": p.skillBarPages,
    "temper-skill-line": p.skillLinePages,
    "temper-skill-line-category": p.skillLineCategoryPages,
    "temper-skill-slot": p.skillSlotPages,
    "temper-skill-type": p.skillTypePages,
    "temper-source-category": p.sourceCategoryPages,
    "temper-special-effect-type": p.specialEffectTypePages,
    "temper-status-effect-type": p.statusEffectTypePages,
    "temper-target-armor": p.targetArmorPages,
    "temper-target-scope": p.targetScopePages,
    "temper-target-type": p.targetTypePages,
    "temper-guild-trader": p.ttcKioskLocationPages,
    "temper-vampire-stage": p.vampireStagePages,
    "temper-weapon-bar": p.weaponBarPages,
    "temper-weapon-enchant": p.weaponEnchantPages,
    "temper-weapon-slot": p.weaponSlotPages,
    "temper-weapon-trait": p.weaponTraitPages,
    "temper-weapon-type": p.weaponTypePages,
    "temper-zone": p.zonePages,
  }
}

export function logPageRowTotals(byPageTypeSlug: Record<string, Rows>): undefined {
  console.log("\n  Page-sourced row totals:")
  for (const [slug, pages] of Object.entries(byPageTypeSlug).sort(([a], [b]) =>
    a.localeCompare(b)
  )) {
    console.log(`    ${slug}: ${pages.rows.length}`)
  }
}

export function logMappingTotals(totals: Record<string, string>): undefined {
  for (const [name, n] of Object.entries(totals)) {
    console.log(n === "" ? `  ${name}.generated.ts` : `  ${name}.generated.ts (${n})`)
  }
}
