import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { SkillLineId } from "akasha/temper/catalog/skill/line/modules/skill-line-ids/skill-line-ids.data-table.code.ts"
import type {
  CatalogTemplates,
  ClassTemplate,
  RaceTemplate,
  ScriptTemplate,
} from "akasha/temper/catalog/skill/modules/skill-templates-reading/skill-templates-reading.module.code.ts"
import type { ClassId } from "akasha/temper/catalog/skill/temper-class/modules/class-ids/class-ids.data-table.code.ts"
import type { GrimoireId } from "akasha/temper/catalog/skill/temper-grimoire/modules/grimoire-ids/grimoire-ids.data-table.code.ts"
import type {
  AffixScriptId,
  FocusScriptId,
  SignatureScriptId,
} from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import type { RaceId } from "akasha/temper/catalog/world/temper-race/modules/race-ids/race-ids.data-table.code.ts"
import { readScriptsFrom } from "akasha/temper/items/core/modules/script-knowledge-lookup/script-knowledge-lookup.module.code.ts"
import type { SkillLineTemplate } from "akasha/temper/player/character/skill/line/modules/skill-line-template/skill-line-template.module.code.ts"
import type { SkillTemplate } from "akasha/temper/player/character/skill/modules/character-skill-template/character-skill-template.module.code.ts"
import type { GrimoireTemplate } from "akasha/temper/player/character/skill/modules/grimoire-template/grimoire-template.module.code.ts"
import type { ScribedSkillTemplate } from "akasha/temper/player/character/skill/modules/scribed-skill-template/scribed-skill-template.module.code.ts"

export type SkillTable<Template extends SkillTemplate> = DataFile<
  string,
  Template,
  SkillTemplate["subcategoryId"]
>

type ScriptTable<Id extends string, Slot extends string> = DataFile<
  Id,
  ScriptTemplate & { readonly id: Id; readonly slotType: Slot }
>

export type SkillCatalog = {
  readonly skills: SkillTable<SkillTemplate>
  readonly scribedSkills: SkillTable<ScribedSkillTemplate>
  readonly focusScripts: ScriptTable<FocusScriptId, "focus-slot">
  readonly signatureScripts: ScriptTable<SignatureScriptId, "signature-slot">
  readonly affixScripts: ScriptTable<AffixScriptId, "affix-slot">
  readonly grimoires: DataFile<GrimoireId, GrimoireRow>
  readonly skillLines: DataFile<SkillLineId, SkillLineRow>
  readonly races: DataFile<RaceId, RaceRow>
  readonly classes: DataFile<ClassId, ClassRow>
}

type RaceRow = RaceTemplate & { readonly id: RaceId }

type ClassRow = ClassTemplate & { readonly id: ClassId }

type SkillLineRow = SkillLineTemplate & { readonly id: SkillLineId }

type GrimoireRow = GrimoireTemplate & { readonly id: GrimoireId }

const UNREAD =
  "the skill catalogue is read from pages, and nothing has read it yet — await `loadSkillCatalog()` where the work starts, or gate the screen on the skill catalogue"

function tableOf<Template extends SkillTemplate>(rows: readonly Template[]): SkillTable<Template> {
  return createDataFile<Template>()(Object.fromEntries(rows.map((row) => [row.id, row])))
}

type ScriptRow<Id extends string, Slot extends string> = ScriptTemplate & {
  readonly id: Id
  readonly slotType: Slot
}

function keyedTableOf<Row extends { readonly id: string; readonly name: string }>(
  rows: readonly { readonly id: string }[]
): DataFile<Row["id"], Row> {
  const byId = Object.fromEntries(rows.map((row) => [row.id, row])) as Record<Row["id"], Row>
  return createDataFile<Row>()(byId)
}

export function skillCatalogOf(templates: CatalogTemplates): SkillCatalog {
  return {
    skills: tableOf(templates.skills),
    scribedSkills: tableOf(templates.scribedSkills),
    focusScripts: keyedTableOf<ScriptRow<FocusScriptId, "focus-slot">>(templates.focusScripts),
    signatureScripts: keyedTableOf<ScriptRow<SignatureScriptId, "signature-slot">>(
      templates.signatureScripts
    ),
    affixScripts: keyedTableOf<ScriptRow<AffixScriptId, "affix-slot">>(templates.affixScripts),
    grimoires: keyedTableOf<GrimoireRow>(templates.grimoires),
    skillLines: keyedTableOf<SkillLineRow>(templates.skillLines),
    races: keyedTableOf<RaceRow>(templates.races),
    classes: keyedTableOf<ClassRow>(templates.classes),
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
