export function referralLinkGenerator({
  subscriberId,
  eventId,
}: { subscriberId: string; eventId: string }) {
  return `http://localhost:3333/event/${eventId}?ref=${subscriberId}`
}
