import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  type PatchPageArgs,
  patchPage,
} from "akasha/page/access/modules/patch/patch.module.code.ts"
import {
  type UpsertPageArgs,
  upsertPage,
} from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import type { Page, PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { TargetQuickslot } from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"
import { characterBuild } from "akasha/temper/player/character/character-build/character-build.page-type.ts"
import { quickslotKind } from "akasha/temper/player/character/character-build/properties/quickslot-kind.select-property.ts"

const CHARACTER = "temper-account-character"

const FIRST_ICON = 1

export interface BuildEdit {
  readonly editId: string
  readonly characterId: string
  readonly order?: number
  readonly after?: string
  readonly madeIn?: string
  readonly buildId?: string
  readonly basedOn?: string
  readonly title?: string
  readonly icon?: number
  readonly buildHash?: string
  readonly quickslots?: readonly TargetQuickslot[]
}

export interface EditedCharacter {
  readonly name: string
  readonly where: PageWhere
  readonly targetBuildIds: string[]
}

export interface BuildEditContext {
  readonly accountPage: string
  readonly characters: ReadonlyMap<string, EditedCharacter>
  readonly canonical: (hash: string, characterName: string) => string | null
}

export interface BuildEditPages {
  readonly get: (args: {
    pageTypeSlug: string
    where: PageWhere
    limit: number
  }) => Promise<{ readonly rows: readonly Page[] }>
  readonly patch: (args: PatchPageArgs) => Promise<Page | null>
  readonly upsert: (args: UpsertPageArgs) => Promise<Page>
}

const LIVE_PAGES: BuildEditPages = { get: getPages, patch: patchPage, upsert: upsertPage }

export type BuildEditOutcome =
  | "landed"
  | "made"
  | "already"
  | "kept-site"
  | "no-build"
  | "no-character"
  | "bad-hash"

function textIn(record: Readonly<Record<string, unknown>>, key: string): string | undefined {
  const value = record[key]
  return typeof value === "string" && value !== "" ? value : undefined
}

function quickslotOf(value: unknown): TargetQuickslot | undefined {
  const one = asRecord(value)
  if (one === undefined) return undefined
  const { slot, kind, id, name } = one
  const kinds: readonly unknown[] = quickslotKind.values
  if (typeof slot !== "number" || typeof id !== "number" || typeof name !== "string") {
    return undefined
  }
  if (!kinds.includes(kind)) return undefined
  return { slot, kind: kind as TargetQuickslot["kind"], id, name }
}

export function quickslotsIn(view: unknown): readonly TargetQuickslot[] | undefined {
  const held = asRecord(view)?.["quickslots"]
  if (held === undefined) return undefined
  const entries = Array.isArray(held) ? held : Object.values(asRecord(held) ?? {})
  return entries
    .map(quickslotOf)
    .filter((one): one is TargetQuickslot => one !== undefined)
    .sort((one, other) => one.slot - other.slot)
}

function sameQuickslots(edit: readonly TargetQuickslot[], page: unknown): boolean {
  return JSON.stringify(edit) === JSON.stringify(quickslotsIn({ quickslots: page ?? [] }))
}

export function buildEditsIn(table: unknown): readonly BuildEdit[] {
  const edits: BuildEdit[] = []
  for (const [editId, value] of Object.entries(asRecord(table) ?? {})) {
    const one = asRecord(value)
    const characterId = one === undefined ? undefined : textIn(one, "characterId")
    if (one === undefined || characterId === undefined) continue
    const buildId = textIn(one, "buildId")
    const basedOn = textIn(one, "basedOn")
    const title = textIn(one, "title")
    const buildHash = textIn(one, "buildHash")
    const after = textIn(one, "after")
    const madeIn = textIn(one, "madeIn")
    const icon = one["icon"]
    const order = one["order"]
    const quickslots = quickslotsIn(one["view"])
    edits.push({
      editId,
      characterId,
      ...(typeof order === "number" ? { order } : {}),
      ...(after === undefined ? {} : { after }),
      ...(madeIn === undefined ? {} : { madeIn }),
      ...(buildId === undefined ? {} : { buildId }),
      ...(basedOn === undefined ? {} : { basedOn }),
      ...(title === undefined ? {} : { title }),
      ...(typeof icon === "number" ? { icon } : {}),
      ...(buildHash === undefined ? {} : { buildHash }),
      ...(quickslots === undefined ? {} : { quickslots }),
    })
  }
  return edits.sort((one, other) => (one.order ?? 0) - (other.order ?? 0))
}

async function editedBuild(edit: BuildEdit, pages: BuildEditPages): Promise<Page | undefined> {
  const where: PageWhere =
    edit.buildId === undefined
      ? [{ key: "correlationId", eq: edit.madeIn ?? edit.editId }]
      : [{ key: "id", eq: edit.buildId }]
  const { rows } = await pages.get({ pageTypeSlug: characterBuild.slug, where, limit: 1 })
  return rows[0]
}

function changesOf(edit: BuildEdit, hash: string | undefined, page: Page): Record<string, Json> {
  const set: Record<string, Json> = {}
  if (edit.title !== undefined && edit.title !== page["title"]) set["title"] = edit.title
  if (edit.icon !== undefined && edit.icon !== (page["buildIcon"] ?? FIRST_ICON)) {
    set["buildIcon"] = edit.icon
  }
  if (hash !== undefined && hash !== page["buildHash"]) set["buildHash"] = hash
  if (edit.quickslots !== undefined && !sameQuickslots(edit.quickslots, page["quickslots"])) {
    set["quickslots"] = edit.quickslots.map((one) => ({ ...one }))
  }
  return set
}

async function makeBuild(
  edit: BuildEdit,
  hash: string,
  character: EditedCharacter,
  context: BuildEditContext,
  pages: BuildEditPages
): Promise<BuildEditOutcome> {
  const made = await pages.upsert({
    pageTypeSlug: characterBuild.slug,
    where: [{ key: "correlationId", eq: edit.editId }],
    set: {
      title: edit.title ?? character.name,
      buildHash: hash,
      buildIcon: edit.icon ?? FIRST_ICON,
      visibility: "target",
      characterName: character.name,
      accountPage: context.accountPage,
      correlationId: edit.editId,
      editId: edit.editId,
      ...(edit.quickslots === undefined
        ? {}
        : { quickslots: edit.quickslots.map((one) => ({ ...one })) }),
    },
    select: ["id"],
  })
  character.targetBuildIds.push(made.id)
  await pages.upsert({
    pageTypeSlug: CHARACTER,
    where: character.where,
    set: { targetBuildIds: [...character.targetBuildIds] },
    select: ["id"],
  })
  return "made"
}

export async function landBuildEdit(
  edit: BuildEdit,
  context: BuildEditContext,
  pages: BuildEditPages = LIVE_PAGES
): Promise<BuildEditOutcome> {
  const character = context.characters.get(edit.characterId)
  if (character === undefined) return "no-character"
  const hash =
    edit.buildHash === undefined ? undefined : context.canonical(edit.buildHash, character.name)
  if (hash === null) return "bad-hash"
  const page = await editedBuild(edit, pages)
  if (page === undefined) {
    const named = edit.buildId !== undefined || edit.madeIn !== undefined
    if (named || hash === undefined) return "no-build"
    return makeBuild(edit, hash, character, context, pages)
  }
  const landedHere = page["editId"] === edit.editId
  const follows = landedHere || (edit.after !== undefined && page["editId"] === edit.after)
  if (!follows && page["updatedAt"] !== edit.basedOn) return "kept-site"
  const set = changesOf(edit, hash, page)
  if (landedHere && Object.keys(set).length === 0) return "already"
  await pages.patch({
    pageTypeSlug: characterBuild.slug,
    where: [{ key: "id", eq: page.id }],
    set: { ...set, editId: edit.editId },
  })
  return "landed"
}

const OUTCOME_LINES: Readonly<Record<BuildEditOutcome, string>> = {
  landed: "saved from the game",
  made: "made in the game",
  already: "already holds what the game saved",
  "kept-site": "keeps the change made on alanwalton.com over the game's",
  "no-build": "is no build, so the game's change is dropped",
  "no-character": "is on no character this import read",
  "bad-hash": "came from the game with a hash that does not decode",
}

export async function landBuildEdits(
  edits: readonly BuildEdit[],
  context: BuildEditContext,
  report: (line: string) => void,
  pages: BuildEditPages = LIVE_PAGES
): Promise<void> {
  for (const edit of edits) {
    const outcome = await landBuildEdit(edit, context, pages)
    if (outcome === "already") continue
    const named = edit.title ?? edit.buildId ?? edit.editId
    report(`  build ${named} ${OUTCOME_LINES[outcome]}`)
  }
}
