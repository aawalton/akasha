import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const useImportErrorToastNoAccount = {
  id: "01a0e2ad-4ca2-772c-bad6-22c8c1e6b8b5",
  type: "page-type/temper-web-phrase",
  slug: "use-import-error-toast-no-account",
  title: "Your sign-in has no Temper account yet, so the build has nowhere to go.",
} as const satisfies TemperWebPhrase
