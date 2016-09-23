const initialState = {
    isLoading: true,
    data: [],
    errorMessage: null,
    region: 'na'
}

export default function challengerList (state=initialState, action) {

    switch (action.type) {
        case 'ENABLE_LOADING_CHALLENGER':
            return Object.assign({}, state, {
                isLoading: true,
                data: initialState.data,
                errorMessage: null
            })
        case 'VALIDATED_SEARCH_CHALLENGER':
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data,
                errorMessage: null,
                region: action.region
            })
        case 'CAUGHT_ERROR_CHALLENGER':
            return Object.assign({}, state, {
                isLoading: false,
                data: initialState.data,
                errorMessage: action.errorMessage
            })
        default:
            return state;
    }
}
