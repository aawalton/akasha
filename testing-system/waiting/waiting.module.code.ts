export async function until(said: () => boolean, waited = 10000): Promise<boolean> {
  const end = Date.now() + waited
  while (Date.now() < end && !said()) await Bun.sleep(20)
  return said()
}
