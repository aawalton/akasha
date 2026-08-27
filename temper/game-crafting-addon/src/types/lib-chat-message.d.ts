interface ChatProxy {
  Print(str: string | undefined): void
}

declare const LibChatMessage: ((longTag: string, shortTag: string) => ChatProxy) | undefined
