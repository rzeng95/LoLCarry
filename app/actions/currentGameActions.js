import axios from 'axios';


export const enableLoadingAction = () => {
    return {
        type: 'ENABLE_LOADING'
    }
}

// add "isValidInput" action

// add "request data" action

// assumes...inputs have been validated
export const searchForCurrentGameAction = (region, name) => dispatch => {
    console.log('inside search action')
    console.log(region + ' ' + name)
    console.log('end search action')

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
        type: 'VALIDATED_SEARCH',
        data: data
    }
}
export const receivedCaughtError = (msg) => {
    return {
        type: 'CAUGHT_ERROR',
        errorMessage: msg
    }
}
