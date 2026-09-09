import { companionUrl } from "akasha/temper/build-support/build-url/build-url.module.code.ts"
import { z } from "zod"
import { buildHash } from "../../../formula-framework/branded-id/branded-id.module.code.ts"
import { importCompanionFromHash } from "../../.server/companion-import/companion-import.module.code.ts"

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { hash: string }
}): Promise<Response> {
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
