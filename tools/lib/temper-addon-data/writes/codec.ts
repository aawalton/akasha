import { COMPANIONS_OUTPUT_DIR } from "../constants.ts"
import { generateCodecConstants } from "../generators/codec-constants.ts"
import { TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesCodec(
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR,
      "codec-constants.generated.ts",
      generateCodecConstants()
    ),
    w(COMPANIONS_OUTPUT_DIR, "codec-constants.generated.ts", generateCodecConstants()),
  ]
}
