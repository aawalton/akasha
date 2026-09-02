/**
 * Two guards holding a throw where it happened, so a failure fails alone.
 *
 * The addon data pipeline builds its writes before it awaits any of them: `generate.ts` puts the
 * twelve sections and the fourteen mapping generators into one array literal, each section states
 * its own writes as a second array literal, and every generator is called while those literals are
 * built. So a generator that throws is raised before its siblings are reached, and nothing after it
 * in either list is even constructed. One throw in the second of five files reported one of one.
 *
 * A throw held here becomes a rejected promise instead. `Promise.all` still fails the run, so
 * nothing is skipped quietly, but every healthy file is written and the failure names itself.
 */

function said(reason: unknown): string {
  return reason instanceof Error ? reason.message : String(reason)
}

/**
 * One file's source rendered inside the promise that writes it, rather than before it.
 */
export function rendered(
  w: (dir: string, name: string, source: string) => Promise<number>,
  dir: string,
  name: string,
  render: () => string
): Promise<number> {
  return Promise.resolve()
    .then(() => w(dir, name, render()))
    .catch((reason: unknown) => {
      throw new Error(`\`${name}\` was not written: ${said(reason)}`)
    })
}

/**
 * One section's write list, with a throw raised while that list is built left as a rejection.
 */
export function built<P, W>(
  name: string,
  build: (p: P, w: W) => readonly Promise<number>[],
  p: P,
  w: W
): readonly Promise<number>[] {
  try {
    return build(p, w)
  } catch (reason) {
    return [Promise.reject(new Error(`the \`${name}\` section wrote nothing: ${said(reason)}`))]
  }
}
