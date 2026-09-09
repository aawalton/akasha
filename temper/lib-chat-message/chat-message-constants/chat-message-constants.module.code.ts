export const LIB_IDENTIFIER = "LibChatMessage"

export const TAG_FORMAT = "[%s]"
export const COLOR_FORMAT = "|c%s%s|r"
export const MESSAGE_TEMPLATE = "%s %s"

export const SYSTEM_TAG = string.format(
  TAG_FORMAT,
  GetString("SI_CHATCHANNELCATEGORIES", CHAT_CATEGORY_SYSTEM)
)

export const TIME_FORMAT_AUTO = "[%X]"
export const TIME_FORMAT_12 = "[%I:%M:%S %p]"
export const TIME_FORMAT_24 = "[%T]"
export const TIME_FORMATS = [TIME_FORMAT_AUTO, TIME_FORMAT_12, TIME_FORMAT_24]

export const TIME_FORMAT_MAPPING: Record<string, string> = {
  auto: TIME_FORMAT_AUTO,
  "12h": TIME_FORMAT_12,
  "24h": TIME_FORMAT_24,
}

export const REVERSE_TIME_FORMAT_MAPPING: Record<string, string> = {}
for (const [label, format] of pairs(TIME_FORMAT_MAPPING)) {
  REVERSE_TIME_FORMAT_MAPPING[format] = label
}

export const TAG_PREFIX_OFF = 1
export const TAG_PREFIX_LONG = 2
export const TAG_PREFIX_SHORT = 3

export const TIMESTAMP_INDEX = 1
export const MAX_HISTORY_LENGTH = 10000
export const TRIMMED_HISTORY_LENGTH = 9000

export const MAX_SAVE_DATA_LENGTH = 1999

export const UNKNOWN_LINK_TYPE = "unknown"
export const LINK_GMATCH_PATTERN = "||H(%d):(.-):(.-)||h(.-)||h"
