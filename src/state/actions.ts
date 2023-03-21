import { DOMMessage } from '../types';

function sendMessageToTab(cb: (tabs: Array<chrome.tabs.Tab>) => void) {
  chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, cb);
}

export async function getParticipants(current: Array<string>) {
  return new Promise<Array<string>>((resolve, reject) => {
    sendMessageToTab((tabs) => {
      chrome.tabs.sendMessage<DOMMessage, Array<string>>(
        tabs[0].id || 0,
        { type: 'GET_DOM_PARTICIPANTS' },
        (response) => {
          const randomized = response.slice().sort(() => Math.random() - 0.5);
          localStorage.setItem('participants', JSON.stringify(randomized));
          resolve(randomized);
        }
      );
    });
  });
}

export async function selectParticipant(selectedParticipant: string) {
  return new Promise<string>((resolve, reject) => {
    sendMessageToTab((tabs) => {
      chrome.tabs.sendMessage<DOMMessage, string | undefined>(
        tabs[0].id || 0,
        { type: 'SELECT_PARTICIPANT', participant: selectedParticipant },
        (response) => {
          if (response) {
            resolve(response);
          } else {
            console.log('failed to select');
          }
        }
      );
    });
  })
}
