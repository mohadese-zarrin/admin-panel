import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../../tools/API'
import config from '../../../tools/Globals'
import { DatePicker } from "jalali-react-datepicker";
import moment from 'jalali-moment';

function OrderFilter(props) {
    const history = useHistory()
    const [filtersitem, setFiltersitem] = useState({
        status: null,
        count_bigger_than: null,
        count_less_than: null,
        created_bigger_than: null,
        created_less_than: null,
        price_bigger_than: null,
        price_less_than: null,
    })

    const handleOnchangeInfo = (e) => {
        setFiltersitem({ ...filtersitem, [e.name]: e.value })
    }
    console.log(filtersitem)
    return (
        <main>
            <header>
                <a onClick={() => props.onClick(filtersitem)} class="primerybtn">اعمال</a>
                <a onClick={() => props.back()} class="secondrybtn">انصراف</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">فیلتر سفارشات</a>
                </li>
            </ul>
            <section>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>از تعداد:</p>
                            <input onChange={(e) => handleOnchangeInfo({ name: 'count_bigger_than', value: parseInt(e.target.value) })} type="text" id="itemsfrom" name="itemsfrom" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>تا تعداد:</p>
                            <input onChange={(e) => handleOnchangeInfo({ name: 'count_less_than', value: parseInt(e.target.value) })} type="text" id="itemsto" name="itemsto" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>از تاریخ:</p>
                            <DatePicker onClickSubmitButton={(e) => handleOnchangeInfo({ name: 'created_bigger_than', value: moment(e.value._d).format('YYYY-M-D') })} />
                            {/* <input type="text" id="datefrom" name="datefrom" class="w20" /> */}
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>تا تاریخ:</p>
                            <DatePicker onClickSubmitButton={(e) => handleOnchangeInfo({ name: 'created_less_than', value: moment(e.value._d).format('YYYY-M-D') })} />
                            {/* <input type="text" id="dateto" name="dateto" class="w20" /> */}
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>از مبلغ:</p>
                            <input onChange={(e) => handleOnchangeInfo({ name: 'price_bigger_than', value: parseInt(e.target.value) })} type="text" id="pricefrom" name="pricefrom" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>تا مبلغ:</p>
                            <input onChange={(e) => handleOnchangeInfo({ name: 'price_less_than', value: parseInt(e.target.value) })} type="text" id="priceto" name="priceto" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>وضعیت:</p>
                            <select
                                onChange={(e) => handleOnchangeInfo({ value: e.target.value, name: 'status' })}
                                name="status" id="status" class="w20">
                                {/* <option value="1">در حال پردازش</option>
                                <option value="2">در انتظار ارسال</option>
                                <option value="3">ارسال شده</option>
                                <option value="4">تحویل شده</option>
                                <option value="5">اتمام فرایند</option> */}
                                {Object.keys(config.status).map((key, index) =>
                                    <option key={index} selected={filtersitem.status == key} value={key}>{config.status[key]}</option>
                                )}
                                <option  selected={true} value={null}></option>
                            </select>
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default OrderFilter
