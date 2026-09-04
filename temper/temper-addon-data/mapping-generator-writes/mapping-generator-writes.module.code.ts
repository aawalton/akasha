import { TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR } from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import type { AddonDataWrite } from "../addon-data-writes/addon-data-writes.module.code.ts"
import { writeToDisk } from "../addon-data-writes/addon-data-writes.module.code.ts"
import { rendered } from "../failing-alone/failing-alone.module.code.ts"
import { MAPPING_RENDERS } from "../mapping-renders/mapping-renders.module.code.ts"

export function buildMappingGeneratorWrites(
  w: AddonDataWrite = writeToDisk
): readonly Promise<number>[] {
  const writes: Promise<number>[] = []
  for (const one of MAPPING_RENDERS) {
    writes.push(rendered(w, TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR, one.rendered, one.render))
  }
  return writes
}
