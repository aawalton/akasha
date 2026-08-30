import {
  numberAt,
  textAt,
  type Value,
  valueAt,
} from "../../akasha/pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfTypeAnswered,
  type Standing,
  standingAt,
} from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"
import { besideAt } from "../../akasha/pages-system/page/page-file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "../../akasha/pages-system/page/page-uncommitted/page-uncommitted.module.code.ts"

const PAGE_TYPE = "persona"

const PORTRAIT = "portrait"

const LAST_MESSAGED_AT = "lastMessagedAt"

export interface Persona {
  readonly id: string
  readonly slug: string
  readonly path: string
  readonly definition: string | null
  readonly purpose: string | null
  readonly portraitPath: string | null
  readonly roleSlug: string | null
  readonly valueSlug: string | null
  readonly origin: string | null
  readonly emailAddress: string | null
  readonly championedDomainSlug: string | null
  readonly greenDayPoints: number | null
  readonly history: string | null
  readonly voiceInstruction: string | null
  readonly voiceReferenceSha256: string | null
  readonly cover: string | null
}

function valueOf(root: string, path: string): Value {
  let held: Value | null
  try {
    held = valueAt(path, root)
  } catch (cause) {
    throw new Error(
      `${path} is a persona page and would not load, so who she is could not be read: ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  if (held === null) {
    throw new Error(`${path} is a persona page and answers to nothing a reader can take her from`)
  }
  return held
}

function portraitIn(path: string, value: Value): string | null {
  const held = textAt(value, PORTRAIT)
  if (held === null) return null
  const beside = besideAt(path, PORTRAIT, held)
  if (beside === null) {
    throw new Error(`${path} is a persona page and no portrait can stand beside a name like it`)
  }
  return beside
}

function personaFrom(root: string, standing: Standing): Persona {
  const value = valueOf(root, standing.path)
  const slug = textAt(value, "slug")
  if (slug === null) {
    throw new Error(`${standing.path} is a persona page and states no slug, so nothing names her`)
  }
  return {
    id: standing.id,
    slug,
    path: standing.path,
    definition: textAt(value, "definition"),
    purpose: textAt(value, "purpose"),
    portraitPath: portraitIn(standing.path, value),
    roleSlug: textAt(value, "roleSlug"),
    valueSlug: textAt(value, "valueSlug"),
    origin: textAt(value, "origin"),
    emailAddress: textAt(value, "emailAddress"),
    championedDomainSlug: textAt(value, "championedDomainSlug"),
    greenDayPoints: numberAt(value, "greenDayPoints"),
    history: textAt(value, "history"),
    voiceInstruction: textAt(value, "voiceInstruction"),
    voiceReferenceSha256: textAt(value, "voiceReferenceSha256"),
    cover: textAt(value, "cover"),
  }
}

export function personasStanding(root: string): readonly Persona[] {
  const found = everyOfTypeAnswered(root, PAGE_TYPE).map((standing) => personaFrom(root, standing))
  if (found.length === 0) {
    throw new Error(
      "no persona stands, so the cast would read as empty rather than as unread — an index that " +
        "names nobody is not a cast of nobody"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function personaAt(root: string, slug: string): Persona | null {
  const standing = standingAt(root, PAGE_TYPE, slug)[0]
  return standing === undefined ? null : personaFrom(root, standing)
}

export function personaOr(root: string, slug: string): Persona {
  const held = personaAt(root, slug)
  if (held === null) {
    throw new Error(`\`${slug}\` names no persona, so nothing answers for her`)
  }
  return held
}

export function lastMessagedAt(root: string, persona: Persona): string | null {
  const held = uncommittedIn(root, persona.path)
  return held === null ? null : textAt(held, LAST_MESSAGED_AT)
}
