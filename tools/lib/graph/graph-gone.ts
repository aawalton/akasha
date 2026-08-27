export class OldGraphGone extends Error {}

export function oldGraphGone(what: string): never {
  throw new OldGraphGone(
    `\`${what}\` asked the old graph, which is gone. Its caller has not been migrated onto ` +
      `\`graph/ask.ts\` yet — see \`pages/initiative/vera-graph-system.initiative.md\`.`
  )
}
