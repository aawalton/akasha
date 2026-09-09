import { characterUrl } from "akasha/temper/build-support/build-url/build-url.module.code.ts"
import { z } from "zod"
import {
  buildHash,
  esoCharacterId as toEsoCharacterId,
} from "../../../formula-framework/branded-id/branded-id.module.code.ts"
import { importCharacterFromHash } from "../../.server/character-import/character-import.module.code.ts"

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

  const redirect = (location: string): Response => {
    const headers = new Headers({ Location: location })
    for (const cookie of importHeaders.getSetCookie()) {
      headers.append("Set-Cookie", cookie)
    }
    return new Response(null, { status: 302, headers })
  }

  if ("error" in result) {
    if (result.error === "not-authenticated") {
      const returnUrl =
        esoCharacterId != null
          ? `/character-build/h/${hash}?eid=${esoCharacterId}`
          : `/character-build/h/${hash}`
      const redirectUrl = new URL("/sign-in", origin)
      redirectUrl.searchParams.set("next", returnUrl)
      return redirect(redirectUrl.toString())
    }
    const failureUrl = new URL("/character-builds", origin)
    failureUrl.searchParams.set("error", result.error)
    return redirect(failureUrl.toString())
  }

  const buildPath = characterUrl(result.buildId, result.buildName)
  return redirect(new URL(`${buildPath}?tab=character`, origin).toString())
}
