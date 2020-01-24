const useActions = (actions, dispatch) =>
  Object.entries(actions)
    .filter(([, action]) => action.constructor === Function)
    .reduce(
      (acc, [index, action]) => ({
        ...acc,
        [index]: (...args) => action(...args)(dispatch)
      }),
      {}
    );

export default useActions;
