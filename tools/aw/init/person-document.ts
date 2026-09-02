import { peopleStanding } from "../../lib/akasha-people.ts"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { pathsFor, SLUG_MARK, shapesStanding, standsShell } from "./document-shape.ts"

const PERSON_FALLBACK = `akasha/person-system/people/pages/${SLUG_MARK}.person.ts`

function personPaths(slugVar: string): readonly string[] {
  return pathsFor(
    shapesStanding(() => peopleStanding(ownRepoRoot()), PERSON_FALLBACK),
    slugVar
  )
}

export function personDocumentStandsShell(slugVar: string): string {
  return standsShell(personPaths(slugVar))
}
