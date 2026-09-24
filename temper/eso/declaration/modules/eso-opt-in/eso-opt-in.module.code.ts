import { readFileSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { EsoOptIn } from "akasha/temper/eso/declaration/modules/eso-token-scope/eso-token-scope.module.code.ts"
import { z } from "zod"

const OPT_IN_LIST = "eso-opt-in-list"

const ESO_OPT_IN_SCHEMA = z.object({
  functions: z.array(z.string()),
  objects: z.array(z.string()),
  events: z.array(z.string()),
  enums: z.array(z.string()),
  excludeObjects: z.array(z.string()).optional(),
})

const MANIFEST_SLUG = "declared-tokens"

const TOKENS = "tokens"

const HELD = "json"

function manifestPathIn(root: string): string {
  const page = listedAt(root, OPT_IN_LIST, MANIFEST_SLUG)[0]
  const at = page === undefined ? null : besideAt(page.path, TOKENS, HELD)
  if (at === null) {
    throw new Error(
      `no \`${OPT_IN_LIST}\` is slugged \`${MANIFEST_SLUG}\`, so no token would be declared`
    )
  }
  return join(root, at)
}

const MANIFEST_PATH = manifestPathIn(akashaRoot())

function readOptIn(): EsoOptIn {
  const read: EsoOptIn = ESO_OPT_IN_SCHEMA.parse(JSON.parse(readFileSync(MANIFEST_PATH, "utf8")))
  if (read.functions.length === 0) {
    throw new Error(
      `${MANIFEST_PATH} names no function, so generating from it would declare an empty API ` +
        "rather than say the manifest went unread"
    )
  }
  return read
}

export const ESO_OPT_IN: EsoOptIn = readOptIn()
