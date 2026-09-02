/**
 * The one line that says a day has moved, rewritten to name every day that has.
 *
 * `MIGRATED_DAYS` in `tools/lib/tracking/day-place.ts` is what every writer of a day asks through.
 * Writing the pages without turning this leaves the new pages standing where nothing reads them and
 * every append still going to the old markdown; turning this without writing the pages leaves every
 * append refused. So the landing does both, and this file is the half that is a function from text
 * to text, so the turn can be proved and undone without a disk.
 *
 * The empty declaration is matched verbatim. A lane that has edited that line makes this refuse
 * rather than guess where the set now is.
 */

const EMPTY = "export const MIGRATED_DAYS: ReadonlySet<string> = new Set<string>()"

const OPENS = "export const MIGRATED_DAYS: ReadonlySet<string> = new Set<string>(["

const DAY = /^\d{4}-\d{2}-\d{2}$/

export type Turned = { readonly text: string } | { readonly refused: string }

export function namesNoDay(text: string): boolean {
  return text.includes(EMPTY)
}

export function namesSomeDay(text: string): boolean {
  return text.includes(OPENS)
}

/** The declaration naming every day handed in, in date order, each one once. */
export function declaredFor(days: readonly string[]): string {
  const named = [...new Set(days)].sort()
  const lines = named.map((day) => `  ${JSON.stringify(day)},`)
  return `${OPENS}\n${lines.join("\n")}\n])`
}

/**
 * The funnel's text with every day named as moved.
 *
 * A day that is no calendar date refuses, because the set is read by string equality against what a
 * file name carries and a value that is not a date can never match one.
 */
export function flippedTo(text: string, days: readonly string[]): Turned {
  const stray = days.filter((day) => !DAY.test(day))
  if (stray.length > 0) {
    return { refused: `${stray.map((one) => `'${one}'`).join(", ")} name no calendar date` }
  }
  if (days.length === 0) {
    return { refused: "no day was converted, so there is nothing to say has moved" }
  }
  if (namesSomeDay(text)) {
    return {
      refused:
        "the funnel already names days as moved, so this is a second landing over a first one " +
        "rather than a landing; put the empty declaration back, or land only what is left",
    }
  }
  if (!namesNoDay(text)) {
    return {
      refused:
        `the funnel does not hold the line \`${EMPTY}\` verbatim, so where the set of moved days ` +
        "now stands is unknown and nothing here will guess at it",
    }
  }
  return { text: text.replace(EMPTY, declaredFor(days)) }
}

/** The funnel's text with every day taken back out, which is how the landing undoes itself. */
export function unflipped(text: string, days: readonly string[]): Turned {
  const said = declaredFor(days)
  if (!text.includes(said)) {
    return {
      refused:
        "the funnel does not hold the declaration this landing wrote, so it has been edited " +
        "since and putting the empty set back would throw that edit away",
    }
  }
  return { text: text.replace(said, EMPTY) }
}
