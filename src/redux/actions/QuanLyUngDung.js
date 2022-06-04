import { CHANGE_TAB_ACTIVE } from "./types/QuanLyUngDungType"


export  const changeTabActiveAction = (key) => {

    return (dispatch,getState) => {
        dispatch({
            type:CHANGE_TAB_ACTIVE,
            payload:key
        })  
    }
}

