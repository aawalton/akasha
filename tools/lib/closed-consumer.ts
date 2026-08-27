interface ErrorEmitter {
  readonly on: (event: "error", listener: (err: NodeJS.ErrnoException) => void) => unknown
}

export function isClosedConsumerWrite(err: unknown): boolean {
  return err instanceof Error && "code" in err && err.code === "EPIPE"
}

export function ignoreClosedConsumerWrites(streams: readonly ErrorEmitter[]): undefined {
  for (const stream of streams) {
    stream.on("error", (err) => {
      if (isClosedConsumerWrite(err)) return
      throw err
    })
  }
}
