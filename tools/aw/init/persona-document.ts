
import { personasStanding } from "../../lib/akasha-personas.ts"
import { ownRepoRoot } from "../../../repo/roots/roots.ts"

const PERSONA_HOME = "akasha/persona-system/persona"

const PERSONA_ENDING = ".persona.ts"

const SLUG_MARK = "<slug>"

function shapeOf(path: string, slug: string): string {
  const parts = path.split("/")
  return parts
    .map((part, at) => {
      if (at < parts.length - 2) return part
      if (part === slug) return SLUG_MARK
      if (part.startsWith(`${slug}.`)) return `${SLUG_MARK}${part.slice(slug.length)}`
      return part
    })
    .join("/")
}

function shapesStanding(): readonly string[] {
  try {
    const held = personasStanding(ownRepoRoot()).map((one) => shapeOf(one.path, one.slug))
    return [...new Set(held)].sort()
  } catch {
    return [`${PERSONA_HOME}/${SLUG_MARK}/${SLUG_MARK}${PERSONA_ENDING}`]
  }
}

function personaPaths(slugVar: string): readonly string[] {
  return shapesStanding().map((shape) => `$_root/${shape.replaceAll(SLUG_MARK, `$${slugVar}`)}`)
}

export function personaDocumentStandsShell(slugVar: string): string {
  return personaPaths(slugVar)
    .map((at) => `[ -f "${at}" ]`)
    .join(" || ")
}

export function personaDocumentGateLines(fnName: string, slugVar: string): readonly string[] {
  const paths = personaPaths(slugVar)
  const place = paths[0] ?? `$_root/${PERSONA_HOME}/$${slugVar}/$${slugVar}${PERSONA_ENDING}`
  const missing = paths.map((at) => `[ ! -f "${at}" ]`).join(" && ")
  return [
    `  if ${missing}; then`,
    `    echo "${fnName}: '$${slugVar}' has no persona document — ${place} ` +
      `is not there. A project-bound seat has none by design, and a persona whose document ` +
      `has not migrated to the clean tree has none yet; either way there is no identity to seat ` +
      `and a fresh session cannot reseed one. To resume an existing session: sr $name" >&2`,
    "    return 1",
    "  fi",
  ]
}
