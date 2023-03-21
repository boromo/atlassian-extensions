import { DOMParticipants, DOMSelectParticipant, DOMTickets } from '../types';

const messagesFromReactAppListener = (
  msg: DOMParticipants | DOMTickets | DOMSelectParticipant,
  sender: chrome.runtime.MessageSender,
  sendResponse: <R>(response: R) => void
) => {
  console.log('[content.js]. Message received', msg);

  switch (msg.type) {
    case 'GET_DOM_PARTICIPANTS': {
      const candidates = Array.from(document.querySelectorAll('dd a[title*="assignee ="]')).map(
        (element) => element.innerHTML
      );

      sendResponse(candidates);
      break;
    }

    case 'SELECT_PARTICIPANT': {
      const participantName = msg.participant;

      const allParticipants = Array.from(document.querySelectorAll<HTMLAnchorElement>('dd a[title*="assignee ="]'));
      allParticipants.forEach((participant) => {
        if (participant.classList.contains('ghx-active')) {
          participant.click();
        }
      });
      const selectedParticipant = allParticipants.find((element) => {
        return element.innerHTML === participantName;
      });

      if (selectedParticipant) {
        selectedParticipant.click();
      }

      sendResponse(selectedParticipant ? participantName : undefined);
      break;
    }
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
