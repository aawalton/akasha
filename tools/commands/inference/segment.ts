export const summary = "Matte an image's foreground from its background (BiRefNet/rembg) -> 8-bit alpha matte (+ optional cutout / flatten); writes an inference-run row"

import { segmentCommand, segmentHelp } from "../../lib/inference-segment.ts"
import "../../lib/command-entry.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = segmentHelp

export default segmentCommand
