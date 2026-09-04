import type { Module } from "@akasha/code-system/module"

export const addonDownload = {
  id: "01a06069-b78f-70ea-813a-1ddfccad983a",
  pageTypeSlug: "module",
  slug: "addon-download",
  definition: "an ESOUI archive fetched, proved, unpacked and laid into the addons directory",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A download is proved against the checksum ESOUI states before being unpacked.",
    },
    {
      invariantKind: "departure",
      statement: "A checksum that does not match is refused rather than installed.",
    },
    {
      invariantKind: "departure",
      statement: "Only a folder the caller expected is laid down.",
    },
    {
      invariantKind: "departure",
      statement: "A folder being laid down is removed first so nothing old survives underneath.",
    },
    {
      invariantKind: "departure",
      statement: "The working directory is swept whether the install finished or threw.",
    },
  ],
} as const satisfies Module
