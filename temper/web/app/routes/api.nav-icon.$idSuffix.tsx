import { getPageByIdSuffix } from "@shared/pages-access/get"
import { PageTypeSlug } from "@shared/pages-url"
import { createServerClient } from "@shared/supabase-rr/server"
import { buildNavIconSvg } from "@/lib/nav-icon-svg"
import type { Route } from "./+types/api.nav-icon.$idSuffix"

const NAV_SLUG = PageTypeSlug("nav")

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const idSuffix = params.idSuffix

  const { headers } = createServerClient(request)
  const page = await getPageByIdSuffix({
    pageTypeSlug: NAV_SLUG,
    idSuffix,
    select: ["id", "icon"],
  })

  const iconName = page && typeof page.icon === "string" ? page.icon : null
  const svg = await buildNavIconSvg(iconName)

  headers.set("Content-Type", "image/svg+xml; charset=utf-8")
  headers.set("Cache-Control", "private, max-age=300")
  return new Response(svg, { headers })
}
