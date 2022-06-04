import { applyMiddleware, combineReducers, createStore } from 'redux';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNhanVienReducer';
import { QuanLyHangHoaReducer } from './reducers/QuanLyHangHoaReducer';
import { QuanLyNuocUongReducer } from './reducers/QuanLyNuocUongReducer';
import { QuanLyBanReducer } from './reducers/QuanLyBanReducer';
import { QuanLyUngDung } from './reducers/QuanLyUngDung';
//Cấu hình middleware redux thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
    //Các state của ứng dụng đặt tại đây
    QuanLyNguoiDungReducer,
    QuanLyHangHoaReducer,
    QuanLyNuocUongReducer,
    QuanLyBanReducer,
    QuanLyUngDung

});
const middleware = [
    reduxThunk,
];
const customCompose = composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(rootReducer,customCompose);
