import { GuildHistoryCacheCategory } from "../histoire-category-class/histoire-category-class.module.code.ts"

GuildHistoryCacheCategory.GetKey = function (this) {
  return this.key
}

GuildHistoryCacheCategory.GetGuildId = function (this) {
  return this.guildId
}

GuildHistoryCacheCategory.GetCategory = function (this) {
  return this.category
}

GuildHistoryCacheCategory.IsFor = function (this, guildId, category) {
  return this.guildId === guildId && this.category === category
}

GuildHistoryCacheCategory.IsProcessing = function (this) {
  return this.processingTask != null || this.processingRequest != null
}

GuildHistoryCacheCategory.IsAggregated = function (this) {
  return false
}
