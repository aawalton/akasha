import "akasha/temper/lib-chat-message/chat-message-public-api/chat-message-public-api.module.code.ts"

import { installFormatters } from "akasha/temper/lib-chat-message/chat-message-formatters/chat-message-formatters.module.code.ts"
import { registerLifecycle } from "akasha/temper/lib-chat-message/chat-message-lifecycle/chat-message-lifecycle.module.code.ts"
import { registerUnknownLinkString } from "akasha/temper/lib-chat-message/chat-message-strings/chat-message-strings.module.code.ts"
import { installChatProxy } from "akasha/temper/lib-chat-message/chat-proxy/chat-proxy.module.code.ts"

registerUnknownLinkString()
installFormatters()
installChatProxy()
registerLifecycle()
