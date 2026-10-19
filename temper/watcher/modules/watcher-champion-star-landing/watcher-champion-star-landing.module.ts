import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherChampionStarLanding = {
  id: "01a1565d-4f7b-7acf-a2e3-55263157c2ad",
  type: "page-type/module",
  slug: "watcher-champion-star-landing",
  definition:
    "the jump points and slotting the game gives each champion star, written onto that star's page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A star is read from the account-wide table the catalog add-on saves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A champion star page is reached by the `esoChampionSkillId` it states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page takes the jump points the game states where they differ from its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page takes whether the star is slottable where the game disagrees with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already agreeing with the capture is not written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page stating jump points the game does not state is reported and keeps its jump points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A captured star number no page states is reported rather than given a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a star's most points onto its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the pages read, the write and the reporter.",
    },
  ],
  createdAt: "2026-10-19T22:51:58.202Z",
  updatedAt: "2026-10-19T22:51:58.202Z",
} as const satisfies Module
