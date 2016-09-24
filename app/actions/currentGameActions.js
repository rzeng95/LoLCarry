import axios from 'axios';


export const enableLoadingAction = () => {
    return {
        type: 'ENABLE_LOADING_CURRENTGAME'
    }
}

// add "isValidInput" action

// add "request data" action

export const searchForCurrentGameAction = (region, name) => dispatch => {

    dispatch(enableLoadingAction());

    axios.get(`/api/getCurrentGame/${region}/${name}`)
        .then( res => {
            if (res.status === 200) {
                dispatch(receivedFullData(res.data))
            } else if (res.status === 299){
                dispatch(receivedCaughtError(res.data))
            }

        })
        //.catch error
}

export const receivedFullData = (data) => {
    return {
        type: 'VALIDATED_SEARCH_CURRENTGAME',
        data: data
    }
}
export const receivedCaughtError = (msg) => {
    return {
        type: 'CAUGHT_ERROR_CURRENTGAME',
        errorMessage: msg
    }
}