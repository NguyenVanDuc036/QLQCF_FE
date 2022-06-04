import axios from "axios";
import { ACCESS_TOKEN } from "../util/config";


export class baseService {

    get = (url) =>{
        return axios({
            url:url,
            method:'GET',
            // headers:{
            //     'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            //     // 'TokenCybersoft' : `${tokenSyberSoft}`
            // }
        })
    }

    post = (url,data) =>{
        return axios({
            url:url,
            data:data,
            method:'POST',
            headers:{
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
            }
        })
    }

    put = (url,data) => {
        return axios({
            url:url,
            data:data,
            method:'PUT',
            headers:{
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
            }
        })
    }
    delete = (url) => {
        return axios({
            url:url,
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,

            }
        })
    }
}