import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const fights = {
  id: "01a15437-380d-7919-88d8-c794180aa539",
  type: "page-type/file-property",
  slug: "fights",
  propertySlug: "fights",
  definition: "the fights a character fought, one fight to a line, as the combat add-on wrote them",
  extensions: ["jsonl"],
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight the game's file holds lands once, however often the file is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight is named by when it was written and how long its combat ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight landed stays after the game's file lets that fight go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fight's log is one text of lines split by semicolons and fields split by colons.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A percent sign, colon or semicolon in a field is written as its percent code.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-19T12:51:07.404Z",
  updatedAt: "2026-10-19T12:51:07.404Z",
} as const satisfies FileProperty
