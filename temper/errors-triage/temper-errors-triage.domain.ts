import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperErrorsTriage = {
  id: "01a060cd-564e-7685-8e5f-1bf87cbf4467",
  type: "page-type/domain",
  slug: "temper-errors-triage",
  definition: "how an error the game reported is judged",
  parts: [
    "module/errors-collect",
    "module/errors-crash-signatures",
    "module/errors-liveness",
    "module/errors-saved-variables",
    "module/errors-triage",
    "module/errors-triage-gather",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An error is judged from the variables the addon saved rather than from the live game.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A judgement has the reason the judgement was reached.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Domain
