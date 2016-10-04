import axios from 'axios';

export const searchForCurrentGameAction = (region, name) => dispatch => {

    dispatch(enableLoadingAction());

    axios.get(`/api/getCurrentGame/${region}/${name}`)
        .then( res => {
            if (res.status !== 200) {
                dispatch(receivedCaughtError(res.status));
            } else if (!res.data.err) {
                dispatch(receivedFullData(res.data));
            } else {
                dispatch(receivedCaughtError(res.data.err));
            }
        })
        .catch( err => {
            dispatch(receivedCaughtError(err));
        })
}

export const enableLoadingAction = () => {
    return {
        type: 'ENABLE_LOADING_CURRENTGAME'
    }
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
