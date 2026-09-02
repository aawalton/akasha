import { personasStanding } from "../../lib/akasha-personas.ts"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { pathsFor, SLUG_MARK, shapesStanding, standsShell } from "./document-shape.ts"

const PERSONA_FALLBACK = `akasha/persona-system/persona/${SLUG_MARK}/${SLUG_MARK}.persona.ts`

function personaPaths(slugVar: string): readonly string[] {
  return pathsFor(
    shapesStanding(() => personasStanding(ownRepoRoot()), PERSONA_FALLBACK),
    slugVar
  )
}

export function personaDocumentStandsShell(slugVar: string): string {
  return standsShell(personaPaths(slugVar))
}

export function personaDocumentGateLines(fnName: string, slugVar: string): readonly string[] {
  const paths = personaPaths(slugVar)
  const place = paths[0] ?? `$_root/${PERSONA_FALLBACK.replaceAll(SLUG_MARK, `$${slugVar}`)}`
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
