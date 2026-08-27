
import { placeDirOf } from "../../../page/page-types.ts"

const PERSON = "person"

function personPaths(slugVar: string): readonly string[] {
  const dir = `$_root/${placeDirOf(PERSON)}`
  return [`${dir}/$${slugVar}.md`, `${dir}/$${slugVar}.${PERSON}.md`]
}

export function personDocumentStandsShell(slugVar: string): string {
  return personPaths(slugVar)
    .map((at) => `[ -f "${at}" ]`)
    .join(" || ")
}
