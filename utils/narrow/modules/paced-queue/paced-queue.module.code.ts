export type Paced = <T>(run: () => Promise<T>) => Promise<T>

export function pacedQueue(everyMs: number): Paced {
  let pending: Promise<void> = Promise.resolve()
  const wait = (): Promise<void> => new Promise((r) => setTimeout(r, everyMs))
  return <T>(run: () => Promise<T>): Promise<T> => {
    const result = pending.then(run)
    pending = result.then(wait, wait)
    return result
  }
}
