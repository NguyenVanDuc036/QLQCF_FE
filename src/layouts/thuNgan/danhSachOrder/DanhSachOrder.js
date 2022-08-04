import React, { Fragment, useEffect, useState } from 'react'
import { Tabs, Space, Input } from "antd";
import { Tooltip } from 'antd';
import './danhSachOrder.css'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { layChiTietBillAction, layDanhSachBangTableService, layDanhSachOrderTakeAwayAction } from '../../../redux/actions/QuanLyOrderAction';
import NotFoundWater from '../../phucVu/Order/NotFound/NotFoundWater';
import { useSelector } from 'react-redux';
const { TabPane } = Tabs;
export default function DanhSachOrder(props) {


  // Khi bắt đầu khởi tạo componenet, thì tự động gọi hàm này để call api từ server về
  useEffect(() => {
    dispatch(layDanhSachOrderTakeAwayAction(""))
  }, []);

  // Lấy toàn bộ order từ redux về
  const { danhSachOrderTakeAway } = useSelector((state) => state.QuanLyOrderReducer);

  // Lọc lấy danh sách order mang về
  const danhSachOrderTakeAwayUpdate = []
  for (var i = 0; i < danhSachOrderTakeAway.length; i++) {
    if (danhSachOrderTakeAway[i][0].statusBill == 4) {
      danhSachOrderTakeAwayUpdate.push(danhSachOrderTakeAway[i])
    }
  }


  const dispatch = useDispatch()
  // const {danhSachOrder} = props;
  const { danhSachOrder } = useSelector((state) => state.QuanLyPhaCheReducer);


  const danhSachOrderUpdate = []

  // 0 : Order chỉ mới tạo, tại bàn
  // 1 : Order đã pha chế, tại bàn
  // 2 : Order đã thanh toán, tại bàn


  // 3 : Order chỉ mới tạo, mang về
  // 4 : Order đã pha chế, mang về
  // 5 : Order đã thanh toán, mang về

  // Lấy order có trạng thái là 1 (nghĩa là đã pha chế cho khách tại bàn)
  for (var i = 0; i < danhSachOrder.length; i++) {
    if (danhSachOrder[i][0].statusBill == 1) {
      danhSachOrderUpdate.push(danhSachOrder[i])
    }
  }

  const { Search } = Input;
  const onSearch = (value) => {
    const id = { id: value }
    dispatch(layDanhSachBangTableService(id))
  }
  const handleChange = (value) => {
    const id = { id: value.target.value }
    dispatch(layDanhSachBangTableService(id))
  }

  const operationsOders = (
    <Fragment>
      <Space className="mr-5" direction="vertical">
        <Search
          placeholder="Tìm bàn"
          onSearch={onSearch}
          onChange={handleChange}
          style={{
            width: 200,
          }} index
        />
      </Space>
    </Fragment>
  );

  // Kết xuất html cho danh sách order ở khách ngồi tại quán
  const renderBill = () => {
    // Dùng hàm map để duyệt toàn bộ order, và render html
    return danhSachOrderUpdate.map((bill, index) => {
      if (bill[0].statusBill == 1) {
        return <div key={index} className="col-3 pt-2 order-item" >
          <div className="card card-order" >
            <div className="card-header bg-light" >
              <div className="col-6" >
                <span className='h5' >{bill[0].ban}</span>
              </div>
              <div className="col-6" style={{ textAlign: 'right' }} >
                <span className='h4' >{bill[0].numberOfSeat}</span><i className="fas fa-user-alt ml-2"></i>
              </div>
            </div>
            <div className="card-body" >
              <table style={{ width: '100%' }} >
                <tr >
                  <td style={{ padding: '0 22px' }} colSpan={2} rowSpan={2} className="h5 text-center" >
                    Tầng:{bill[0].area}
                  </td>
                  <td colSpan={2} className="h5 text-danger text-center">
                    {bill[0].total.toLocaleString()}VND
                  </td>
                </tr>
                <tr>
                  <td className="text-center minutes " colSpan={4} >
                    <div>
                      <i className="float-start mr-1 text-success fa fa-clock">

                      </i><span className='text-dark h5' >1'</span>
                    </div>
                    <img src="img/drinks.png" style={{ width: '45%' }} />
                  </td>
                </tr>
              </table>
            </div>
            <div className="card-footer " >
              <table>
                <thead>
                  <Tooltip title="Thanh toán">
                    <th onClick={() => {
                      dispatch(layChiTietBillAction(bill))
                    }} > <i class="fas fa-print"></i></th>
                  </Tooltip>


                  <Tooltip title="Khác">
                    <th><i class="fas fa-ellipsis-h"></i></th>
                  </Tooltip>

                </thead>

              </table>

            </div>
          </div>
        </div>
      } else {
        return <NotFoundWater />
      }

    })
  }

  // Lấy toàn bộ danh sách order mang về
  const renderBillMangVe = () => {
    return danhSachOrderTakeAwayUpdate.map((bill, index) => {
      if (bill[0].statusBill == 4) {
        var status = ''
        var statusCss = ''
        var cancelDisable = false;
        if (bill[0].statusBill == 3) {
          status = 'Chờ pha chế'
          statusCss = 'text-warning'
        } else {
          status = 'Pha chế xong'
          statusCss = 'text-success'
        }

        return <div className="col-3 pt-2 order-item" >
          <div className="card card-order" >
            <div className="card-header bg-light d-inline text-center" >
              <div className=" p-0" style={{ textAlign: 'center' }} >
                <h4 className='m-0' >Mang về</h4>
              </div>
            </div>
            <div className="card-body" >
              <table style={{ width: '100%' }} >
                <tr >
                  {/* <td style={{padding:'0 22px'}}  colSpan={2} rowSpan={2} className="h5 text-center" >
                      Tầng:{bill[0].area}
                    </td> */}
                  <td colSpan={2} className="h5 p-2 py-3   text-center">
                    <i class="fas fa-donate text-warning mr-2"></i><span >Tổng tiền :</span> <span className='text-danger' >{bill[0].total.toLocaleString()}VND</span>
                  </td>
                </tr>
                <tr>
                  <td className="text-center minutes " colSpan={4} >
                    <div>
                      <div className="p-0" style={{ textAlign: 'right' }} >
                        <span className={`h5 ${statusCss}`} >{status}</span>
                      </div>
                    </div>
                    <img src="img/juice.png" style={{ width: '30%' }} />
                  </td>
                </tr>
              </table>
            </div>
            <div className="card-footer " >
              <table>
                <thead>
                  <Tooltip title="Pha chế">
                    <th onClick={() => {
                      dispatch(layChiTietBillAction(bill))
                    }} ><i class="fas fa-glass-martini"></i></th>
                  </Tooltip>


                  <Tooltip title="Khác">
                    <th><i class="fas fa-ellipsis-h"></i></th>
                  </Tooltip>

                </thead>

              </table>

            </div>
          </div>
        </div>
      }


    })
  }
  return (
    <Tabs
      tabBarExtraContent={operationsOders}
      defaultActiveKey="1"
      type="card"
      size='large'
    >
      <TabPane className="menu-item tab-border" tab={`Chờ thanh toán (${danhSachOrderUpdate.length})`} key="1">
        <div className="content-top bill-card p-4" >
          <div className="row" >
            {danhSachOrderUpdate.length != 0 ? renderBill() : <NotFoundWater message="Hiện tại chưa có order nào!" />}
          </div>
        </div>
        <div className="content-bottom">
          <h5 className="p-3"  >Tổng số order : <span className="text-success" >{danhSachOrderUpdate.length}</span></h5>
        </div>
      </TabPane>
      <TabPane className="menu-item" tab={`Mang về (${danhSachOrderTakeAwayUpdate.length})`} key="2">
        <div className="content-top bill-card p-4" >
          <div className="row" >
            {danhSachOrderTakeAwayUpdate.length !== 0 ? renderBillMangVe() : <NotFoundWater message="Hiện tại chưa có order nào!" />}

          </div>
        </div>
        <div className="content-bottom">
          <h5 className="p-3"  >Tổng số order : <span className="text-success" >{danhSachOrderTakeAwayUpdate.length}</span></h5>
        </div>
      </TabPane>
      <TabPane className="menu-item" tab="Đặt trước (0) " key="3"></TabPane>

    </Tabs>
  )
}
