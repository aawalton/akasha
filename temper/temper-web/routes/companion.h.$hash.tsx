import { companionUrl } from "@akasha/temper-build-support/build-url"
import { buildHash } from "@akasha/temper-formula-framework/branded-id"
import { z } from "zod"
import { importCompanionFromHash } from "../.server/companion-import/companion-import.module.code.ts"
import type { Route } from "./+types/companion.h.$hash"

export async function loader({ request, params }: Route.LoaderArgs): Promise<Response> {
  const { hash } = params
  const baseUrl = z.string().optional().parse(process.env["BASE_URL"])
  const origin = baseUrl ?? new URL(request.url).origin

  const { result, headers: importHeaders } = await importCompanionFromHash(request, buildHash(hash))

  const redirect = (location: string): Response => {
    const headers = new Headers({ Location: location })
    for (const cookie of importHeaders.getSetCookie()) {
      headers.append("Set-Cookie", cookie)
    }
    return new Response(null, { status: 302, headers })
  }

  if ("error" in result) {
    if (result.error === "not-authenticated") {
      const returnUrl = `/companion-build/h/${hash}`
      const redirectUrl = new URL("/sign-in", origin)
      redirectUrl.searchParams.set("next", returnUrl)
      return redirect(redirectUrl.toString())
    }
    const failureUrl = new URL("/companion-builds", origin)
    failureUrl.searchParams.set("error", result.error)
    return redirect(failureUrl.toString())
  }

  const buildPath = companionUrl(result.buildId, result.buildName)
  return redirect(new URL(`${buildPath}?tab=companion`, origin).toString())
}
