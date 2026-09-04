import { existsSync } from "node:fs"
import { join } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { answering, refused } from "@akasha/command-system/calling"
import { saidBy } from "@akasha/command-system/fault-saying"
import { addonsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { verifyHousing } from "@akasha/temper-upstream-data/housing-upstream-verify"
import { verifyMapData } from "@akasha/temper-upstream-data/map-data-upstream-verify"
import { verifyTreasure } from "@akasha/temper-upstream-data/treasure-upstream-verify"
import type { Ruling, UpstreamLibrary } from "@akasha/temper-upstream-data/upstream-libraries"
import {
  libraryNamed,
  SOURCES_OF,
  UPSTREAM_LIBRARIES,
} from "@akasha/temper-upstream-data/upstream-libraries"
import { verifyZone } from "@akasha/temper-upstream-data/zone-upstream-verify"

const DATA = 2
const FAILED = 3

const RULED_BY: Record<UpstreamLibrary, (addons: string) => Promise<Ruling>> = {
  housing: verifyHousing,
  "lib-map-data": verifyMapData,
  "lib-treasure": verifyTreasure,
  "lib-zone": verifyZone,
}

function missingUnder(addons: string, library: UpstreamLibrary): readonly string[] {
  return SOURCES_OF[library].filter((one) => !existsSync(join(addons, one)))
}

function whereUpstreamIs(): { readonly addons: string } | { readonly why: string } {
  try {
    return { addons: addonsDir() }
  } catch (thrown) {
    return { why: saidBy(thrown).replace(/\s+/g, " ").trim() }
  }
}

export async function temperUpstreamDataVerify(argv: readonly string[] = []): Promise<Answer> {
  const said = argv[0]
  const library = libraryNamed(said)
  if (library === undefined) {
    return refused(
      `${said === undefined ? "no library was named" : `\`${said}\` is no upstream library this rules on`}` +
        ` — name one of: ${UPSTREAM_LIBRARIES.join(", ")}`,
      DATA
    )
  }

  const where = whereUpstreamIs()
  if ("why" in where) {
    return refused(
      `${library} is ruled on against the upstream files a live ESO install carries, and no live directory was found — ${where.why}`,
      DATA
    )
  }

  const missing = missingUnder(where.addons, library)
  if (missing.length > 0) {
    return refused(
      `${where.addons} carries none of ${missing.join(", ")}, so there is no upstream here to rule ${library} against. ` +
        `A run over an absent upstream would report whatever a clean run reports, so it is refused rather than passed.`,
      DATA
    )
  }

  let ruling: Ruling
  try {
    ruling = await RULED_BY[library](where.addons)
  } catch (thrown) {
    return refused(
      `ruling on ${library} broke off before it could answer — ${saidBy(thrown).replace(/\s+/g, " ").trim()}`,
      FAILED
    )
  }

  const read = SOURCES_OF[library].map((one) => join(where.addons, one))
  const report = [...ruling.report, `read upstream from ${read.join(", ")}`]
  if (ruling.parted.length === 0) return answering(report, [], 0)
  return answering(report, [...ruling.parted, `${library} no longer matches upstream`], FAILED)
}
