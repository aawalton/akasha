import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const text = {
  id: "01a049e9-651c-7003-82de-a9ff0562dea5",
  type: "page-type/domain",
  slug: "text",
  definition: "the text an agent reads",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "text" },
    { partOfSpeech: "part-of-speech/noun", spelling: "texts" },
  ],
  parts: ["domain/quote", "domain/text-writing", "module/one-line"],
} as const satisfies Domain
