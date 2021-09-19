import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'

function DiscountStore(props) {
    const id = props.match.params.id
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
    const handleUpdateDiscount = () => {
        api.discountsUpdate(discountInfo).then(res => {
            console.log(res, 'store discount')
            history.goBack()
        }).catch(e => {
            console.log(e.response)
        })
    }
    const handleGetDiscount=()=>{
        api.discountsSingle(id).then(res=>{
            console.log(res,'get discount')
            setDiscountInfo(res.data)
        }).catch(e=>{console.log(e.response)})
    }
    useEffect(() => {
       handleGetDiscount()
    }, [])
    console.log(discountInfo)
    return (
        <main>
            <header>
                {/* TODO:can edit?? */}
                {/* <a onClick={handleUpdateDiscount} class="primerybtn">اعمال</a> */}
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
                            <input value={discountInfo.code} onChange={(e) => handleOnchangeInfo({ name: 'code', value: e.target.value })} type="text" id="code" name="code" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>تعداد بن:</p>
                            <input value={discountInfo.count}  onChange={(e) => handleOnchangeInfo({ name: 'count', value: parseInt(e.target.value) })} type="text" id="number" name="number" class="w20" />
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
                                        <input onClick={() => handleOnchangeInfo({ value: data, name: 'type' })} type="radio" checked={discountInfo.type==data} name="type" id={data} value={data} />
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
                            <input value={discountInfo.value} onChange={(e) => handleOnchangeInfo({ name: 'value', value: parseInt(e.target.value) })} type="text" id="priceto" name="priceto" class="w20" />
                        </div>
                        <p class="inputdesc">مقدار تخفیف</p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>حداقل مبلغ سبد:</p>
                            <input value={discountInfo.order_minimum_amount}  onChange={(e) => handleOnchangeInfo({ name: 'order_minimum_amount', value: parseInt(e.target.value) })} type="text" id="pricefrom" name="pricefrom" class="w20" />
                        </div>
                        <p class="inputdesc">حداقل مبلغ سبد خرید به تومان برای استفاده از کد</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DiscountStore
