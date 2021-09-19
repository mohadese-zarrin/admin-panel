import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'

function DiscountStore() {
    const history = useHistory()
    const [discountInfo, setDiscountInfo] = useState({
        title: 'test',
        code: '',
        count: null,
        value: null,
        type: 'amount',
        order_minimum_amount: null
    })
    const handleOnchangeInfo = (e) => {
        setDiscountInfo({ ...discountInfo, [e.name]: e.value })
    }
    const handleStoreDiscount = () => {
        api.discountsStore(discountInfo).then(res => {
            console.log(res, 'store discount')
            history.goBack()
        }).catch(e => {
            console.log(e.response)
        })
    }
    console.log(discountInfo)
    return (
        <main>
            <header>
                <a onClick={handleStoreDiscount} class="primerybtn">اعمال</a>
                <a onClick={() => history.goBack()} class="secondrybtn">انصراف</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">فیلتر مشتریان</a>
                </li>
            </ul>
            <section>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>کد:</p>
                            <input onChange={(e) => handleOnchangeInfo({ name: 'code', value: e.target.value })} type="text" id="code" name="code" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>تعداد بن:</p>
                            <input  onChange={(e) => handleOnchangeInfo({ name: 'count', value: parseInt(e.target.value) })} type="text" id="number" name="number" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="sectionrow">
                        <div class="input">
                            <p>نوع</p>
                            <div class="options">
                                {Object.keys(config.discountTypes).map((data) =>
                                    <label class="container">{config.discountTypes[data]}
                                        <input onClick={() => handleOnchangeInfo({ value: data, name: 'type' })} type="radio" checked={discountInfo.type==data} name="type" id="percent" value="percent" />
                                        <span class="checkmark"></span>
                                    </label>
                                )}
                                {/* <label class="container">درصد
                                    <input type="radio" checked="checked" name="type" id="percent" value="percent" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">ثابت
                                    <input handleOnchangeInfo type="radio" checked="checked" name="type" id="fixed" value="fixed" />
                                    <span class="checkmark"></span>
                                </label> */}
                            </div>
                        </div>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>مقدار:</p>
                            <input  onChange={(e) => handleOnchangeInfo({ name: 'value', value: parseInt(e.target.value) })} type="text" id="priceto" name="priceto" class="w20" />
                        </div>
                        <p class="inputdesc">مقدار تخفیف</p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>حداقل مبلغ سبد:</p>
                            <input  onChange={(e) => handleOnchangeInfo({ name: 'order_minimum_amount', value: parseInt(e.target.value) })} type="text" id="pricefrom" name="pricefrom" class="w20" />
                        </div>
                        <p class="inputdesc">حداقل مبلغ سبد خرید به تومان برای استفاده از کد</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DiscountStore
