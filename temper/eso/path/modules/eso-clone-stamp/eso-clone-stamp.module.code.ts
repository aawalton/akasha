import { z } from "zod"

const DOC_HEADER = /^h1\.\s+ESO UI Documentation for API Version\s+(\d+)\s*$/m

const ApiVersion = z.coerce.number().int().positive()

const FirstCapture = z.unknown().transform((matched): string | null => {
  if (!Array.isArray(matched)) return null
  const captured: unknown = matched[1]
  return typeof captured === "string" && captured !== "" ? captured : null
})

function firstCaptureOf(re: RegExp, text: string): string | null {
  return FirstCapture.parse(re.exec(text))
}

export function parseEsoDocApiVersion(docText: string): number {
  const captured = firstCaptureOf(DOC_HEADER, docText)
  if (captured === null) {
    throw new Error(
      "ESOUIDocumentation.txt carries no `h1. ESO UI Documentation for API Version <n>` header, so the clone states no version to stamp from"
    )
  }
  return ApiVersion.parse(captured)
}
