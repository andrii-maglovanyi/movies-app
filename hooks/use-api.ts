import { useReducer, useRef, useEffect } from "react";

export const FETCH_INIT = "RESET_DATA";
export const RESET_DATA = "SET_MOVIES";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case RESET_DATA:
      return {
        ...state,
        data: [],
        total: 0,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [...state.data, ...action.payload.results],
        total: action.payload.total_pages,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      throw new Error();
  }
};

function useApi(defaults = [], getApiCallback, queryParams) {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: [],
    total: 0,
    error: false,
  });
  const firstRun = useRef(true);
  const prevQuery = useRef();

  useEffect(() => {
    let didCancel = false;

    if (prevQuery.current !== queryParams.query) {
      dispatch({ type: RESET_DATA });
      prevQuery.current = queryParams.query;
    }

    if (firstRun.current) {
      dispatch({ type: FETCH_SUCCESS, payload: defaults });
      firstRun.current = false;
    } else {
      const loadData = async () => {
        try {
          dispatch({ type: FETCH_INIT });

          const data = await getApiCallback(queryParams);
          if (!didCancel) {
            dispatch({ type: FETCH_SUCCESS, payload: data });
          }
        } catch (e) {
          if (!didCancel) {
            dispatch({ type: FETCH_FAILURE });
          }
        }
      };

      loadData();
    }

    return () => {
      didCancel = true;
    };
  }, [getApiCallback, queryParams]);

  return { ...state };
}

export default useApi;
