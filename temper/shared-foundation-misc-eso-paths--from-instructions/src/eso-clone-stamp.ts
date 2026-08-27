import { z } from "zod"

const DOC_HEADER_RE = /^h1\.\s+ESO UI Documentation for API Version\s+(\d+)\s*$/m

const STAMP_RE = /ESO-API-Version:\s*(\d+)/

const PROVENANCE_PREFIX = "Generated from the ~/esoui clone by "

const PROVENANCE_RE = new RegExp(`${PROVENANCE_PREFIX}(\\S+)`)

const ApiVersionSchema = z.coerce.number().int().positive()

const FirstCaptureSchema = z.unknown().transform((matched): string | null => {
  if (!Array.isArray(matched)) return null
  const captured: unknown = matched[1]
  return typeof captured === "string" && captured !== "" ? captured : null
})

function parseFirstCapture(re: RegExp, text: string): string | null {
  return FirstCaptureSchema.parse(re.exec(text))
}

const GeneratorPathSchema = z
  .string()
  .min(1)
  .refine((p) => !/\s/.test(p), {
    message: "an ESO generator's repo path must contain no whitespace",
  })

export function parseEsoDocApiVersion(docText: string): number {
  const captured = parseFirstCapture(DOC_HEADER_RE, docText)
  if (captured === null) {
    throw new Error(
      "ESOUIDocumentation.txt carries no `h1. ESO UI Documentation for API Version <n>` header — " +
        "the clone's version marker is the whole freshness signal, so a doc without it cannot be stamped from"
    )
  }
  return ApiVersionSchema.parse(captured)
}

export function esoCloneHeaderLines(
  generatorRepoPath: string,
  apiVersion: number
): readonly [string, string] {
  const path = GeneratorPathSchema.parse(generatorRepoPath)
  const version = ApiVersionSchema.parse(apiVersion)
  return [
    `${PROVENANCE_PREFIX}${path}`,
    `ESO-API-Version: ${version}  (source freshness marker; verified by check-eso-typings-fresh)`,
  ]
}

export function parseEsoCloneProvenance(fileText: string): string | null {
  return parseFirstCapture(PROVENANCE_RE, fileText)
}

export function parseStampedApiVersion(fileText: string): number | null {
  const captured = parseFirstCapture(STAMP_RE, fileText)
  if (captured === null) return null
  const parsed = ApiVersionSchema.safeParse(captured)
  return parsed.success ? parsed.data : null
}
