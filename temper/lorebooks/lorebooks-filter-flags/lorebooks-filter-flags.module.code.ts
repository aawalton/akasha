import {
  DEFAULTS,
  getSavedVariables,
} from "../lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"

export function filterValue(this: void, key: string): boolean {
  return getSavedVariables().filters[key] ?? false
}

export function filterDefault(this: void, key: string): boolean {
  const defaultFilters: Record<string, boolean> = DEFAULTS.filters
  return defaultFilters[key] ?? false
}
