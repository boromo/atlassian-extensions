import * as React from 'react';
import styled from 'styled-components';
import { ActionNames, reducer } from '../state';
import { getParticipants, selectParticipant } from '../state/actions';
import Logo from '../assets/images/logo.png';

type StyledListItemProps = {
  selected?: boolean;
};
const StyledApp = styled.div`
  padding: 20px;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLogo = styled.img`
  background: white;
  padding: 3px 3px;
  margin-bottom: 12px;
  width: 30px;
  margin-left: 18px;
`;

const StyledListControls = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRefreshButton = styled.a`
  color: #5c5c5c;
  align-self: end;
  cursor: pointer;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 200px;
  margin-bottom: 20px;
`;

const StyledListItem = styled.li<StyledListItemProps>`
  font-size: 1rem;
  padding: 2px;
  list-style: ${({ selected = false }) => (selected ? 'circle' : 'none')};
`;

const StyledParticipant = styled.a`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function getLocallyStoredParticipant() {
  const storedParticipantsStr = localStorage.getItem('participants');

  if (storedParticipantsStr) {
    return JSON.parse(storedParticipantsStr) as Array<string>;
  }

  return [];
}

function areArrayValuesSame(a: Array<string>, b: Array<string>) {
  if (a.length !== b.length) return false;
  return JSON.stringify(a.slice().sort()) === JSON.stringify(b.slice().sort());
}

export function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    participants: getLocallyStoredParticipant(),
    selectedParticipant: '',
  });
  const { participants, selectedParticipant } = state;

  React.useEffect(() => {
    const localStorageParticipants = getLocallyStoredParticipant();

    if (!areArrayValuesSame(participants, localStorageParticipants)) {
      getParticipants(participants).then((res) => {
        dispatch({ type: ActionNames.SET_PARTICIPANTS, participants: res });
      });
    }
  }, []);

  const refreshHandler = () => {
    getParticipants(participants).then((res) => {
      dispatch({ type: ActionNames.SET_PARTICIPANTS, participants: res });
    });
  };

  const participantClickHandler = (participant) => {
    selectParticipant(participant).then(res => {
      console.log(res);
      dispatch({ type: ActionNames.SELECT_PARTICIPANT, participantName: participant });
    })
  };

  return (
    <StyledApp>
      <StyledHeader>
        <StyledLogo src={Logo} />
      </StyledHeader>
      <StyledList>
        <StyledUl>
          {participants.length ? (
            participants.map((participant) => (
              <StyledListItem selected={participant === selectedParticipant} key={participant}>
                <StyledParticipant
                  onClick={() => {
                    participantClickHandler(participant);
                  }}
                >
                  {participant}
                </StyledParticipant>
              </StyledListItem>
            ))
          ) : (
            <StyledListItem key="no-participants">No participants</StyledListItem>
          )}
        </StyledUl>
        <StyledListControls>
          <StyledRefreshButton onClick={() => refreshHandler()}>Refresh</StyledRefreshButton>
        </StyledListControls>
      </StyledList>
    </StyledApp>
  );
}
