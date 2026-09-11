import type { AppLoadContext } from "react-router"

const SITE_AT = "https://tempereso.com"

export type ResourceLoaderArgs = {
  request: Request
  url: URL
  params: Record<string, never>
  pattern: string
  context: AppLoadContext
}

export function loaderArgs(pathname: string): ResourceLoaderArgs {
  const url = new URL(`${SITE_AT}${pathname}`)
  return { request: new Request(url), url, params: {}, pattern: pathname, context: {} }
}
