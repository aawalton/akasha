import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gameArchive = {
  id: "01a0d48b-3062-7029-8e02-6e1aac487d1f",
  type: "page-type/module",
  slug: "game-archive",
  definition:
    "the files the game's client packs into its archive, each read by the path it is named by",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A manifest places each file in one of the data files its header lists.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The depot's manifest opens its tables with a certificate and a signature.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A manifest may record a file twice, and the later record is the one there now.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The names of the files are a file of their own inside the archive.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The client keeps its names apart under the first id, and the depot under the last.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name reaches only a file recorded with no group but the client's flag.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A data file the install left empty holds none of the files placed in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a data file does not hold answers nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the client's archive lacks is looked for in the depot's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The depot's archive is opened only once a path is looked for there.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The archive keeps a name in lower case with a leading slash.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every file an unsigned manifest places opens with a signature and a hash before its bytes.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A file a signed manifest places is stored bare.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The archive packs a file with zlib, with Oodle, or not at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller hands over what unpacks Oodle, so the reader holds no decoder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the archive does not name answers nothing rather than refusing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes into the game's install.",
    },
  ],
} as const satisfies Module
