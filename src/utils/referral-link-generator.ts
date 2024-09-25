export function referralLinkGenerator() {
  return `https://www.eventbooster.com/?ref=${Math.random().toString(36).substring(2, 10).toUpperCase()}`
}
