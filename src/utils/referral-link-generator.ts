export function referralLinkGenerator({
  subscriberId,
}: { subscriberId: string }) {
  return `https://www.eventbooster.com/?ref=${subscriberId}`
}
