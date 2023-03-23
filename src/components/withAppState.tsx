import * as React from 'react';
import { Action, AppState } from '../state';

export interface AppContext {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

// eslint-disable-next-line no-null/no-null
export const AppContext = React.createContext<AppContext | null>(null);

export function withAppContext<P extends AppContext>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof AppContext>> {
  return (props: P) => {
    return <AppContext.Consumer>{(value) => value && <Component {...props} {...value} />}</AppContext.Consumer>;
  };
}
