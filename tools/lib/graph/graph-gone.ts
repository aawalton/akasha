export class OldGraphGone extends Error {}

export function oldGraphGone(what: string): never {
  throw new OldGraphGone(
    `\`${what}\` asked the old graph, which is gone. Its caller has not been migrated onto ` +
      `\`graph/ask.ts\` yet — see \`pages/finding/graph-system/the-old-graph-is-stubs-nothing-removes.finding.md\`.`
  )
}

export function goneRecord(what: string): never {
  return new Proxy(
    {},
    {
      get: (_at, key) => oldGraphGone(`${what}.${String(key)}`),
      has: () => oldGraphGone(`${what} membership`),
      ownKeys: () => oldGraphGone(`${what} keys`),
    }
  ) as never
}
