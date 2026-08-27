import {
  DEFAULT_APP_SLUG,
  knownAppSlugs,
} from "../../alanwalton/mobile-cli/src/lib/apps.ts"
import type { HelpFlag } from "../ops/surface.ts"

export const KNOWN_APP_SLUGS: readonly string[] = knownAppSlugs()

export const KEYCHAIN_PASSWORD_ENV = "MACBOOK_KEYCHAIN_PASSWORD"

export const APP_FLAG: HelpFlag = {
  name: "--app",
  argLabel: "<slug>",
  valueShape: "token",
  default: DEFAULT_APP_SLUG,
  choices: KNOWN_APP_SLUGS,
  description:
    "Which app this command acts on. Defaults to alanwalton (Alan's app, the one cut daily), so the routine invocation needs no flag. An unknown slug is refused rather than defaulted, because falling back would build the wrong app and report success.",
}
