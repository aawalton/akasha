"use client"

import {
  numberAt,
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import type { FilterOption } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { temperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.ts"
import { useMemo } from "react"

const EVERY = 500

const NONE: readonly FilterOption[] = []

type ConditionValueOptions = ReadonlyMap<string, readonly FilterOption[]>

interface Entry {
  readonly field: string
  readonly order: number
  readonly option: FilterOption
}

function unread(slug: string, name: string): Error {
  return new Error(`useConditionValueOptions: condition value \`${slug}\` states no \`${name}\``)
}

function entryOf(row: Value): Entry {
  const slug = textAt(row, "slug") ?? "?"
  const key = textAt(row, "key")
  if (key === null) throw unread(slug, "key")
  const title = textAt(row, "title")
  if (title === null) throw unread(slug, "title")
  const field = textAt(row, "conditionField")
  if (field === null) throw unread(slug, "conditionField")
  const order = numberAt(row, "displayOrder")
  if (order === null) throw unread(slug, "displayOrder")
  return { field: slugOf(field), order, option: { value: key, label: title } }
}

function conditionValueOptionsFrom(rows: readonly Value[]): ConditionValueOptions {
  const byField = new Map<string, Entry[]>()
  for (const row of rows) {
    const entry = entryOf(row)
    byField.set(entry.field, [...(byField.get(entry.field) ?? []), entry])
  }
  return new Map(
    [...byField].map(([field, entries]) => [
      field,
      [...entries].sort((one, two) => one.order - two.order).map((one) => one.option),
    ])
  )
}

export function optionsOf(
  options: ConditionValueOptions,
  fieldSlug: string
): readonly FilterOption[] {
  return options.get(fieldSlug) ?? NONE
}

export function valueLabelOf(
  options: ConditionValueOptions,
  fieldSlug: string,
  value: string
): string {
  return optionsOf(options, fieldSlug).find((option) => option.value === value)?.label ?? value
}

export function useConditionValueOptions(): ConditionValueOptions | null {
  const pages = usePages({ pageTypeSlug: temperConditionValue.slug, limit: EVERY })
  const options = useMemo(
    () => (pages.isLoading ? null : conditionValueOptionsFrom(pages.rows)),
    [pages.isLoading, pages.rows]
  )
  if (pages.error !== null) throw pages.error
  return options
}
