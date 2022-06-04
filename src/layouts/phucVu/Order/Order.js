import React, { useEffect } from 'react'
import { Button } from 'primereact/button';
import {  Dropdown, Menu, Radio, Space, Tabs, Tooltip } from "antd";
import { Input } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNuocUongAction } from '../../../redux/actions/QuanLyNuocUongAction';
import { taoOrderAction } from '../../../redux/actions/QuanLyOrderAction';
import WaterList from './WatersList/WaterList';
import NotFoundWater from './NotFound/NotFoundWater';
import ChonNuoc from '../chonNuoc/ChonNuoc';
import ChuaChonMon from '../chuaChonMon/ChuaChonMon';
import { Select } from 'antd';
import { timBanAction } from '../../../redux/actions/QuanLyBanAction';
const { Option } = Select;


const { TabPane } = Tabs;
const { Search } = Input;

export default function Order(props) {

    const {danhSachNuocUong , chiTietBill , tongBanTrong} = props
    const dispatch = useDispatch()
    useEffect(() => {
        return ()=>{
            console.log('Đã thoát');
        }
    }, []);

    const { banDuocChon } = useSelector(
      (state) => state.QuanLyBanReducer
    );

      const renderBanTrong =()=>{
        return tongBanTrong.map((ban, index)=>{
          return  <Option key={index} value={ban.id}>{ban.name}</Option>
        })
      }

    const onSearchWater =(value) => {
        dispatch(layDanhSachNuocUongAction(value));
      }
    
    
      const handleChangeWater = (value) => {
        dispatch(layDanhSachNuocUongAction(value.target.value));
      }

      const handleChange = (value) => {
        dispatch(timBanAction(value))
      };

  return (
    <div className="row">
            <div className="order-left col-6 ">
              <Tabs
                className="menu-item"
                defaultActiveKey="1"
                type="card"
                size='large'
              >
                <TabPane
                className="tab-border"
                  tab={
                    <span>
                      <i class="fa-solid fa-heart mr-2"></i> Yêu thích
                    </span>
                  }
                  key="1"
                >
                  <div className="w-50">
                    <div>
                        <Space className="mr-5" direction="vertical">
                          <Search
                            placeholder="Tìm nước uống"
                            onSearch={onSearchWater}
                            onChange={handleChangeWater}
                            style={{
                              width: 200,
                            }}
                          />
                        </Space>
                      </div>
                  </div>
                  
                  
                  {danhSachNuocUong.length > 0 ?<WaterList danhSachNuocUong={danhSachNuocUong}  /> : <NotFoundWater/>}
                </TabPane>
                <TabPane
                className="tab-border"
                  tab={
                    <span>
                      <i class="fa-solid fa-glass-water-droplet"></i> Nước uống
                    </span>
                  }
                  key="2"
                >
                  <div className="">
                  <Space className="mr-5" direction="vertical">
                          <Search
                            placeholder="Tìm nước uống"
                            onSearch={onSearchWater}
                            onChange={handleChangeWater}
                            style={{
                              width: 200,
                            }}
                          />
                        </Space>
                    {danhSachNuocUong.length > 0 ?<WaterList danhSachNuocUong={danhSachNuocUong}  /> : <NotFoundWater/>}
                    
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <div className="order-right col-6 p-1 ">
              <div className="order-top" >
              <div className="info-order">
                <div className="w-50">
                  <div>
                    <div class="input-group ">
                      <div class="input-group-prepend ">
                        <span class="input-group-text" id="basic-addon1">
                          <i class="fas fa-table"></i>
                        </span>
                      </div>
                      <Select style={{fontSize:'20px'}} className='w-75' onChange={handleChange}>
                       {renderBanTrong()}
                    </Select>
                    </div>
                  </div>
                </div>
                <Tooltip title="Số ghế" >
                    <div className="info-user" >
                    <i class="fa-solid fa-users mr-2"></i><span className='' >{banDuocChon.numberOfSeat}</span>
                    </div>
                </Tooltip>
                <Tooltip title="Tên bàn" >
                    <div className="info-user" >
                    <i class="fa-solid fa-table mr-2"></i><span>{banDuocChon.name}</span>
                    </div>
                </Tooltip>
               
                <Tooltip title="Số tầng" >
                  <div className="info-user" >
                      <span>Tầng : {banDuocChon.area}</span>
                  </div>
                </Tooltip>
               
                
              </div>
              
              
              {chiTietBill.length != 0?<ChonNuoc/>:<ChuaChonMon/>}
              </div>
              <div className="order-bottom" >
                <div style={{width:'100%',height:'3rem'}}>
                <div style={{float:'right',height:'2rem'}} className="d-flex" >
                  <h5 className="p-2">Tổng tiền : </h5>
                  <h5 className="p-2 mr-5 text-success">{chiTietBill.reduce((tongTien,item,index)=>{
                                    return tongTien+= item.totalMoney;
                                },0).toLocaleString()}VND</h5>
                </div>
                </div>
               
                <div>
                <div className="button-demo p-1" style={{borderTop:'1px solid grey'}}>
                  <div className="template">
                  <Button className="amazon ml-2 p-0" aria-label="Discord">
                          	<i style={{height:'64px',lineHeight:'64px'}} className="pi px-2" ><img src="/img/chef-svgrepo-com.svg" alt="" height="30" /></i>
                            
                          <span className="px-3">Gửi Bếp/Bar</span>
                  </Button>

                  <Button className="youtube ml-2 p-0" aria-label="Discord">
                          	<i style={{height:'64px',lineHeight:'64px'}} className="pi px-2" ><img src="/img/cancel.jpg" alt="" height="30" /></i>
                            
                          <span className="px-3">Hủy</span>
                  </Button>

                  <Button onClick={()=>{
                     const userLogin = JSON.parse(localStorage.getItem('userLogin'));

                    

                    var today = new Date(); 
                    var date =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const id  = Date.now();

                  var chiTietHoaDon = {
                    amount :'',
                    totalMoney : '',
                    water_id : '',
                    bill_id : '',
                    decription: ''
                  }
                  var billdetail =[];

                  for(var i=0; i<chiTietBill.length ; i++){
                    chiTietHoaDon = {
                      amount :chiTietBill[i].amount,
                      totalMoney : chiTietBill[i].totalMoney,
                      water_id : chiTietBill[i].id,
                      bill_id : id,
                      decription: 'no'
                    }
                    billdetail.push(chiTietHoaDon);
                  }

                   const data = {
                      id,
                      createdTime : date + ' ' + time,
                      totalMoney : chiTietBill.reduce((tongTien,item,index)=>{
                        return tongTien+= item.totalMoney;
                    },0),
                      status : 0,
                      employee_id : userLogin.id,
                      table_id : banDuocChon.id,
                      billdetail

                    }

                    dispatch(taoOrderAction(data))



                  }} className="vimeo ml-2 p-0" aria-label="Discord">
                          <i style={{height:'64px',lineHeight:'64px'}} className="pi px-2" ><i class="fas fa-save" style={{fontSize:'30px'}}></i></i>
                          <span className="px-3">Lưu và cất</span>
                  </Button>

                  </div>
                  </div>
                </div>
                  
              </div>
                  
            </div>
          </div>
  )
}
