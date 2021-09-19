import React from 'react'

function SingleCheckoutReq() {
    return (

        <main>
            <header>
                <a href="purificationrequest.html" class="primerybtn">اعمال</a>
                <a href="purificationrequest.html" class="secondrybtn">انصراف</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <section>
                <div class="sectionrow">
                    <div class="datalist">
                        <div class="dataitem">
                            <p class="dataitemtitle">نام مشتری</p>
                            <p class="dataitemvalue">سید محسن علوی نسب سوق</p>
                        </div>
                        <div class="dataitem">
                            <p class="dataitemtitle">تلفن مشتری</p>
                            <p class="dataitemvalue">09107877594</p>
                        </div>
                        <div class="dataitem">
                            <p class="dataitemtitle">مبلغ</p>
                            <p class="dataitemvalue">289000 تومان</p>
                        </div>
                        <div class="dataitem">
                            <p class="dataitemtitle">تاریخ درخواست</p>
                            <p class="dataitemvalue">1400/01/01</p>
                        </div>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>شماره پیگیری:</p>
                            <input type="text" id="productname" name="productname" class="w60" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SingleCheckoutReq
