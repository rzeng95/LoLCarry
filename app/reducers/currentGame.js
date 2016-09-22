const initialState = {
    isLoading: true,
    data: [],
    errorMessage: null
}

export default function currentGame (state=initialState, action) {

    switch (action.type) {
        case 'ENABLE_LOADING':
            return Object.assign({}, state, {
                isLoading: true,
                data: [],
                errorMessage: null
            })
        case 'VALIDATED_SEARCH':
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data,
                errorMessage: null
            })
        case 'CAUGHT_ERROR':
            return Object.assign({}, state, {
                isLoading: false,
                data: null,
                errorMessage: action.errorMessage
            })
        default:
            return state;
    }
}
