import * as React from 'react';
import { Form, Stack } from 'react-bootstrap';
import { ActionNames } from '../state';
import { colorizeIssues } from '../state/actions';
import { AppContext, withAppContext } from './withAppState';

function BacklogInt(props: AppContext) {
  const { dispatch, state } = props;
  const { colorizedIssues } = state;

  React.useEffect(() => {
    colorizeIssues(colorizedIssues);
  }, [colorizedIssues]);

  return (
    <Stack>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Global toggle to colorize the backlog"
        defaultChecked={colorizedIssues}
        onClick={() => {
          dispatch({ type: ActionNames.COLORIZE_ISSUES, colorizedIssues: !colorizedIssues })
        }}
      />
    </Stack>
  );
}

export const Backlog = withAppContext(BacklogInt);
