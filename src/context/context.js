import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
const initialState = {
    contactList: [],
    syncEnabled: false
};

const initialContext = [{ ...initialState }, () => {}];

export const UserContext = React.createContext(initialContext);

/**
 * 
 * @constructor
 * @param {Object} state - Old State
 * @param {Object} update - object containing type and payload for updating state
 * 
 * @returns {Object} - updated state value
 */
const updater = (state, update) => {
    var toUpdate = {...state};
    switch (update.type) {
        
    }
    return toUpdate;
}

export function UserController(props) {
    const [userState, updateUser] = useReducer(updater, initialState);
    const value = useMemo(() => [userState, updateUser], [userState]);
    return (<UserContext.Provider value={value}>
            {props.children}
            </UserContext.Provider>);
  }
  
  UserController.propTypes = {
      children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node
      ]).isRequired
  };
  