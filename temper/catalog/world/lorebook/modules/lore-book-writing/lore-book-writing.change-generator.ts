import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const loreBookWriting = {
  id: "01a0d622-edc7-7a42-bc14-d224c5e0b4ed",
  type: "page-type/change-generator",
  slug: "lore-book-writing",
  definition: "the lore book tables the add-ons read, written again from the lore book pages",
  code: "ts",
  runsAfter: ["change-generator/value-minting"],
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore book table is written by a machine rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lore book and lore collection pages are the side the tables are read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tables are worked out again only where a lore book or collection page moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table is written into the modules its parts already have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table needing more parts than its modules is left as it is, and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page and body is read through the change rather than off the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module already with the body that would be written again is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies ChangeGenerator
