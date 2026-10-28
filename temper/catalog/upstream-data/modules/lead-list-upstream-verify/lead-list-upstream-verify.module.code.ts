import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { LOCATIONS } from "akasha/temper/addon/pages/world/antiquities/modules/leads-locations/leads-locations.module.code.ts"
import { leadListRows } from "akasha/temper/catalog/upstream-data/modules/lead-list-upstream-port/lead-list-upstream-port.module.code.ts"
import {
  gathered,
  ruledOverValues,
} from "akasha/temper/catalog/upstream-data/modules/upstream-leaf-reading/upstream-leaf-reading.module.code.ts"
import type { Ruling } from "akasha/temper/catalog/upstream-data/modules/upstream-libraries/upstream-libraries.module.code.ts"
import { capturedCatalog } from "akasha/temper/catalog/world/temper-catalog-domain/modules/catalog-capture-reading/catalog-capture-reading.module.code.ts"

const CAPTURE = "antiquityLoreCatalog"

function capturedAntiquities(): readonly number[] | undefined {
  const captured = capturedCatalog(codeRoot(), CAPTURE)
  if (captured === undefined) return undefined
  return Object.keys(captured)
    .map(Number)
    .filter((id) => Number.isInteger(id))
}

function everyCapturedHasARow(): Ruling {
  const ids = capturedAntiquities()
  if (ids === undefined) {
    return {
      report: [],
      parted: [`no ${CAPTURE} capture has landed to rule the lead table against`],
    }
  }
  const missing = ids.filter((id) => LOCATIONS[id] === undefined).sort((one, other) => one - other)
  if (missing.length > 0) {
    return {
      report: [],
      parted: [`the lead table has no row for antiquities ${missing.join(", ")} the game names`],
    }
  }
  return {
    report: [`every one of the ${String(ids.length)} antiquities the game names has a row`],
    parted: [],
  }
}

export async function verifyLeadList(addons: string): Promise<Ruling> {
  return gathered([
    ruledOverValues("LOCATIONS", await leadListRows(addons), LOCATIONS),
    everyCapturedHasARow(),
  ])
}
