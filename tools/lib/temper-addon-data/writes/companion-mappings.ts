import { COMPANIONS_OUTPUT_DIR } from "../constants.ts"
import { generateCompanionMappings } from "../generators/companion-mappings.ts"
import { generateSkillMappings } from "../generators/companion-skill-mappings.ts"

export function buildAddonDataWritesCompanionMappings(
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(COMPANIONS_OUTPUT_DIR, "companion-mappings.generated.ts", generateCompanionMappings()),
    w(COMPANIONS_OUTPUT_DIR, "skill-mappings.generated.ts", generateSkillMappings()),
  ]
}
