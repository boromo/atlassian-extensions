export function getLocallyStoredParticipant() {
  const storedParticipantsStr = localStorage.getItem('participants');

  if (storedParticipantsStr) {
    return JSON.parse(storedParticipantsStr) as Array<string>;
  }

  return [];
}
