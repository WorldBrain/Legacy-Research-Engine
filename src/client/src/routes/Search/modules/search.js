import { Results } from './tempResults';

// ------------------------------------
// Constants
// ------------------------------------
export const START_SEARCH = 'START_SEARCH';
export const FINISH_SEARCH = 'FINISH_SEARCH';

// ------------------------------------
// Actions
// ------------------------------------ 
export const search = (query) => {
    return (dispatch, getState) => {
        dispatch({
            type: START_SEARCH
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch({
                    type: FINISH_SEARCH,
                    payload: Results
                });

                resolve();
            }, 500);
        });
    };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [START_SEARCH]: (state, action) => {
        return {
            results: [],
            isLoading: true
        };
    },

    [FINISH_SEARCH]: (state, action) => {
        return {
            results: action.payload,
            isLoading: false
        };
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    results: [],
    isLoading: false
};

export default function searchReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}