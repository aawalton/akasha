import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionRecord = {
  id: "01a0607a-9cbc-7c27-9e61-4050a73b66e7",
  type: "page-type/module",
  slug: "completion-record",
  definition: "the whole of what an account, character or companion has finished",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each completion's type is inferred from the zod schema this module's code holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The schema describes a completion body as the tree stores it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list the saved variables stored as an object numbered from one is read as an array.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying a key the schema does not declare is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character's reported stats are the character sheet's numbers as the game gave them, for each bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps each buff active when it was taken, by ability id and name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading may keep Escalating Fete's stacks and how long ago Fete last changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading of reported stats keeps the points spent on each champion star.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps the Ultimate and the Health the character held when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats may keep the Health held at the capture before the one kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps each skill on the bar held, as the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps each class passive bought, with its tooltip as the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps whether it was taken in the Archive, and the boons held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps whether the player was blocking and whether moving.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps the advanced stats the rotation reading takes, by metric.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading of reported stats keeps each advanced stat the game's sheet shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each such stat keeps the game's display format, flat value and percent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each such stat keeps the category and the name the game's panel shows it under.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A stat kept before the panel was walked keeps no category and no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading of reported stats keeps each number the character sheet shows that no stat holds.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A character keeps the add-on's last rotation reading and each bar's inputs to it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A character's bank visit date is still read, so an old record is not refused.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A reading may keep every passive's ability id at each rank, in rank order.",
    },
  ],
  createdAt: "2026-09-02T04:57:23.388Z",
  updatedAt: "2026-10-20T16:37:33.374Z",
} as const satisfies Module
