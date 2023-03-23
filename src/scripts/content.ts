import { DOMParticipants, DOMSelectParticipant, DOMTickets, DOMColorizeIssues } from '../types';

const BACKGROUND_COLOR_OPACITY = '.5';
const SBUs = {
  'Vision-Care': `rgba(90,144,144,${BACKGROUND_COLOR_OPACITY})`,
  'MED-MyZEISS': `rgba(224,255,255,${BACKGROUND_COLOR_OPACITY})`,
  Enablement: `rgba(240,128,128,${BACKGROUND_COLOR_OPACITY})`,
  Meditec: `rgba(255,255,224,${BACKGROUND_COLOR_OPACITY})`,
  SMT: `rgba(222,184,135,${BACKGROUND_COLOR_OPACITY})`,
  RMS: `rgba(255,228,225,${BACKGROUND_COLOR_OPACITY})`,
  SPC: `rgba(255,165,0,${BACKGROUND_COLOR_OPACITY})`,
  'OEM-Solutions': `rgba(135,206,250,${BACKGROUND_COLOR_OPACITY})`,
};
const SBU_PREFIX = 'SBU:';
const SBU_TOOLTIP_SEPARATOR = ',';
const NONE_SBU = 'None';

function colorizeIssues(colorized: boolean) {
  const sbuElements = Array.from(document.querySelectorAll<HTMLElement>('.ghx-extra-field[data-tooltip*="SBU:"]'));

  sbuElements.forEach(sbuElement => {
    const tooltip = sbuElement.dataset.tooltip;

    if (tooltip) {
      const sbuList = tooltip
        .replace(SBU_PREFIX, '')
        .split(SBU_TOOLTIP_SEPARATOR)
        .reduce((list, currentSbu) => {
          if (currentSbu && currentSbu.indexOf(NONE_SBU) === -1) {
            list.push(currentSbu.trim());
          }
          return list;
        }, []);
      if (sbuList.length) {
        const lastSbu = sbuList[sbuList.length - 1];
        const color = SBUs[lastSbu];
        sbuElement.closest<HTMLElement>('.ghx-issue-content').style.backgroundColor = colorized ? color : 'initial';
      }
    }
  })
}

const messagesFromReactAppListener = (
  msg: DOMParticipants | DOMTickets | DOMSelectParticipant | DOMColorizeIssues,
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

    case 'COLORIZE_ISSUES': {
      const value = msg.colorizedIssues;
      colorizeIssues(value);
    }
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
