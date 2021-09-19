import React from 'react'
import {Link,useHistory} from 'react-router-dom'
function CustomerFlter() {
    const history=useHistory()
    return (
        <main>
            <header>
                <a href="customer.html" class="primerybtn">اعمال</a>
                <a onClick={()=>history.goBack()} class="secondrybtn">انصراف</a>
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
                            <p>عضویت از:</p>
                            <input type="text" id="datefrom" name="datefrom" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>عضویت تا:</p>
                            <input type="text" id="dateto" name="dateto" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>خرید از:</p>
                            <input type="text" id="pricefrom" name="pricefrom" class="w20" />
                        </div>
                        <p class="inputdesc">حداقل مبلغ کل خریدها به تومان</p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>خرید تا:</p>
                            <input type="text" id="priceto" name="priceto" class="w20" />
                        </div>
                        <p class="inputdesc">حداکثر مبلغ کل خریدها به تومان</p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>سفارش از:</p>
                            <input type="text" id="pricefrom" name="pricefrom" class="w20" />
                        </div>
                        <p class="inputdesc">حداقل تعداد دفعات سفارش</p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>سفارش تا:</p>
                            <input type="text" id="priceto" name="priceto" class="w20" />
                        </div>
                        <p class="inputdesc">حداکثر تعداد دفعات سفارش</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CustomerFlter
