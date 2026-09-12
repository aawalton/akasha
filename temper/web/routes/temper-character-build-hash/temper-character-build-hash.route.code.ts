import { redirectingWith } from "akasha/temper/build-support/import-redirect/import-redirect.module.code.ts"
import { characterUrl } from "akasha/temper/build-support/modules/build-url/build-url.module.code.ts"
import {
  buildHash,
  esoCharacterId as toEsoCharacterId,
} from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { importCharacterFromHash } from "akasha/temper/web/.server/character-import/character-import.module.code.ts"
import { z } from "zod"

const BASE_URL_SCHEMA = z.string().optional()

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { hash: string }
}): Promise<Response> {
  const { hash } = params
  const url = new URL(request.url)
  const esoCharacterId = url.searchParams.get("eid") ?? undefined
  const origin = BASE_URL_SCHEMA.parse(process.env["BASE_URL"]) ?? url.origin

  const { result, headers: importHeaders } = await importCharacterFromHash(
    request,
    buildHash(hash),
    esoCharacterId != null ? toEsoCharacterId(esoCharacterId) : undefined
  )

  if ("error" in result) {
    if (result.error === "not-authenticated") {
      const returnUrl =
        esoCharacterId != null
          ? `/character-build/h/${hash}?eid=${esoCharacterId}`
          : `/character-build/h/${hash}`
      const redirectUrl = new URL("/sign-in", origin)
      redirectUrl.searchParams.set("next", returnUrl)
      return redirectingWith(importHeaders, redirectUrl.toString())
    }
    const failureUrl = new URL("/character-builds", origin)
    failureUrl.searchParams.set("error", result.error)
    return redirectingWith(importHeaders, failureUrl.toString())
  }

  const buildPath = characterUrl(result.buildId, result.buildName)
  return redirectingWith(importHeaders, new URL(`${buildPath}?tab=character`, origin).toString())
}
