import React, { useEffect, useState } from "react";
import './WaterList.css'
import { Checkbox,Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { chonNuocAction, layDanhSachNuocUongAction } from "../../../../redux/actions/QuanLyNuocUongAction";
import { useFormik } from 'formik';
import Swal from "sweetalert2";


export default function WaterList(props) {

  const dispatch = useDispatch();

  const {danhSachNuocUong} = props;

  const { Option } = Select;
  const renderNuocUong =() => {

    var waterItem = null;
    const onChange = (value) => {
      waterItem = value;
    };
    
    

    return danhSachNuocUong.map((item, index)=> {
      
      return <div key={index} className="col-4 card-water" >
            <div className="card" >
              <div  className="card-body">
                <img style={{width:'100%'}} src={ item[0].imgSrc } />
              </div>
              <div className="card-footer text-center" >
                <h6>{item[0].name}</h6>
              </div>
            </div>
            <div className="overley-price">
              <span>{item[0].price}</span>
            </div>
            <div className="overley">
              <button className="btn btn-chon-nuoc" onClick={()=>{
                if(waterItem != null){
                  const billDetails = {...item[waterItem] , amount : 1 , totalMoney :item[waterItem].price}
                  dispatch(chonNuocAction(billDetails))
                  // const billDetails = {id:item[waterItem].id , amount : 1 , total :item[waterItem].price}
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Bạn cần chọn size',
                  })
                }

                
              }} >Chọn nước</button>
                  <Select className="w-75"
              showSearch
              placeholder="Chọn size"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {item.map((detail, i)=>{
                return <Option value={i}>{detail.size}</Option>
              })}
              
            </Select>
            </div>
            </div>
      
    })
  }
  



  return (
    <div className="row mt-3" >
      {renderNuocUong()}

    </div>


  );
}
