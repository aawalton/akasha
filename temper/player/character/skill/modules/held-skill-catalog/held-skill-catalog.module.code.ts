import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { SkillTemplates } from "akasha/temper/catalog/skill/modules/skill-templates-reading/skill-templates-reading.module.code.ts"
import type { SkillTemplate } from "akasha/temper/player/character/skill/modules/character-skill-template/character-skill-template.module.code.ts"
import type { ScribedSkillTemplate } from "akasha/temper/player/character/skill/modules/scribed-skill-template/scribed-skill-template.module.code.ts"

export type SkillTable<Template extends SkillTemplate> = DataFile<
  string,
  Template,
  SkillTemplate["subcategoryId"]
>

export type SkillCatalog = {
  readonly skills: SkillTable<SkillTemplate>
  readonly scribedSkills: SkillTable<ScribedSkillTemplate>
}

const UNREAD =
  "the skill catalogue is read from pages, and nothing has read it yet — await `loadSkillCatalog()` where the work starts, or gate the screen on the skill catalogue"

function tableOf<Template extends SkillTemplate>(rows: readonly Template[]): SkillTable<Template> {
  return createDataFile<Template>()(Object.fromEntries(rows.map((row) => [row.id, row])))
}

export function skillCatalogOf(templates: SkillTemplates): SkillCatalog {
  return { skills: tableOf(templates.skills), scribedSkills: tableOf(templates.scribedSkills) }
}

let held: SkillCatalog | null = null

export function holdSkillCatalog(catalog: SkillCatalog): SkillCatalog {
  held = catalog
  return catalog
}

export function heldSkillCatalog(): SkillCatalog | null {
  return held
}

export function skillCatalog(): SkillCatalog {
  if (held === null) throw new Error(UNREAD)
  return held
}

export function tableView<Template extends SkillTemplate>(
  read: () => SkillTable<Template>
): SkillTable<Template> {
  return {
    get data() {
      return read().data
    },
    get ids() {
      return read().ids
    },
    get list() {
      return read().list
    },
    get subcategories() {
      return read().subcategories
    },
    has: (id: string): id is string => read().has(id),
  }
}
