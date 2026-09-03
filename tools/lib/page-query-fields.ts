import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { narrowed } from "@akasha/pages-system/page-query-narrow"
import type { PageQuery, Reduction } from "@akasha/pages-system/page-query-shape"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { documentFrom } from "./page-query-bind.ts"

const REDUCTIONS: readonly string[] = ["sum", "mean"]

export function reduces(one: string): one is Reduction {
  return REDUCTIONS.includes(one)
}

function listValue(value: unknown): readonly string[] {
  if (typeof value === "string") return [value]
  return Array.isArray(value) ? value.filter((one): one is string => typeof one === "string") : []
}

function textIn(fields: Readonly<Record<string, unknown>>, key: string): string | null {
  const value = fields[key]
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed === "" ? null : trimmed
}

function countIn(fields: Readonly<Record<string, unknown>>, key: string): number | null {
  const stated = textIn(fields, key)
  if (stated === null) return null
  const value = Number(stated)
  return Number.isFinite(value) ? value : null
}

export function queryFrom(fields: Readonly<Record<string, unknown>>): PageQuery | null {
  const pageType = textIn(fields, "page-type")
  if (pageType === null) return null
  const narrows = narrowed(fields.where)
  const takes = fields.takes
  const countBy = fields["count-by"]
  const keys = fields.keys
  const sortBy = textIn(fields, "sort-by")
  const limit = countIn(fields, "limit")
  const offset = countIn(fields, "offset")
  const how = textIn(fields, "function")
  const target = textIn(fields, "target")
  return {
    pageType,
    ...(typeof takes !== "object" || takes === null || Array.isArray(takes)
      ? {}
      : {
          takes: Object.fromEntries(
            Object.entries(takes as Record<string, unknown>).map(([name, type]) => [
              name,
              typeof type === "string" ? type.trim() : String(type),
            ])
          ),
        }),
    ...(narrows.where === undefined ? {} : { where: narrows.where }),
    ...(narrows.unreadable.length === 0 ? {} : { unreadable: narrows.unreadable }),
    ...(countBy === undefined ? {} : { countBy: listValue(countBy) }),
    ...(sortBy === null ? {} : { sortBy }),
    ...(textIn(fields, "descending") === "true" ? { descending: true } : {}),
    ...(limit === null ? {} : { limit }),
    ...(offset === null || offset === 0 ? {} : { offset }),
    ...(keys === undefined ? {} : { keys: listValue(keys) }),
    ...(how === null || !reduces(how) ? {} : { function: how }),
    ...(target === null ? {} : { target }),
  }
}

export function queryOf(text: string, roots?: Roots): PageQuery | null {
  const fields = Object.fromEntries(parseFrontmatter(text).fields)
  return documentFrom(queryFrom(fields), fields, roots)
}
