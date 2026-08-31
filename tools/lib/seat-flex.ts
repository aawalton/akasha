
import { basename } from "node:path"
import { pageStemOf } from "../../page/name/name"
import { seatAbove } from "./subagent.ts"
import { akashaSeatSlugOf } from "./seat-akasha-beside.ts"
import { pageValuesOf } from "./seat-page-values.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"
import { FLEX } from "./compose-seat-name.ts"

const SPAWNED = "spawned"

const OPENED = "opened"

const PERSON_KEY = "person-slug"

const PRINCIPAL_KEY = "principal-seat-name"

export interface FlexRecord {
  readonly value: string
}

const FLEX_IN_NAME = /(?:^|-)(flex-(?:0|[1-9]\d*))(?:-|$)/

// A FLEX IS CARRIED IN A SEAT'S NAME, so what this needs is the name rather than the page. Where
// the old page has gone the name still stands in akasha, as the slug its page file is named for.
//
// A subagent states no flex of its own and takes the one its seat carries, so the seat above is
// asked for a name the same two ways.
function nameOf(agent: string): string | null {
  const own = seatPageForAgent(agent)
  if (own !== null) return pageStemOf(own)
  const ownInAkasha = akashaSeatSlugOf(agent)
  if (ownInAkasha !== null) return ownInAkasha
  const seat = seatAbove(agent)
  if (seat === null) return null
  const above = seatPageForAgent(seat)
  return above === null ? akashaSeatSlugOf(seat) : pageStemOf(above)
}

export function flexInName(name: string): string | null {
  const found = FLEX_IN_NAME.exec(name)
  return found === null ? null : (found[1] as string)
}

export function flexOf(agent: string): FlexRecord | null {
  const name = nameOf(agent)
  const found = name === null ? null : flexInName(name)
  return found === null ? null : { value: found }
}

export function launchFrom(frontmatter: Record<string, unknown> | null): string | null {
  if (frontmatter === null) return null
  const stated = (key: string): boolean => {
    const held = frontmatter[key]
    return typeof held === "string" && held !== ""
  }
  if (stated(PERSON_KEY)) return OPENED
  if (stated(PRINCIPAL_KEY)) return SPAWNED
  return null
}

// How a seat came to exist is read from what it states, through the funnel. `refuseFlex` turns on
// this: a seat this answers null for is refused a flex as one nothing says how it came to exist,
// which is what every seat whose old page had gone read as.
export function launchOf(agent: string): string | null {
  return launchFrom(pageValuesOf(agent))
}

export function launchStating(
  standing: string | null,
  person: boolean,
  parentName: string | null
): string | null {
  if (standing !== null) return standing
  if (person) return OPENED
  return parentName === null || parentName === "" ? null : SPAWNED
}

export function refuseFlex(
  value: string,
  target: string,
  own: string | null,
  launchFor: (agent: string) => string | null
): readonly string[] {
  const refusals: string[] = []
  if (!FLEX.test(value)) {
    refusals.push(`flex: \`${value}\` is no flex value — \`flex-\` and a number, which is what keeps it out of every vocabulary`)
  }
  if (target === own) {
    refusals.push(
      "flex: that is your own seat, and no seat states its own flex — only a spawned seat carries one " +
        "and its spawner assigns it, with `ops seat start --flex`"
    )
    return refusals
  }
  const launch = launchFor(target)
  if (launch === SPAWNED) return refusals
  refusals.push(
    launch === null
      ? `flex: nothing says how ${target} came to exist, so it is not a seat shown to have been spawned — ` +
          "only a spawned seat carries a flex, and its spawner assigns it with `ops seat start --flex`"
      : `flex: ${target} was ${launch} rather than spawned, and only a spawned seat carries a flex — ` +
          "its spawner assigns it with `ops seat start --flex`"
  )
  return refusals
}

export function flexLine(record: FlexRecord | null): string {
  return `  ${"flex".padEnd(8)} ${record === null ? "— none stated" : record.value}`
}
