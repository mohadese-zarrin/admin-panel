import React, { useState, useEffect, useRef } from 'react'
import { Link, Redirect, Route, useHistory } from 'react-router-dom'
import api from '../../../tools/API'
import config from '../../../tools/Globals'
import { DatePicker } from "jalali-react-datepicker";
import moment from 'jalali-moment';

function OrderSingle(props) {
    // TODO:use global status in config file
    const status = {unpaid: 'پرداخت نشده', processing: 'در حال پردازش', waiting_to_send: 'در انتظار ارسال', sent: 'ارسال شده', delivered: 'دریافت شده', process_completion: 'تکمیل شده', returned_products: 'برگشت خورده', canceled: 'کنسل شده',paid: 'پرداخت شده' }
    // const status = [{ paid: 'پرداخت شده'}], unpaid: 'پرداخت نشده', processing: 'در حال پردازش', waiting_to_send: 'در انتظار ارسال', sent: 'ارسال شده', delivered: 'دریافت شده', process_completion: 'تکمیل شده', returned_products: 'برگشت خورده', canceled: 'کنسل شده' }
    const id = props.match.params.id
    const [orderInfo, setOrderInfo] = useState()
    const [data, setData] = useState({
        send_date:'',
        mobile:'',
        address:''
    })
    const [updateInfo, setUpdateInfo] = useState({
        customer_id:3,
        price:9,
        discounted_value:17,
        status:'et',
        pay_type:'exercitationem',
        send_date:'minima'
    })
    const handleGetOrderInfo = () => {
        api.ordersSingle(id).then(res => {
            console.log(res, 'handleGetOrderInfo')
            setOrderInfo(res.data)
            setData({send_date:res.data.send_date,mobile:res.data.customer.mobile,address:res.data.address})
        }).catch(e => { console.log(e.response) })
    }
    useEffect(() => {
        handleGetOrderInfo()
    }, [])
    console.log(data,'data')
    return (

        <>
            {orderInfo &&
                <main>
                    <header>
                        <a href="order.html" class="primerybtn">اعمال</a>
                        <a href="order.html" class="secondrybtn">انصراف</a>
                        <a href="login.html" class="logout"><i class="logouticon"></i></a>
                    </header>
                    <section>
                        <div class="sectionrow">
                            <div class="datalist">
                                <div class="dataitem">
                                    <p class="dataitemtitle">نام مشتری</p>
                                    <p class="dataitemvalue">{orderInfo.customer.name ? orderInfo.customer.name : 'بدون نام'}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">تلفن مشتری</p>
                                    <p class="dataitemvalue">{orderInfo.customer.mobile}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">عنوان سبد</p>
                                    <p class="dataitemvalue">{orderInfo.cart ? orderInfo.cart.title : 'بدون نام'}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">تعداد محصول</p>
                                    <p class="dataitemvalue">{orderInfo.items_count}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">قیمت اولیه</p>
                                    <p class="dataitemvalue">{`${orderInfo.total_price_with_product_discount} تومان`}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">هزینه ارسال</p>
                                    <p class="dataitemvalue">{orderInfo.transport_cost}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">قیمت بسته‌بندی</p>
                                    <p class="dataitemvalue">{`${orderInfo.total_pack_price} تومان`}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">مالیات</p>
                                    <p class="dataitemvalue">{orderInfo.tax}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">تخفیف</p>
                                    <p class="dataitemvalue">{`${orderInfo.discounted_value?orderInfo.discounted_value:0} تومان`}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">بن</p>
                                    <p class="dataitemvalue">{orderInfo.total_price_with_product_discount-orderInfo.total_price_with_discount_code}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">مبلغ نهایی</p>
                                    <p class="dataitemvalue">{`${orderInfo.final_price} تومان`}</p>
                                </div>
                                <div class="dataitem">
                                    <p class="dataitemtitle">وضعیت پرداخت</p>
                                    <p class="dataitemvalue">{status[orderInfo.status]}</p>
                                </div>
                            </div>
                        </div>
                        <div class="sectionrow">
                            <div class="inputwithdesc">
                                <div class="input">
                                    <p>روش پرداخت:</p>
                                    <select name="saleunit" id="saleunit" class="w20">
                                        <option value="cash" selected={orderInfo.pay_type == 'cash'}> پرداخت در محل</option>
                                        <option value="online" selected={orderInfo.pay_type == 'online'}>اعتباری</option>
                                        {/* <option value="3">پرداخت با کارت در محل</option> */}
                                    </select>
                                </div>
                                <p class="inputdesc"></p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div class="sectionrow">
                            <div class="inputwithdesc">
                                <div class="input">
                                    <p>وضعیت:</p>
                                    <select name="saleunit" id="saleunit" class="w20">
                                        {Object.keys(status).map((key, index) =>
                                            <option key={index} selected={orderInfo.status == key} value={key}>{status[key]}</option>
                                        )}
                                    </select>
                                </div>
                                <p class="inputdesc"></p>
                            </div>
                            <div class="inputwithdesc">
                                <div class="input">
                                    <p>تاریخ ارسال:</p>
                                    <DatePicker value={orderInfo.send_date?moment(orderInfo.send_date):moment()} onClickSubmitButton={(e)=>setData({...data,send_date:moment(e.value._d).format('YYYY-M-D')})}/>
                                    {/* <input type="text" id="stock" name="stock" class="w20" value={data.send_date} /> */}
                                </div>
                                <p class="inputdesc"></p>
                            </div>
                        </div>
                        <div class="sectionrow">
                            <div class="inputwithdesc">
                                <div class="input">
                                    <p>آدرس:</p>
                                    <textarea onChange={(e)=>setData({...data,address:e.target.value})} value={data.address} id="description" name="description" class="w60"></textarea>
                                </div>
                                <p class="inputdesc"></p>
                            </div>
                        </div>
                        <div class="sectionrow">
                            <div class="inputwithdesc">
                                <div class="input">
                                    <p>تلفن:</p>
                                    <input type="text" id="productname" name="productname" class="w60" value={data.mobile} />
                                </div>
                                <p class="inputdesc"></p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div class="sectionrow">
                            <div class="table">
                                <h3>لیست محصولات این سبد</h3>
                                <div class="tableheader">

                                    <div class="tableactions">
                                        <div class="selectall">
                                            <input type="checkbox" id="selectall" name="selectall" value="all" />
                                            <label for="selectall">انتخاب همه</label>
                                        </div>
                                        <button class="removeselected inactive"><i class="remove"></i></button>
                                    </div>
                                    {/* <div class="settablerow">
                                        <select name="rownumber" id="rownumber">
                                            <option value="10">نمایش 10 مورد در هر صفحه</option>
                                            <option value="20">نمایش 20 مورد در هر صفحه</option>
                                            <option value="50">نمایش 50 مورد در هر صفحه</option>
                                            <option value="100">نمایش 100 مورد در هر صفحه</option>
                                            <option value="500">نمایش 500 مورد در هر صفحه</option>
                                        </select>
                                    </div> */}
                                </div>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>نام محصول</div>
                                            </th>
                                            <th>
                                                <div>تعداد</div>
                                            </th>
                                            <th>
                                                <div>واحد فروش</div>
                                            </th>
                                            <th>
                                                <div>قیمت اولیه</div>
                                            </th>
                                            <th>
                                                <div>تخفیف</div>
                                            </th>
                                            <th>
                                                <div>قیمت نهایی</div>
                                            </th>
                                            <th>
                                                <div></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderInfo.items.map((data,index)=><tr>
                                            <td>
                                                <a href="product.html">{data.product.title}</a>
                                            </td>
                                            <td>
                                                <div>{data.count}</div>
                                            </td>
                                            <td>
                                                <div>{`${data.product.unit.base_value}${data.product.unit.title}`}</div>
                                            </td>
                                            <td>
                                                <div>{data.price}</div>
                                            </td>
                                            <td>
                                                <div>{data.product.discount}</div>
                                            </td>
                                            <td>
                                                <div>{data.price_with_discount}</div>
                                            </td>
                                            <th>
                                                <div><input type="checkbox" id="product-select-1" name="product-select-1" value="1" /></div>
                                            </th>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </main>}
        </>
    )
}

export default OrderSingle
