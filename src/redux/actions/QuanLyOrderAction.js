import axios from "axios";
import Swal from 'sweetalert2'
import { history } from './../../App';
import { Redirect } from 'react-router';
import { qlNhanVienService } from "../../service/QuanLyNhanVienService";
import { qlHangHoaService } from "../../service/QuanLyHangHoaService";
import { LAY_CHI_TIET_HANG_HOA, LAY_DANH_SACH_HANG_HOA } from "./types/QuanLyHangHoaType";
import { qlOrderService } from "../../service/QuanLyOrderService";
import { changeTabActiveAction } from "./QuanLyUngDung";
import { layDanhSachBanAction } from "./QuanLyBanAction";

export  const taoOrderAction = (form) => {

    return async (dispatch,getState) => {
        try {

            const result = await qlOrderService.taoOrderService(form);
            await Swal.fire(
                'Good job!',
                'Bạn đã tạo hóa đơn thành công !',
                'success'
              )
            await dispatch(changeTabActiveAction(1))
            await dispatch(layDanhSachBanAction(''))
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Không thể tạo hóa đơn',
                })
                console.log('that bai', error);
            }
    }
}

