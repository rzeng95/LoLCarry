import axios from 'axios';


export const enableLoadingAction = () => {
    return {
        type: 'ENABLE_LOADING_CHALLENGER'
    }
}

export const changeRegionAction = (newRegion) => {
    return {
        type: 'CHANGE_REGION_CHALLENGER',
        region: newRegion
    }
}

export const requestChallengerListAction = (region) => dispatch => {
    dispatch(changeRegionAction(region));
    dispatch(enableLoadingAction());
    dispatch(toggleVisibilityAction('SHOW_ALL'));

    region = region.toLowerCase();

    axios.get(`/api/getChallengerList/${region}`)
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

export const receivedFullData = (data, region) => {
    return {
        type: 'VALIDATED_SEARCH_CHALLENGER',
        data: data,
        region: region
    }
}
export const receivedCaughtError = (msg) => {
    return {
        type: 'CAUGHT_ERROR_CHALLENGER',
        errorMessage: msg
    }
}

export const toggleVisibilityAction = (view) => {
    return {
        type: 'TOGGLE_VISIBILITY_CHALLENGER',
        view: view
    }
}
