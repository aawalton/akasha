import { generateAllianceMappings } from "./generators/alliance-mappings.ts"
import { generateChampionPointMappings } from "./generators/champion-point-mappings.ts"
import { generateClassMappings } from "./generators/class-mappings.ts"
import { generateCurseMappings } from "./generators/curse-mappings.ts"
import { generatePlayerEquipmentMappings } from "./generators/equipment-mappings.ts"
import { generateFoodMappings } from "./generators/food-mappings.ts"
import { generateMundusMappings } from "./generators/mundus-mappings.ts"
import { generatePassiveSkillMappings } from "./generators/passive-skill-mappings.ts"
import { generatePlayerSkillMappings } from "./generators/player-skill-mappings.ts"
import { generatePotionMappings } from "./generators/potion-mappings.ts"
import { generateRaceMappings } from "./generators/race-mappings.ts"
import { generateScribingMappings } from "./generators/scribing-mappings.ts"
import { generateSetMappings } from "./generators/set-mappings.ts"
import { generateSkillLineMappings } from "./generators/skill-line-mappings.ts"
import { rendered } from "./failing-alone.ts"
import { TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR } from "./output-dirs.ts"
import { type AddonDataWrite, writeToDisk } from "./writes.ts"

const MAPPING_GENERATORS: Array<{ generate: () => string; filename: string }> = [
  { generate: generateAllianceMappings, filename: "alliance-mappings" },
  { generate: generateClassMappings, filename: "character-class-mappings" },
  { generate: generateRaceMappings, filename: "character-race-mappings" },
  { generate: generateChampionPointMappings, filename: "champion-point-mappings" },
  { generate: generatePlayerSkillMappings, filename: "player-skill-mappings" },
  { generate: generateMundusMappings, filename: "mundus-mappings" },
  { generate: generateCurseMappings, filename: "curse-mappings" },
  { generate: generateFoodMappings, filename: "food-mappings" },
  { generate: generatePotionMappings, filename: "potion-mappings" },
  { generate: generatePlayerEquipmentMappings, filename: "player-equipment-mappings" },
  { generate: generateSetMappings, filename: "set-mappings" },
  { generate: generateScribingMappings, filename: "scribing-mappings" },
  { generate: generateSkillLineMappings, filename: "skill-line-mappings" },
  { generate: generatePassiveSkillMappings, filename: "passive-skill-mappings" },
]

export function buildMappingGeneratorWrites(
  w: AddonDataWrite = writeToDisk
): readonly Promise<number>[] {
  const writes: Promise<number>[] = []
  for (const { generate, filename } of MAPPING_GENERATORS) {
    writes.push(
      rendered(w, TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR, `${filename}.generated.ts`, generate)
    )
  }
  return writes
}
