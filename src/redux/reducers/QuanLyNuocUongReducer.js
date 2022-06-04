import { LAY_DANH_SACH_NUOC_UONG, LAY_CHI_TIET_NUOC_UONG, LAY_DANH_SACH_LOAI_NUOC, CHON_NUOC_UONG, HUY_MON, THEM_HUY_MON } from "../actions/types/QuanLyNuocUongType";

const stateDefault = {
    danhSachNuocUong :[],
    chiTietNuocUong : {},
    chiTietBill : [
    ]
}

export const QuanLyNuocUongReducer = (state = stateDefault,action)=>{
    switch (action.type) {

        case LAY_DANH_SACH_NUOC_UONG : {
            state.danhSachNuocUong = [...action.payload]
            return {...state}
        }

        case LAY_CHI_TIET_NUOC_UONG : {
            state.chiTietNuocUong = {...action.payload}
            return {...state}
        }

        case CHON_NUOC_UONG : {
            
            const oldChiTietBill  = [...state.chiTietBill]
            let index = oldChiTietBill.findIndex(bill => bill.id === action.payload.id)

            if(index == -1){
                state.chiTietBill = [...state.chiTietBill,action.payload]
            }
            
            console.log({index});
            return {...state}
        }

        case HUY_MON : {
            let chiTietBillOld = [...state.chiTietBill];
            chiTietBillOld = chiTietBillOld.filter(item=>item.id !== action.payload);
            state.chiTietBill = [...chiTietBillOld]
            return {...state}
        }


        case THEM_HUY_MON : {

            const {id , number} = action.payload

            var oldChiTietBill  = [...state.chiTietBill]
            let index = oldChiTietBill.findIndex(bill => bill.id === id)

            if( state.chiTietBill[index].amount >= 1){
                state.chiTietBill[index].amount += number;
                state.chiTietBill[index].totalMoney =  state.chiTietBill[index].price *  state.chiTietBill[index].amount ;
                if( state.chiTietBill[index].amount == 0){
                    state.chiTietBill[index].amount = 1;
                    state.chiTietBill[index].totalMoney =  state.chiTietBill[index].price
                }
            }
           


            return {...state}
        }
        


        default:
            return {...state};
    }
}

// name , imgSrc , price , size , typeOfDrink_id , status