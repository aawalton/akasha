import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherUploadRetry = {
  id: "01a0633f-8d1e-708b-a8d1-f73b5552b672",
  type: "module",
  slug: "watcher-upload-retry",
  definition: "how an upload the server broke off is tried again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a statement timeout or a gateway failure is tried again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything else thrown reaches the caller on the first attempt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ceiling on the delay doubles with each attempt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ceiling on the delay never rises above the longest delay allowed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A delay is drawn at random from below its ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The final attempt throws rather than delaying again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here names the upload's contents.",
    },
  ],
} as const satisfies Module
