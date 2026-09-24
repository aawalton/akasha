import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oodleDecoding = {
  id: "01a0d48b-6e99-759d-8f05-83f69d31d63a",
  type: "page-type/module",
  slug: "oodle-decoding",
  definition: "the decoder unpacking what the game's archive packs with Oodle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The decoder is ooz, an open decoder for Oodle, built on the workstation from source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The source is pinned by its hash, and a download that differs is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The decoder is built once and kept beside the art it unpacks.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Ooz is licensed under GPLv3, so the decoder is built locally rather than shipped.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The decoder writes up to 64 bytes past the size it is asked for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No test here builds the decoder.",
    },
  ],
} as const satisfies Module
