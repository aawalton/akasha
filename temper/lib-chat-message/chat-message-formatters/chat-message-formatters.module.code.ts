import {
  getFormattedTime,
  getTimeStampForEvent,
  storeChatEvent,
} from "../chat-history/chat-history.module.code.ts"
import { customLinkFormatter } from "../chat-links/chat-links.module.code.ts"
import type { GlobalTable } from "../chat-message-casts/chat-message-casts.module.code.ts"

import {
  LIB_IDENTIFIER,
  MESSAGE_TEMPLATE,
  SYSTEM_TAG,
  TAG_PREFIX_OFF,
} from "../chat-message-constants/chat-message-constants.module.code.ts"
import { LIB } from "../chat-message-lib/chat-message-lib.module.code.ts"

type PostHook = (
  this: void,
  formattedEventText: unknown,
  targetChannel: unknown,
  fromDisplayName: unknown,
  rawMessageText: unknown,
  timeStamp: number
) => LuaMultiReturn<unknown[]>

type PreHook = (this: void, ...args: unknown[]) => unknown[]

const messageFormatters = CHAT_ROUTER.GetRegisteredMessageFormatters()

const NEW_FORMATTER: ChatFormatterTable = {}

function applyTimeAndTagPrefix(
  this: void,
  formattedEventText: unknown,
  targetChannel: unknown,
  fromDisplayName: unknown,
  rawMessageText: unknown,
  timeStamp: number
): LuaMultiReturn<unknown[]> {
  let text = formattedEventText
  if (text !== undefined) {
    const tagMode = LIB.settings?.tagPrefixMode
    if (tagMode !== undefined && tagMode !== TAG_PREFIX_OFF) {
      text = string.format(MESSAGE_TEMPLATE, SYSTEM_TAG, text as string)
    }
    if (LIB.settings?.timePrefixEnabled === true) {
      text = string.format(MESSAGE_TEMPLATE, getFormattedTime(timeStamp), text as string)
    }
  }
  return $multi(text, targetChannel, fromDisplayName, rawMessageText)
}

function dummyPreHook(this: void, ...args: unknown[]): unknown[] {
  return args
}

function postHookFormatter(
  this: void,
  eventType: string | number,
  postHook: PostHook,
  preHook?: PreHook
): undefined {
  const pre = preHook ?? dummyPreHook
  NEW_FORMATTER[eventType] = (...args: unknown[]): LuaMultiReturn<unknown[]> => {
    const [timeStamp, isRestoring] = getTimeStampForEvent()
    if (!isRestoring) {
      storeChatEvent(timeStamp, eventType, ...args)
    }
    const originalFormatter = messageFormatters[eventType]
    if (originalFormatter === undefined) {
      error(string.format("No formatter registered for chat event %s", tostring(eventType)))
    }
    const [formattedEventText, targetChannel, fromDisplayName, rawMessageText] = originalFormatter(
      ...pre(...args)
    )
    return postHook(formattedEventText, targetChannel, fromDisplayName, rawMessageText, timeStamp)
  }
}

export function installFormatters(this: void): undefined {
  setmetatable(NEW_FORMATTER, {
    __index: (_table: ChatFormatterTable, key: string | number): ChatMessageFormatter | undefined =>
      messageFormatters[key],
  })

  ZO_PreHook(
    CHAT_ROUTER,
    "FormatAndAddChatMessage",
    function (this: void, self: unknown): undefined {
      if (IsChatSystemAvailableForCurrentPlatform()) {
        ;(self as GlobalTable).registeredMessageFormatters = NEW_FORMATTER
      }
      return undefined
    }
  )
  SecurePostHook(
    CHAT_ROUTER,
    "FormatAndAddChatMessage",
    function (this: void, self: ChatRouter): undefined {
      self.registeredMessageFormatters = messageFormatters
    }
  )

  postHookFormatter(
    EVENT_CHAT_MESSAGE_CHANNEL,
    function (
      this: void,
      formattedEventText: unknown,
      targetChannel: unknown,
      fromDisplayName: unknown,
      rawMessageText: unknown,
      timeStamp: number
    ): LuaMultiReturn<unknown[]> {
      let text = formattedEventText
      const settings = LIB.settings
      if (
        text !== undefined &&
        settings?.timePrefixEnabled === true &&
        settings.timePrefixOnRegularChat
      ) {
        text = string.format(MESSAGE_TEMPLATE, getFormattedTime(timeStamp), text as string)
      }
      return $multi(text, targetChannel, fromDisplayName, rawMessageText)
    },
    customLinkFormatter
  )

  postHookFormatter(
    EVENT_BROADCAST,
    function (
      this: void,
      formattedEventText: unknown,
      targetChannel: unknown,
      fromDisplayName: unknown,
      rawMessageText: unknown,
      timeStamp: number
    ): LuaMultiReturn<unknown[]> {
      let text = formattedEventText
      const settings = LIB.settings
      if (text !== undefined && settings?.timePrefixEnabled === true) {
        if (settings.tagPrefixMode === TAG_PREFIX_OFF) {
          const [stripped] = string.gsub(text as string, "%[.-%] ", "")
          text = stripped
        }
        text = string.format(MESSAGE_TEMPLATE, getFormattedTime(timeStamp), text as string)
      }
      return $multi(text, targetChannel, fromDisplayName, rawMessageText)
    }
  )

  postHookFormatter(EVENT_FRIEND_PLAYER_STATUS_CHANGED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_IGNORE_ADDED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_IGNORE_REMOVED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_GROUP_TYPE_CHANGED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_GROUP_INVITE_RESPONSE, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_SOCIAL_ERROR, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_TRIAL_FEATURE_RESTRICTED, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_GROUP_MEMBER_LEFT, applyTimeAndTagPrefix)
  postHookFormatter(EVENT_BATTLEGROUND_INACTIVITY_WARNING, applyTimeAndTagPrefix)

  const [, simpleEventToCategoryMappings] = ZO_ChatSystem_GetEventCategoryMappings()
  simpleEventToCategoryMappings[LIB_IDENTIFIER] = CHAT_CATEGORY_SYSTEM
  CHAT_ROUTER.RegisterMessageFormatter(
    LIB_IDENTIFIER,
    function (this: void, ...args: unknown[]): LuaMultiReturn<unknown[]> {
      const tag = args[0]
      const rawMessageText = args[1]
      const [timeStamp, isRestoring] = getTimeStampForEvent()
      if (!isRestoring) {
        storeChatEvent(timeStamp, LIB_IDENTIFIER, tag, rawMessageText)
      }

      let formattedEventText: unknown = rawMessageText
      const tagMode = LIB.settings?.tagPrefixMode
      if (tagMode !== undefined && tagMode !== TAG_PREFIX_OFF) {
        formattedEventText = string.format(
          MESSAGE_TEMPLATE,
          tag as string,
          formattedEventText as string
        )
      }
      if (LIB.settings?.timePrefixEnabled === true) {
        formattedEventText = string.format(
          MESSAGE_TEMPLATE,
          getFormattedTime(timeStamp),
          formattedEventText as string
        )
      }
      return $multi(formattedEventText, undefined, tag, rawMessageText)
    }
  )
}
