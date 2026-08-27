import { championPoints } from "./code/champion-points-source.ts"
import { alliances } from "./code/alliances-data.ts"
import { curses } from "./code/curse-data.ts"
import { foodOrDrink } from "./code/food-or-drink-source.ts"
import { mundus } from "./code/mundus-source.ts"
import { vampireStages } from "./code/vampire-stages-data.ts"
import { classes } from "./code/classes-data.ts"
import { armorEnchants } from "./code/armor-enchants-data.ts"
import { jewelryEnchants } from "./code/jewelry-enchants-data.ts"
import { weaponEnchantments } from "./code/weapon-enchants-data.ts"
import { setsAll } from "./code/sets-all-data.ts"
import { armorTraits } from "./code/armor-traits-data.ts"
import { jewelryTraits } from "./code/jewelry-traits-data.ts"
import { weaponTraits } from "./code/weapon-traits-data.ts"
import { weaponTypes } from "./code/weapon-types-data.ts"
import { races } from "./code/game-characters-races.ts"
import { skillLines } from "./code/skill-lines-data.ts"
import { affixScripts } from "./code/affix-scripts-data.ts"
import { focusScripts } from "./code/focus-scripts-data.ts"
import { grimoires } from "./code/grimoires-data.ts"
import { signatureScripts } from "./code/signature-scripts-data.ts"
import { skills } from "./code/skills-data.ts"
import { passiveSkillIds } from "./code/build-codec-indices.ts"
import { companions } from "./code/companions-data.ts"
import { companionSkills } from "./code/companion-skills-data.ts"
import { potions } from "./code/game-items-alchemy.ts"

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
    "skill-line-mappings": `${skillLines.ids.filter((id) => skillLines.data[id].subcategoryId !== "companion" && skillLines.data[id].esoSkillLineId !== 0).length} skill lines`,
    "passive-skill-mappings": `${passiveSkillIds.length} passive skills`,
  }
}
