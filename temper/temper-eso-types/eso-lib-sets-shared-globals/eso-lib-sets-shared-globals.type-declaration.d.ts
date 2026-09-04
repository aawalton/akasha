interface ChatSystemHandle {
  StartTextEntry: (
    this: ChatSystemHandle,
    text: string,
    channel?: unknown,
    target?: unknown,
    keepOpenAfter?: boolean
  ) => void
}

declare const ZO_GetChatSystem: (this: void) => ChatSystemHandle
