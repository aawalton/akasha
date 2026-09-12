import { readFileSync } from "node:fs"
import { join } from "node:path"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import type { EsoOptIn } from "akasha/temper/eso-declaration/eso-token-scope/eso-token-scope.module.code.ts"

const OPT_IN_LIST = "eso-opt-in-list"

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
  const read: EsoOptIn = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
  if (read.functions.length === 0) {
    throw new Error(
      `${MANIFEST_PATH} names no function, so generating from it would declare an empty API ` +
        "rather than say the manifest went unread"
    )
  }
  return read
}

export const ESO_OPT_IN: EsoOptIn = readOptIn()
