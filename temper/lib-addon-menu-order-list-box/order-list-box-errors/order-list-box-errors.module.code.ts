import {
  ERROR_TEXTS,
  WIDGET_PREFIX,
} from "../order-list-box-constants/order-list-box-constants.module.code.ts"

export function errorOutput(
  this: void,
  errorTextName: string,
  values?: (string | number)[],
  buildText?: boolean
): string | undefined {
  const build = buildText ?? false
  let errorOutputText = ERROR_TEXTS[errorTextName]
  if (errorOutputText !== undefined && errorOutputText !== "") {
    if (values !== undefined) {
      errorOutputText = string.format(errorOutputText, ...values)
    }
    errorOutputText = "[" + WIDGET_PREFIX + "] ERROR - " + errorOutputText
    if (build) {
      return errorOutputText
    }
    d(errorOutputText)
  }
  return undefined
}

export function buildErrorOutput(
  this: void,
  errorTextName: string,
  values?: (string | number)[]
): string | undefined {
  return errorOutput(errorTextName, values, true)
}

export function checkOrderListBoxEntriesForCorrectFormat(
  this: void,
  listEntries: ListEntry[] | undefined
): undefined {
  if (listEntries === undefined) {
    error(buildErrorOutput("no_list_entries", undefined))
  }
  for (let i = 0; i < listEntries.length; i += 1) {
    const idx = i + 1
    const listEntry = listEntries[i]
    if (typeof listEntry !== "object") {
      error(buildErrorOutput("list_entry_no_table", [idx]))
    }
    const uniqueKey = listEntry.uniqueKey
    if (uniqueKey === undefined) {
      error(buildErrorOutput("list_entry_field_missing", [idx, "uniqueKey"]))
    }
    if (typeof uniqueKey !== "number") {
      error(
        buildErrorOutput("list_entry_field_format_wrong", [
          idx,
          "uniqueKey",
          tostring(uniqueKey),
          "number",
        ])
      )
    }
    const value = listEntry.value
    if (value === undefined) {
      error(buildErrorOutput("list_entry_field_missing", [idx, "value"]))
    }
    const textVar = listEntry.text
    if (textVar === undefined) {
      error(buildErrorOutput("list_entry_field_missing", [idx, "text"]))
    }
  }
}
