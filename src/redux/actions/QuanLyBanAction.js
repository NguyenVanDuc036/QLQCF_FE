
import { qlBanService } from "../../service/QuanLyBanService";
import { CHON_BAN, LAY_CHI_TIET_TANG, LAY_DANH_SACH_BAN, TIM_BAN } from "./types/QuanLyBanType";

export  const layDanhSachBanAction = (name='') => {

    return async (dispatch,getState) => {
        try {

            const result = await qlBanService.layDanhSachBanService(name);
            dispatch({
                type:LAY_DANH_SACH_BAN,
                payload:result.data
            })      

            console.log(result.data);
            } catch (error) {
            
                console.log('that bai', error);
            }
    }
}


export const chiTietTangAction= (payload) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:LAY_CHI_TIET_TANG,
            payload : payload
        })

    }
}


export const chonBanAction= (payload) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:CHON_BAN,
            payload : payload
        })

    }
}

export const timBanAction= (payload) => {
    return async (dispatch,getState) => {
        await dispatch({
            type:TIM_BAN,
            payload : payload
        })

    }
}