import { FRESH, type Epoch } from "./epoch.ts"
import { ATTRIBUTES, type Attribute, type Attributes, type Claimant } from "./attributes.ts"
import { recordSaid } from "./read-record.ts"
import { refusalText } from "../../refusal/refusal.ts"
import type { TaskRecord } from "./seat-task.ts"

const MAX_REPORTED = 12

export function whenText(at: number): string {
  return new Date(at).toISOString().replace("T", " ").slice(0, 19)
}

export function claimText(
  claims: readonly { readonly slot: Claimant; readonly slug: string }[]
): string {
  const each = claims.map((claim) => `${claim.slot} \`${claim.slug}\``)
  if (each.length === 1) return each[0] as string
  return `${each.slice(0, -1).join(", ")} and ${each[each.length - 1]}`
}

function named(attributes: Attributes): string {
  return ATTRIBUTES.filter((key) => attributes[key] !== undefined)
    .map((key) => `${key} \`${(attributes[key] as Attribute).slug}\``)
    .join(", ")
}

export function sentTo(task: TaskRecord | null): string {
  if (task === null) return ""
  return ` You were sent to do ${claimText([{ slot: "task", slug: task.value }])}.`
}

export function listed(remedies: readonly string[]): string[] {
  const reported = remedies.slice(0, MAX_REPORTED).map((remedy, at) => `${at + 1}. ${remedy}`)
  if (remedies.length > reported.length) {
    reported.push(
      `and ${remedies.length - reported.length} more, not listed — read the ones above first`
    )
  }
  return reported
}

export function unreadLead(
  agent: string,
  held: Attributes,
  task: TaskRecord | null,
  epoch: Epoch | null,
  count: number,
  root: string
): string {
  const attributes = named(held)
  const assignment = sentTo(task)
  const record = recordSaid(agent)
  if (epoch === null || epoch.source === FRESH) {
    return refusalText(
      "seat-documents-unread",
      { attributes, assignment, count: `${count}`, record },
      root
    )
  }
  return refusalText(
    "seat-documents-unread-after-context-loss",
    {
      attributes,
      assignment,
      count: `${count}`,
      when: whenText(epoch.at),
      source: epoch.source,
      record,
    },
    root
  )
}

export function movedLead(
  held: Attributes,
  task: TaskRecord | null,
  count: number,
  root: string
): string {
  return refusalText(
    "seat-documents-moved",
    { attributes: named(held), assignment: sentTo(task), count: `${count}` },
    root
  )
}
