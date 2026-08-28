import type { Repo } from "../../page/document/types.ts"
import { requiredReadingFor, type Pending } from "../required-reading.ts"
import { recordSaid, recordStands } from "./read-record.ts"
import { lead, remedyFor } from "./unread.ts"
import { refusalText } from "../../refusal/refusal.ts"

const MAX_REPORTED = 12

export interface Request {
  readonly relPath: string
  readonly repo: Repo
  readonly root: string
  readonly agent: string | null
  readonly pending?: Pending | null
  readonly touching?: ReadonlySet<string> | null
}

export type Kind = "unrequired" | "read" | "unaskable" | "unrecorded" | "unattributed" | "missing"

export interface Standing {
  readonly kind: Kind
  readonly detail: string
  readonly refusals: readonly string[]
  readonly required: readonly string[]
  readonly owed: readonly string[]
}

export function refuses(standing: Standing): boolean {
  return standing.refusals.length > 0
}

export function stoodAside(standing: Standing): boolean {
  return standing.kind === "unaskable"
}

function outcome(
  kind: Kind,
  detail: string,
  required: readonly string[],
  refusals: readonly string[] = [],
  owed: readonly string[] = []
): Standing {
  return { kind, detail, required, refusals, owed }
}

export function standingOn(request: Request): Standing {
  let required: readonly string[]
  try {
    const found = requiredReadingFor(
      request.relPath,
      request.root,
      request.repo,
      request.pending ?? null
    )
    const touching = request.touching ?? null
    required = [
      ...new Set([
        ...found.whole,
        ...[...found.sections].flatMap(([section, at]) =>
          touching === null || touching.has(section) ? at : []
        ),
      ]),
    ].sort()
  } catch (error) {
    return outcome(
      "unaskable",
      `what is required for \`${request.relPath}\` could not be asked: ${String(error)}`,
      []
    )
  }
  if (required.length === 0) {
    return outcome(
      "unrequired",
      "nothing is required reading for this path, so there is nothing to have read",
      []
    )
  }
  if (request.agent === null) {
    return outcome(
      "unattributed",
      `${required.length} document(s) are required reading for this path; nothing identifies who is writing`,
      required,
      [
        refusalText(
          "required-reading-writer-unidentified",
          { path: request.relPath, count: `${required.length}`, required: required.join(", ") },
          request.root
        ),
      ]
    )
  }
  if (!recordStands(request.agent)) {
    return outcome(
      "unrecorded",
      `${required.length} document(s) are required reading for this path and no page carries a read record for ${request.agent}`,
      required,
      [
        refusalText(
          "agent-page-absent",
          {
            agent: request.agent,
            lapsed:
              "nothing can say whether you have read what is required reading for this change, and it could be " +
              "made under rules nobody has read",
          },
          request.root
        ),
      ]
    )
  }
  const alreadyRead: string[] = []
  const remedies: string[] = []
  const owed: string[] = []
  for (const at of required) {
    const absolute = at.startsWith("/") ? at : `${request.root}/${at}`
    const remedy = remedyFor(request.agent, at, absolute, request.repo, request.root)
    if (remedy === null) alreadyRead.push(at)
    else {
      remedies.push(remedy)
      owed.push(absolute)
    }
  }
  if (remedies.length === 0) {
    return outcome(
      "read",
      `${required.length} document(s) are required reading for this path; all read in full since each last changed`,
      required
    )
  }
  const reported = remedies.slice(0, MAX_REPORTED)
  if (remedies.length > reported.length) {
    reported.push(
      `and ${remedies.length - reported.length} more, not listed — read the ones above first`
    )
  }
  return outcome(
    "missing",
    `${required.length} document(s) are required reading for this path; ${alreadyRead.length} read, ${remedies.length} not`,
    required,
    [
      lead(
        request.relPath,
        request.repo,
        alreadyRead,
        required.length,
        recordSaid(request.agent),
        request.root
      ),
      ...reported,
    ],
    owed
  )
}
