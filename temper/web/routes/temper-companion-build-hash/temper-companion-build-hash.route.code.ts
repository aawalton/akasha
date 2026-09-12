import { redirectingWith } from "akasha/temper/build-support/import-redirect/import-redirect.module.code.ts"
import { companionUrl } from "akasha/temper/build-support/modules/build-url/build-url.module.code.ts"
import { buildHash } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { importCompanionFromHash } from "akasha/temper/web/.server/companion-import/companion-import.module.code.ts"
import { z } from "zod"

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

  if ("error" in result) {
    if (result.error === "not-authenticated") {
      const returnUrl = `/companion-build/h/${hash}`
      const redirectUrl = new URL("/sign-in", origin)
      redirectUrl.searchParams.set("next", returnUrl)
      return redirectingWith(importHeaders, redirectUrl.toString())
    }
    const failureUrl = new URL("/companion-builds", origin)
    failureUrl.searchParams.set("error", result.error)
    return redirectingWith(importHeaders, failureUrl.toString())
  }

  const buildPath = companionUrl(result.buildId, result.buildName)
  return redirectingWith(importHeaders, new URL(`${buildPath}?tab=companion`, origin).toString())
}
