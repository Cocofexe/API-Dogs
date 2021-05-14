import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const GET_TEMPS = 'GET_TEMPS'
export const GET_DETAILS = 'GET_DETAILS'

export function getDogs(name){
    return async (dispatch) =>{
    try{
        const res = await axios.get(`http://localhost:3001/dogs?name=`+name)
        dispatch( {
            type: GET_DOGS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: "ERROR",
            payload: console.log("ERROR YOUR BACK_END IS OFFLINE"),
        })
    }
    }
}

export function getTemps(){
    return async (dispatch) =>{
    try{
        const res = await axios.get('http://localhost:3001/temperaments')
        dispatch( {
            type: GET_TEMPS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: "ERROR",
            payload: console.log("ERROR YOUR BACK_END IS OFFLINE"),
        })
    }
}
}

export function getDetails(id){
    return async (dispatch) =>{
    try{
        const res = await axios.get(`http://localhost:3001/dogs/${id}`)
        dispatch( {
            type: GET_DETAILS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: "ERROR",
            payload: console.log("ERROR YOUR BACK_END IS OFFLINE" + e),
        })
    }
}
}

