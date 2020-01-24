import React, { useReducer, createContext } from 'react';
import useActions from './helpers/use-actions';

import Reducers, { initialState } from '../src/reducers/reducers';
import * as Actions from '../src/actions/actions';

const CreateProviderValue = (reducer, initialState, actions) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const boundActions = useActions(actions, dispatch);

  return { ...boundActions, ...state };
};

export const Context = createContext();

const StoreProvider = ({ children }) => (
  <Context.Provider
    value={CreateProviderValue(
      Reducers,
      initialState,
      Actions
    )}
  >
    { children }
  </Context.Provider>
);

export default StoreProvider;
