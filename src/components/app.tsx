import * as React from 'react';
import styled from 'styled-components';
import Logo from '../assets/images/logo.png';
import { Tab, Tabs } from 'react-bootstrap';
import { Participants } from './participants';
import { AppContext } from './withAppState';
import { reducer } from '../state';
import { getLocallyStoredParticipant } from '../helpers';
import { Backlog } from './backlog';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledApp = styled.div`
  padding: 20px;
  min-width: 300px;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLogo = styled.img`
  background: white;
  padding: 3px 3px;
  margin-bottom: 12px;
  width: 30px;
  margin-left: 18px;
`;

export function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    participants: getLocallyStoredParticipant(),
    selectedParticipant: '',
    colorizedIssues: false,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <StyledApp>
        <StyledHeader>
          <StyledLogo src={Logo} />
        </StyledHeader>
        <Tabs defaultActiveKey="dailies" id="fill-tab-example" className="mb-3" fill>
          <Tab eventKey="dailies" title="Daily" >
            <Participants />
          </Tab>
          <Tab eventKey="backlog" title="Backlog">
            <Backlog />
          </Tab>
        </Tabs>
      </StyledApp>
    </AppContext.Provider>
  );
}
