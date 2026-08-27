
import { basename, dirname } from "node:path"
import { readSubject } from "../../lib/subjects.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import { placeDirOf } from "../../../page/page-types.ts"

const PERSONA = "persona"

function personaDirs(): readonly string[] {
  const wherever = [`$_root/${placeDirOf(PERSONA)}`]
  try {
    const roots = resolveRoots()
    const reading = readSubject(roots.instructions, "personas")
    const under =
      reading.root === roots.instructions ? "$_root" : `$_root/../${basename(reading.root)}`
    const held = new Set(reading.records.map((one) => `${under}/${dirname(one.path)}`))
    return [...held, ...wherever]
  } catch {
    return wherever
  }
}

function personaPaths(slugVar: string): readonly string[] {
  const named = [`$${slugVar}.md`, `$${slugVar}.${PERSONA}.md`]
  return personaDirs().flatMap((dir) => named.map((name) => `${dir}/${name}`))
}

export function personaDocumentStandsShell(slugVar: string): string {
  return personaPaths(slugVar)
    .map((at) => `[ -f "${at}" ]`)
    .join(" || ")
}

export function personaDocumentGateLines(fnName: string, slugVar: string): readonly string[] {
  const place = personaDirs()[0] ?? `$_root/${placeDirOf(PERSONA)}`
  const missing = personaPaths(slugVar)
    .map((at) => `[ ! -f "${at}" ]`)
    .join(" && ")
  return [
    `  if ${missing}; then`,
    `    echo "${fnName}: '$${slugVar}' has no persona document — ${place}/$${slugVar}.${PERSONA}.md ` +
      `is not there. A project-bound seat has none by design, and a persona whose document ` +
      `has not migrated to the clean tree has none yet; either way there is no identity to seat ` +
      `and a fresh session cannot reseed one. To resume an existing session: sr $name" >&2`,
    "    return 1",
    "  fi",
  ]
}
