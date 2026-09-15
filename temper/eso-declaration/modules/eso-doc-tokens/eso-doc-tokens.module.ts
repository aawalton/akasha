import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoDocTokens = {
  id: "01a0673e-3ddf-7001-acad-9b0751ef4567",
  type: "module",
  slug: "eso-doc-tokens",
  definition: "the functions, objects, events and enums a game documentation dump describes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The dump is divided into sections by its own headings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section heading the dump does not have leaves that section empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A documented type is answered as the matching TypeScript type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type the map does not name is answered unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a type may be written into a declaration is answered here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type the map names, a name, and a name or nothing may be written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Any other type is answered as a fault naming that type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The names this reads come from outside the repository, in a clone nobody here updates.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name is captured as a run of word characters, which admits a leading digit.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "Whether a name may be written into a declaration is answered, as it is for a type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An enum with no values is no enum.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An object states the object above rather than the objects below.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
