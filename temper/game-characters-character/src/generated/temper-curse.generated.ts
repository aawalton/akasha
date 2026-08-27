/**
 * Temper Curses (Generated)
 *
 * ESO character curse states (vampire, werewolf, no-curse), sourced from
 * the universal pages table (page type: temper-curse).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface CurseTemplate {
  id: string
  name: string
  esoCurseIds: readonly number[]
}

/**
 * Array snapshot — preserves displayOrder. Useful when callers need a
 * stable iteration order without consulting the data-file helper.
 */
export const TEMPER_CURSES = [
  { id: "no-curse", name: "No Curse", esoCurseIds: [] },
  { id: "vampire", name: "Vampire", esoCurseIds: [40359] },
  { id: "werewolf", name: "Werewolf", esoCurseIds: [35658, 32455] },
] as const satisfies readonly CurseTemplate[]

/**
 * Keyed record. The literal-id keys flow into `createDataFile`'s
 * `curses.ids` so `z.enum(curses.ids)` and `(typeof curses.ids)[number]`
 * stay literal-union typed for callers in `build-schema.ts` and
 * `build-codec-indices.ts`.
 */
export const TEMPER_CURSES_BY_ID = {
  "no-curse": { id: "no-curse" as const, name: "No Curse", esoCurseIds: [] },
  "vampire": { id: "vampire" as const, name: "Vampire", esoCurseIds: [40359] },
  "werewolf": { id: "werewolf" as const, name: "Werewolf", esoCurseIds: [35658, 32455] },
} satisfies Record<string, CurseTemplate>
