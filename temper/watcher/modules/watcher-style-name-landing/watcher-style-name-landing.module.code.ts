import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import { patchPageById } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { temperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"

const TOP_LEVEL = "TemperCatalog_SavedVariables"

const HELD = "itemStyleCatalog"

const STYLE_ID = "esoItemStyleId"

const STYLE_NAME = "styleName"

const TITLE = "title"

const CONSTANT_TITLE = /^ITEMSTYLE_[A-Z0-9_]+$/

export interface StylePage {
  readonly id: string
  readonly styleId: number
  readonly styleName: string | undefined
  readonly title: string | null
}

export interface StyleNameWrite {
  readonly id: string
  readonly styleName: string
  readonly title?: string
}

export function styleNamesIn(content: string): ReadonlyMap<number, string> {
  const found = new Map<number, string>()
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, TOP_LEVEL)
  } catch {
    return found
  }
  const held = accountWideHolding(root, HELD)
  if (held === undefined) return found
  for (const key of Object.keys(held)) {
    const styleId = Number(key)
    const name = held[key]
    if (!Number.isInteger(styleId) || typeof name !== "string" || name === "") continue
    found.set(styleId, name)
  }
  return found
}

export function styleNameWrites(
  names: ReadonlyMap<number, string>,
  pages: readonly StylePage[]
): { readonly writes: readonly StyleNameWrite[]; readonly unpaged: readonly number[] } {
  const paged = new Set<number>()
  const writes: StyleNameWrite[] = []
  for (const page of pages) {
    paged.add(page.styleId)
    const name = names.get(page.styleId)
    if (name === undefined) continue
    const retitled = page.title !== null && CONSTANT_TITLE.test(page.title)
    if (name === page.styleName && !retitled) continue
    writes.push({ id: page.id, styleName: name, ...(retitled ? { title: name } : {}) })
  }
  const unpaged = [...names.keys()]
    .filter((styleId) => !paged.has(styleId))
    .sort((one, other) => one - other)
  return { writes, unpaged }
}

async function stylePagesOverPages(): Promise<readonly StylePage[]> {
  const rows = await collectPages({ pageTypeSlug: temperMotifStyle.slug, pageSize: 2500 })
  return rows.flatMap((row): StylePage[] => {
    const styleId = row[STYLE_ID]
    if (typeof styleId !== "number") return []
    const styleName = row[STYLE_NAME]
    return [
      {
        id: row.id,
        styleId,
        styleName: typeof styleName === "string" ? styleName : undefined,
        title: row.title,
      },
    ]
  })
}

async function nameOverPages(write: StyleNameWrite): Promise<unknown> {
  return patchPageById({
    pageTypeSlug: temperMotifStyle.slug,
    id: write.id,
    set: {
      [STYLE_NAME]: write.styleName,
      ...(write.title === undefined ? {} : { [TITLE]: write.title }),
    },
  })
}

interface StyleNameDeps {
  readonly stylePages?: () => Promise<readonly StylePage[]>
  readonly name?: (write: StyleNameWrite) => Promise<unknown>
  readonly report?: (message: string) => void
}

export async function landStyleNames(
  content: string,
  deps: StyleNameDeps = {}
): Promise<{ readonly named: number; readonly unpaged: readonly number[] }> {
  const names = styleNamesIn(content)
  if (names.size === 0) return { named: 0, unpaged: [] }
  const stylePages = deps.stylePages ?? stylePagesOverPages
  const name = deps.name ?? nameOverPages
  const report = deps.report ?? log
  const { writes, unpaged } = styleNameWrites(names, await stylePages())
  for (const write of writes) await name(write)
  const unpagedNames = unpaged.map((styleId) => `${styleId} ${names.get(styleId) ?? ""}`)
  report(
    `${writes.length} motif style page(s) given the name the game shows; ${unpaged.length} captured style number(s) no page states${unpaged.length === 0 ? "" : `: ${unpagedNames.join(", ")}`}`
  )
  return { named: writes.length, unpaged }
}
