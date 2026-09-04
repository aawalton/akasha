import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperBuildCodec = {
  id: "01a062e7-4dd4-7379-91b1-47690a52822a",
  pageTypeSlug: "workspace-package",
  slug: "temper-build-codec",
  definition:
    "packing a character build into text and reading one back at whichever update wrote it",
  manifest: "json",
  partSlugs: [
    "module/build-codec",
    "module/build-codec-indices",
    "module/build-codec-v48",
    "module/build-codec-v48-champion-points",
    "module/build-codec-v48-equipment",
    "module/build-codec-v48-skills",
    "module/build-codec-v49",
    "module/build-codec-v49-champion-points",
    "module/build-codec-v49-equipment",
    "module/build-codec-v49-skills",
    "module/build-codec-v50",
    "module/build-codec-v50-champion-points",
    "module/build-codec-v50-equipment",
    "module/build-codec-v50-skills",
    "module/build-codec-v51",
    "module/build-codec-v51-champion-points",
    "module/build-codec-v51-equipment",
    "module/build-codec-v51-skills",
    "module/build-codec-v52",
    "module/build-codec-v52-champion-points",
    "module/build-codec-v52-equipment",
    "module/build-codec-v52-skills",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An update that changed the layout has a codec of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Every past update stays readable and only the newest one is written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The first byte says the build is a character and the next byte says which update wrote the build.",
    },
    {
      invariantKind: "departure",
      statement: "A build whose first two bytes are not recognised is read as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The writer and the reader of one update take the bits in the one order.",
    },
  ],
} as const satisfies WorkspacePackage
