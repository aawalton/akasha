import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const setTargetConfirmDialogDescription = {
  id: "01a0e2a6-39c9-786c-a19c-2db5728b39bc",
  type: "page-type/temper-web-phrase",
  slug: "set-target-confirm-dialog-description",
  title: "The target build for {name} has been manually edited. This will overwrite those changes.",
} as const satisfies TemperWebPhrase
