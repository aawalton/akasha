import { serviceNamed } from "../service-project.ts"

const GRAPH_SERVICE = "graph-service"

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export function graphOrigin(root: string): string {
  const port = serviceNamed(root, GRAPH_SERVICE).port
  if (port === null) {
    throw new Error(
      `graph: \`${GRAPH_SERVICE}\` states no \`port:\`, so nothing says where to ask it`
    )
  }
  return `http://localhost:${port}`
}

export function askingAt(origin: string): Fetcher {
  return (url, init) => {
    const asked = new URL(url)
    return fetch(new URL(`${asked.pathname}${asked.search}`, origin), init)
  }
}
