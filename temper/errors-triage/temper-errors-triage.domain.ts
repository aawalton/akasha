import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperErrorsTriage = {
  id: "01a060cd-564e-7685-8e5f-1bf87cbf4467",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-errors-triage",
  definition: "how an error the game reported is judged",
  parts: [
    "module/errors-saved-variables",
    "module/errors-collect",
    "module/errors-crash-signatures",
    "module/errors-liveness",
    "module/errors-triage",
    "module/errors-triage-gather",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An error is judged from the variables the addon saved rather than from the live game.",
    },
    {
      invariantKind: "departure",
      statement: "A judgement has the reason the judgement was reached.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Domain
