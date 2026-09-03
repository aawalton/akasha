import { potions } from "@akasha/temper-alchemy/potion-source"
import { passiveSkillIds } from "@akasha/temper-build-codec/build-codec-indices"
import { championPoints } from "@akasha/temper-champion-points/champion-point-source"
import { skills } from "@akasha/temper-character-skills/character-skills"
import { grimoires } from "@akasha/temper-character-skills/scribing-grimoires"
import { alliances } from "@akasha/temper-character-sources/alliances"
import { curses } from "@akasha/temper-character-sources/curses"
import { foodOrDrink } from "@akasha/temper-character-sources/food-or-drink-source"
import { mundus } from "@akasha/temper-character-sources/mundus-source"
import { vampireStages } from "@akasha/temper-character-sources/vampire-stages"
import { armorEnchants } from "@akasha/temper-characters-equipment/armor-enchants"
import { jewelryEnchants } from "@akasha/temper-characters-equipment/jewelry-enchants"
import { setsAll } from "@akasha/temper-characters-equipment/sets-all"
import { weaponEnchantments } from "@akasha/temper-characters-equipment/weapon-enchants"
import { weaponTypes } from "@akasha/temper-characters-equipment/weapon-types-data"
import { classes } from "@akasha/temper-classes/character-class"
import { companionSkills } from "@akasha/temper-companions-core/companion-skills"
import { companions } from "@akasha/temper-companions-core/companions"
import { armorTraits } from "@akasha/temper-equipment/armor-traits"
import { jewelryTraits } from "@akasha/temper-equipment/jewelry-traits"
import { weaponTraits } from "@akasha/temper-equipment/weapon-traits"
import { races } from "@akasha/temper-races/races"
import { affixScripts } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import { focusScripts } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import { signatureScripts } from "@akasha/temper-skill-kinds/scribing-signature-scripts"

export function buildMappingTotals(): Record<string, string> {
  return {
    "companion-mappings": `${companions.list.filter((c) => c.esoCompanionId !== 0).length} companions`,
    "skill-mappings": `${companionSkills.list.filter((s) => s.abilityId !== 0).length} skills`,
    "codec-constants": "",
    "completion-types": "",
    "alliance-mappings": `${alliances.list.filter((a) => a.esoAllianceId !== 0).length} alliances`,
    "character-class-mappings": `${classes.list.filter((c) => c.esoClassId !== 0).length} classes`,
    "character-race-mappings": `${races.list.filter((r) => r.esoRaceId !== 0).length} races`,
    "champion-point-mappings": `${championPoints.list.filter((cp) => cp.esoChampionSkillId !== 0).length} champion points`,
    "player-skill-mappings": `${skills.list.filter((s) => s.esoSkillId !== 0).length} skills`,
    "mundus-mappings": `${mundus.list.filter((m) => m.esoMundusId !== 0).length} mundus stones`,
    "curse-mappings": `${curses.list.filter((c) => c.esoCurseIds.length > 0).length} curses, ${vampireStages.list.filter((s) => s.esoVampireStageId !== 0).length} vampire stages`,
    "food-mappings": `${foodOrDrink.list.filter((f) => f.abilityId !== 0).length} foods/drinks`,
    "potion-mappings": `${potions.list.filter((p) => p.subcategoryId !== "none").length} potions`,
    "player-equipment-mappings": `${armorTraits.ids.length} armor traits, ${weaponTraits.ids.length} weapon traits, ${jewelryTraits.ids.length} jewelry traits, ${armorEnchants.ids.length} armor enchants, ${weaponEnchantments.ids.length} weapon enchants, ${jewelryEnchants.ids.length} jewelry enchants, ${weaponTypes.ids.length} weapon types`,
    "set-mappings": `${setsAll.list.filter((s) => s.esoSetId !== 0).length} sets`,
    "scribing-mappings": `${grimoires.ids.length} grimoires, ${focusScripts.ids.length} focus, ${signatureScripts.ids.length} signature, ${affixScripts.ids.length} affix`,
    "passive-skill-mappings": `${passiveSkillIds.length} passive skills`,
  }
}
