const MOST = 60

export function shortened(said: string): string {
  return said.length > MOST ? `${said.slice(0, MOST)}…` : said
}
