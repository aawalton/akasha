import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type {
  CatalogTemplates,
  ScriptTemplate,
} from "akasha/temper/catalog/skill/modules/skill-templates-reading/skill-templates-reading.module.code.ts"
import type {
  AffixScriptId,
  FocusScriptId,
  SignatureScriptId,
} from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import { readScriptsFrom } from "akasha/temper/items/core/modules/script-knowledge-lookup/script-knowledge-lookup.module.code.ts"
import type { SkillTemplate } from "akasha/temper/player/character/skill/modules/character-skill-template/character-skill-template.module.code.ts"
import type { ScribedSkillTemplate } from "akasha/temper/player/character/skill/modules/scribed-skill-template/scribed-skill-template.module.code.ts"

export type SkillTable<Template extends SkillTemplate> = DataFile<
  string,
  Template,
  SkillTemplate["subcategoryId"]
>

export type ScriptTable<Id extends string, Slot extends string> = DataFile<
  Id,
  ScriptTemplate & { readonly id: Id; readonly slotType: Slot }
>

export type SkillCatalog = {
  readonly skills: SkillTable<SkillTemplate>
  readonly scribedSkills: SkillTable<ScribedSkillTemplate>
  readonly focusScripts: ScriptTable<FocusScriptId, "focus-slot">
  readonly signatureScripts: ScriptTable<SignatureScriptId, "signature-slot">
  readonly affixScripts: ScriptTable<AffixScriptId, "affix-slot">
}

const UNREAD =
  "the skill catalogue is read from pages, and nothing has read it yet — await `loadSkillCatalog()` where the work starts, or gate the screen on the skill catalogue"

function tableOf<Template extends SkillTemplate>(rows: readonly Template[]): SkillTable<Template> {
  return createDataFile<Template>()(Object.fromEntries(rows.map((row) => [row.id, row])))
}

type ScriptRow<Id extends string, Slot extends string> = ScriptTemplate & {
  readonly id: Id
  readonly slotType: Slot
}

function scriptTableOf<Id extends string, Slot extends string>(
  rows: readonly ScriptTemplate[]
): ScriptTable<Id, Slot> {
  const byId = Object.fromEntries(rows.map((row) => [row.id, row])) as Record<
    Id,
    ScriptRow<Id, Slot>
  >
  return createDataFile<ScriptRow<Id, Slot>>()(byId)
}

export function skillCatalogOf(templates: CatalogTemplates): SkillCatalog {
  return {
    skills: tableOf(templates.skills),
    scribedSkills: tableOf(templates.scribedSkills),
    focusScripts: scriptTableOf(templates.focusScripts),
    signatureScripts: scriptTableOf(templates.signatureScripts),
    affixScripts: scriptTableOf(templates.affixScripts),
  }
}

let held: SkillCatalog | null = null

export function holdSkillCatalog(catalog: SkillCatalog): SkillCatalog {
  held = catalog
  readScriptsFrom(() => [
    ...catalog.focusScripts.list,
    ...catalog.signatureScripts.list,
    ...catalog.affixScripts.list,
  ])
  return catalog
}

export function heldSkillCatalog(): SkillCatalog | null {
  return held
}

export function skillCatalog(): SkillCatalog {
  if (held === null) throw new Error(UNREAD)
  return held
}

export function tableView<K extends string, V, S extends string>(
  read: () => DataFile<K, V, S>
): DataFile<K, V, S> {
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
    has: (id: string): id is K => read().has(id),
  }
}
