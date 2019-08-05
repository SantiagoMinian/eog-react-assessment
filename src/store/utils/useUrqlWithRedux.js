import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default (urqlHook, urqlHookParams, errorAction, dataAction) => {
  const [result] = urqlHook(urqlHookParams);
  const { fetching, data, error } = result;

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(errorAction(error.message));
      return;
    }
    if (!data) return;
    dispatch(dataAction(data));
  }, [dispatch, data, error, dataAction, errorAction]);

  return fetching;
};
