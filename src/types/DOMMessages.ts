export interface DOMParticipants {
  type: 'GET_DOM_PARTICIPANTS';
}

export interface DOMTickets {
  type: 'GET_DOM_TICKETS';
}

export interface DOMSelectParticipant {
  type: 'SELECT_PARTICIPANT';
  participant: string;
}

export type DOMMessage = DOMParticipants | DOMTickets | DOMSelectParticipant;
