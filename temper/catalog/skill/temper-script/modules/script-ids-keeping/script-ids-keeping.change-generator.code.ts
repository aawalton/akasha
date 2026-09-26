import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/temper-affix-script.page-type.ts"
import { temperFocusScript } from "akasha/temper/catalog/skill/temper-focus-script/temper-focus-script.page-type.ts"
import { temperSignatureScript } from "akasha/temper/catalog/skill/temper-signature-script/temper-signature-script.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

function every(): boolean {
  return true
}

const KEEPING: Keeping = {
  at: "temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts",
  pageTypeSlug: temperFocusScript.slug,
  from: "script pages",
  unions: [
    { name: "FocusScriptId", holds: every, pageTypeSlug: temperFocusScript.slug },
    { name: "SignatureScriptId", holds: every, pageTypeSlug: temperSignatureScript.slug },
    { name: "AffixScriptId", holds: every, pageTypeSlug: temperAffixScript.slug },
  ],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
