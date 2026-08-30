import {
  textAt,
  type Value,
  valueAt,
} from "../../akasha/pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfTypeAnswered,
  type Standing,
  standingAt,
} from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"

const PAGE_TYPE = "person"

export interface Person {
  readonly id: string
  readonly slug: string
  readonly path: string
  readonly definition: string | null
  readonly answeredBy: string | null
  readonly phone: string | null
  readonly emailAddress: string | null
  readonly supabaseAuthUserId: string | null
}

function valueOf(root: string, path: string): Value {
  let held: Value | null
  try {
    held = valueAt(path, root)
  } catch (cause) {
    throw new Error(
      `${path} is a person page and would not load, so who they are could not be read: ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  if (held === null) {
    throw new Error(`${path} is a person page and answers to nothing a reader can take them from`)
  }
  return held
}

function personFrom(root: string, standing: Standing): Person {
  const value = valueOf(root, standing.path)
  const slug = textAt(value, "slug")
  if (slug === null) {
    throw new Error(`${standing.path} is a person page and states no slug, so nothing names them`)
  }
  return {
    id: standing.id,
    slug,
    path: standing.path,
    definition: textAt(value, "definition"),
    answeredBy: textAt(value, "answeredBy"),
    phone: textAt(value, "phone"),
    emailAddress: textAt(value, "emailAddress"),
    supabaseAuthUserId: textAt(value, "supabaseAuthUserId"),
  }
}

export function peopleStanding(root: string): readonly Person[] {
  const found = everyOfTypeAnswered(root, PAGE_TYPE).map((standing) => personFrom(root, standing))
  if (found.length === 0) {
    throw new Error(
      "no person stands, so the people would read as empty rather than as unread — an index that " +
        "names nobody is not a household of nobody"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function personAt(root: string, slug: string): Person | null {
  const standing = standingAt(root, PAGE_TYPE, slug)[0]
  return standing === undefined ? null : personFrom(root, standing)
}

export function personOr(root: string, slug: string): Person {
  const held = personAt(root, slug)
  if (held === null) {
    throw new Error(`\`${slug}\` names no person, so nobody stands there`)
  }
  return held
}

export function answeredByOf(root: string, slug: string): string | null {
  const held = personAt(root, slug)
  return held === null ? null : held.answeredBy
}
