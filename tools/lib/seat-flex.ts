
import { basename } from "node:path"
import { pageStemOf } from "../../page/name/name"
import { seatAbove } from "./subagent.ts"
import { frontmatterOf, seatPageForAgent } from "./seat-presence-read.ts"
import { FLEX } from "./compose-seat-name.ts"

const SPAWNED = "spawned"

const OPENED = "opened"

const PERSON_KEY = "person-slug"

const PRINCIPAL_KEY = "principal-seat-name"

export interface FlexRecord {
  readonly value: string
}

const FLEX_IN_NAME = /(?:^|-)(flex-(?:0|[1-9]\d*))(?:-|$)/

function pageOf(agent: string): string | null {
  const own = seatPageForAgent(agent)
  if (own !== null) return own
  const seat = seatAbove(agent)
  return seat === null ? null : seatPageForAgent(seat)
}

export function flexInName(name: string): string | null {
  const found = FLEX_IN_NAME.exec(name)
  return found === null ? null : (found[1] as string)
}

export function flexOf(agent: string): FlexRecord | null {
  const page = pageOf(agent)
  const found = page === null ? null : flexInName(pageStemOf(page))
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

export function launchOf(agent: string): string | null {
  const page = seatPageForAgent(agent)
  return page === null ? null : launchFrom(frontmatterOf(page))
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
