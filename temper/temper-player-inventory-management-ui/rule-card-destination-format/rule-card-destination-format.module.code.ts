export function formatDestination(destination: string): string {
  if (destination === "bank") return "Bank"
  if (destination === "house-storage") return "Housing Storage"
  if (destination === "guild-bank") return "Guild Bank"
  if (destination === "character-worn:by-priority") return "By Priority"
  if (destination === "companion-worn:by-priority") return "By Priority"
  if (destination.startsWith("character:")) return "Character"
  if (destination.startsWith("companion-worn:")) return "Companion"
  if (destination.startsWith("guild-bank:")) return destination.slice("guild-bank:".length)
  if (destination.startsWith("house-storage:")) return destination.slice("house-storage:".length)
  return destination
}
