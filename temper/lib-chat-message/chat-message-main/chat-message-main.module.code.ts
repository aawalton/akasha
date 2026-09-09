import "../chat-message-public-api/chat-message-public-api.module.code.ts"

import { installFormatters } from "../chat-message-formatters/chat-message-formatters.module.code.ts"
import { registerLifecycle } from "../chat-message-lifecycle/chat-message-lifecycle.module.code.ts"
import { registerUnknownLinkString } from "../chat-message-strings/chat-message-strings.module.code.ts"
import { installChatProxy } from "../chat-proxy/chat-proxy.module.code.ts"

registerUnknownLinkString()
installFormatters()
installChatProxy()
registerLifecycle()
