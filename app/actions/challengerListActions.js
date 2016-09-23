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

    region = region.toLowerCase();

    axios.get(`/api/getChallengerList/${region}`)
        .then( res => {
            if (res.status === 200) {
                dispatch(receivedFullData(res.data, region))
            } else if (res.status === 299){
                dispatch(receivedCaughtError(res.data))
            }

        })
        //.catch error
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
