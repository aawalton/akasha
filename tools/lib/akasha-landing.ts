import { landedMechanically } from "@akasha/command-system/asking"
import {
  type Outcome,
  whyRefused,
} from "../../akasha/command-system/gated-write/gated-write.module.code.ts"

// A program composes this body, so it lands without the checks and without owing a reading. The
// bytes go straight in: only the command line needed them written to a file first.
export function landMechanically(
  root: string,
  calledAs: string,
  relPath: string,
  body: string,
  message: string
): Outcome {
  const said = landedMechanically(
    root,
    calledAs,
    [{ path: relPath, body: new TextEncoder().encode(body) }],
    message
  )
  if (said.code === 0) return { kind: "written" }
  return { kind: "refused", detail: whyRefused(said.refusals.join("\n")) }
}
