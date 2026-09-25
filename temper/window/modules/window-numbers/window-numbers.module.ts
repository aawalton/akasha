import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowNumbers = {
  id: "01a0d996-d947-7f7a-9cef-d94ae1b29570",
  type: "page-type/module",
  slug: "window-numbers",
  definition: "a number written out as a Temper window shows it in the game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A number reads in a Temper window as the web writes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is rounded to a whole number and grouped by thousands with commas.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gold is a count with a g after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure in a table column is compact, as the web's table writes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compact number below a thousand is the whole number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From a thousand it is thousands with a K, to one decimal below ten thousand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From a million it is millions with an M, to one decimal below ten million.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A percentage is a fraction written to two decimals with trailing zeros dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A decimal below one is written to four places with trailing zeros dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A span is minutes and seconds, with the hours before them from an hour up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A span measured in parts of a second is seconds to two decimals, then an s.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A span counted in days is days, hours and minutes, each with its letter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rate such as frames a second or a delay is a count with its unit after a space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rate or a span below zero is shown as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number inside one of the game's own windows keeps the game's way of writing it.",
    },
  ],
} as const satisfies Module
