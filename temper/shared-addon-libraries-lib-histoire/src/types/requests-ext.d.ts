interface ZoGuildHistoryRequest {
  requestId: number
  guildId: number
  eventCategory: number
  newestTimeS?: number
  oldestTimeS?: number
  GetRequestId(this: ZoGuildHistoryRequest): number
  IsValid(this: ZoGuildHistoryRequest): boolean
  IsComplete(this: ZoGuildHistoryRequest): boolean
  IsRequestQueued(this: ZoGuildHistoryRequest): boolean
  RequestMoreEvents(this: ZoGuildHistoryRequest): number
}
interface ZoGuildHistoryRequestClass {
  New(
    this: ZoGuildHistoryRequestClass,
    guildId: number,
    category: number,
    newestTime: number | undefined,
    oldestTime: number | undefined
  ): ZoGuildHistoryRequest
}
declare const ZO_GuildHistoryRequest: ZoGuildHistoryRequestClass

declare function zo_removeCallLater(this: void, handle: number): void
