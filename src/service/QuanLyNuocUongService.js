import axios from "axios"
import { DOMAIN } from "../util/config";
import { baseService } from "./baseService";


export class QuanLyNuocUongService extends baseService { 


    layDanhSachNuocUong = (name='') => {

        return this.get(`${DOMAIN}/waters?name=${name}`)

    }

    layChiTietNuocUong = (id) => {

        return this.get(`${DOMAIN}/waters/${id}`)

    }

    themNuocUong =(formData)=>{
        return this.post(`${DOMAIN}/waters`,formData)
    }

    capNhatNuocUong = (formData , id)=>{
        return this.put(`${DOMAIN}/waters/${id}`,formData)
    }

    xoaNuocUong = ( id)=>{
        return this.delete(`${DOMAIN}/waters/${id}`)
    }

    layDanhSachLoaiNuoc = (name='') => {

        return this.get(`${DOMAIN}/drinks`)

    }

    layDanhSachLoaiNuoc = (name='') => {

        return this.get(`${DOMAIN}/drinks`)

    }

    layBangTen =(name)=>{
        return this.post(`${DOMAIN}/waters/getbyname`,name)
    }

   

}


export const qlNuocUongService = new QuanLyNuocUongService();