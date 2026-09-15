import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const type = {
  id: "01a049e9-651c-7006-896c-2bffa71e2d0a",
  type: "domain",
  slug: "type",
  definition: "the shape a value must have",
  parts: ["domain/type-import"],
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A type is gone by the time the code runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page satisfies its type rather than being annotated with that type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type's TypeScript type is declared in the page type file.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A page of the wrong shape does not compile.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A limit no type can have is enforced by a check.",
    },
  ],
} as const satisfies Domain
