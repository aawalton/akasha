import type { Module } from "@akasha/code-system/module"

export const addonDataPageRows = {
  id: "01a06369-1e85-7152-9783-da4cf82f3bb7",
  pageTypeSlug: "module",
  slug: "addon-data-page-rows",
  definition: "every row of one page type, shaped as the generators read a page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is asked of the store rather than read off a page's file.",
    },
    {
      invariantKind: "departure",
      statement: "A row's keys are answered in camel whatever spelling its page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries its page type's slug under `pageTypeSlug`.",
    },
    {
      invariantKind: "departure",
      statement: "A narrowed question asks for the four carried keys beside the keys named.",
    },
    {
      invariantKind: "departure",
      statement: "A page type answering fewer rows than it counts is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose value arrives as JSON text is named here.",
    },
    {
      invariantKind: "departure",
      statement: "`temper-skill` `description` is the one property named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `temper-skill` generator declares `description: z.string()` and not that the text is JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A value under no property named here is carried as the store answers the value.",
    },
    {
      invariantKind: "departure",
      statement: "A JSON text no parse reads is refused rather than rendered as its text.",
    },
    {
      invariantKind: "absence",
      statement: "No page type's declared types are asked of a type engine here.",
    },
    {
      invariantKind: "gap",
      statement:
        "A property newly answered as JSON text renders as text until that property is named here.",
    },
  ],
} as const satisfies Module
