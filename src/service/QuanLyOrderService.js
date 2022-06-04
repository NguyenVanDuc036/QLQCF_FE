import axios from "axios"
import { DOMAIN } from "../util/config";
import { baseService } from "./baseService";

export class QuanLyOrderService extends baseService { 

    taoOrderService = (form) => {
        return this.post(`${DOMAIN}/bills`,form)
    }
  

}


export const qlOrderService = new QuanLyOrderService();