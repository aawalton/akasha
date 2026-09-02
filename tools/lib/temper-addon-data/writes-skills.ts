import { generateTemperCharacterSkillActivation } from "@akasha/temper-addon-generators/temper-character-skill-activation"
import { generateTemperGrimoire } from "@akasha/temper-addon-generators/temper-grimoire"
import { generateTemperScribedSkill } from "@akasha/temper-addon-generators/temper-scribed-skill"
import { generateTemperSkill } from "@akasha/temper-addon-generators/temper-skill"
import { generateTemperSkillPoint } from "@akasha/temper-addon-generators/temper-skill-point"
import {
  TEMPER_COMPLETION_OUTPUT_DIR,
  TEMPER_SKILLS_OUTPUT_DIR,
} from "./output-dirs.ts"
import type { AddonDataPages } from "./addon-data-pages"

/**
 * One generator run and its rendering handed to the writer, as a promise that can reject alone.
 *
 * A section states its writes as one array literal, so a generator called while that literal is
 * built throws before any sibling is reached and takes every sibling down with it. Four of the
 * five files here went unwritten for a throw in the second, and a harness counting what it got
 * back reported one of one. Rendering inside the promise leaves the throw where it happened: the
 * failing file rejects, the other four are written, and `Promise.all` still fails the run.
 */
function rendered(
  w: (dir: string, name: string, source: string) => Promise<number>,
  dir: string,
  name: string,
  render: () => string
): Promise<number> {
  return Promise.resolve()
    .then(() => w(dir, name, render()))
    .catch((reason: unknown) => {
      const said = reason instanceof Error ? reason.message : String(reason)
      throw new Error(`\`${name}\` was not written: ${said}`)
    })
}

export function buildAddonDataWritesSkills(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-character-skill-activation.generated.ts", () =>
      generateTemperCharacterSkillActivation(p.characterSkillActivationPages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-grimoire.generated.ts", () =>
      generateTemperGrimoire(p.grimoirePages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-scribed-skill.generated.ts", () =>
      generateTemperScribedSkill(p.scribedSkillPages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-skill.generated.ts", () =>
      generateTemperSkill(p.skillPages.rows)
    ),
    rendered(w, TEMPER_COMPLETION_OUTPUT_DIR, "temper-skill-point.generated.ts", () =>
      generateTemperSkillPoint(p.skillPointPages.rows)
    ),
  ]
}
