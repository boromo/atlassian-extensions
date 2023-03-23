import { getParticipants } from './actions';

export enum ActionNames {
  SET_PARTICIPANTS = 'SET_PARTICIPANTS',
  SELECT_PARTICIPANT = 'SELECT_PARTICIPANT',
  COLORIZE_ISSUES = 'COLORIZE_ISSUES',
}

export type SetParticipantsAction = {
  participants: Array<string>;
  type: ActionNames.SET_PARTICIPANTS;
};

export type SelectParticipantAction = {
  type: ActionNames.SELECT_PARTICIPANT;
  participantName: string;
};

export type ColorizeIssuesAction = {
  type: ActionNames.COLORIZE_ISSUES;
  colorizedIssues: boolean;
};

export type AppState = {
  participants: Array<string>;
  selectedParticipant: string;
  colorizedIssues: boolean;
};

export type Action = SetParticipantsAction | SelectParticipantAction | ColorizeIssuesAction;

export function reducer(state: AppState, action: Action) {
  const { type } = action;

  switch (type) {
    case ActionNames.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };
    case ActionNames.SELECT_PARTICIPANT:
      return {
        ...state,
        selectedParticipant: action.participantName,
      };

    case ActionNames.COLORIZE_ISSUES:
    return {
      ...state,
      colorizedIssues: action.colorizedIssues,
    };
    default:
      return state;
  }
}
