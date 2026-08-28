export class OldGraphGone extends Error {}

export function oldGraphGone(what: string): never {
  throw new OldGraphGone(
    `\`${what}\` asked the old graph, which is gone. Its caller has not been migrated onto ` +
      `\`graph/ask.ts\` yet — see \`pages/finding/domain/graph-system/the-old-graph-is-stubs-nothing-removes.finding.md\`.`
  )
}

// A stub refuses when it is USED, never when it is imported: a module that throws on import
// takes down every module downstream of it, including ones that never asked for the missing
// thing, and names the wrong culprit. Where the old graph exported data rather than a
// function, this is what carries it — reading any key refuses, and so does asking which keys
// it has, because an empty record reads exactly like a full one that matched nothing.
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
