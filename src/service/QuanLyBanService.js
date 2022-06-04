import axios from "axios"
import { DOMAIN } from "../util/config";
import { baseService } from "./baseService";

export class QuanLyBanService extends baseService { 

    layDanhSachBanService = (name='') => {
        return this.get(`${DOMAIN}/tables?name=${name}`)
    }
  

}


export const qlBanService = new QuanLyBanService();