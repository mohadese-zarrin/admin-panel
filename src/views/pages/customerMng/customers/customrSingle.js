import React, { useState, useEffect, useRef } from 'react'
import { Link, Redirect, Route, useHistory } from 'react-router-dom'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import axios from 'axios';
import { RowCount, Pagination } from '../../../components'
import moment from 'jalali-moment'
// import AttributesList from '../attributes/attributesList'
// import CategoriesList from '../category/categotyList'
// import TagsList from '../tags/tagsList'

function CustomrSingle(props) {
    console.log(props.match.params)
    //likes | inventoryRequests | discountRequests | addresses | carts | orders
    const id = props.match.params.id
    const history = useHistory()
    const [customerInfo, setCustomerInfo] = useState()
    const [tabName, setTabName] = useState('likes')
    const [pages, setPages] = useState(1)
    const [rowCount, setRowCount] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedData, setSelectedData] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [actions, setActions] = useState()

    const isSelected = (reserve) => {
        return (selectedData.filter(item => item.id == reserve.id).length > 0)
    }
    const handleSelectItem = item => {
        if (isSelected(item)) {
            setSelectedData(selectedData.filter(d => d.id !== item.id))
        } else {
            setSelectedData([...selectedData, item])
        }
    }
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedData([])
        } else {
            setSelectedData(actions)
        }
        setSelectAll(!selectAll)
    }
    const handleGetCustomerInfo = () => {
        api.customersSingle(id).then(res => {
            console.log(res, 'handleGetCustomerInfo')
            setCustomerInfo(res.data)
            // setSpecialTags(res.data.special_tags)
            // let galleryArray = []
            // let galleryIds = []
            // let chartArray = []
            // res.data.gallery && res.data.gallery.images.forEach((data) => {
            //     console.log(data, 'for each')
            //     galleryArray.push(`${config.baseURL}storage/${data.path.original}`)
            //     galleryIds.push(data.id)
            // })
            // for (const [key, value] of Object.entries(res.data.sale_information_chart)) {
            //     chartArray = [...chartArray, { key, value }]
            // }
            // setChartData(chartArray)
            // console.log(chartArray, 'chart array')
            // setFiles({ image: `${config.baseURL}storage/${res.data.image.path.original}`, video: `${config.baseURL}storage/${res.data.video.path}`, gallery: galleryArray })
            // setCustomerInfo({ ...res.data, gallery: galleryIds, image_id: res.data.image.id, video_id: res.data.video.id, category_ids: res.data.categories })

        }).catch(e => {
            console.log(e)
        })
    }
    const handleGetActions = () => {
        api.customersActions(id, tabName, rowCount, currentPage).then(res => {
            console.log(res, 'get actions')
            setActions(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => { console.log(e.response) })
    }
    useEffect(() => {
        handleGetCustomerInfo()
    }, [])

    useEffect(() => {
        handleGetActions()
        console.log(tabName, 'handle get actions')
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            handleGetActions()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])

    useEffect(() => {
        if (currentPage != 1) { setCurrentPage(1) }
        else { handleGetActions() }
        setSelectedData([])
    }, [tabName])
    return (
        <main>
            <header>
                <a href="customer.html" class="primerybtn">اعمال</a>
                <a href="customer.html" class="secondrybtn">انصراف</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>

            {customerInfo &&
                <section>
                    <div class="sectionrow">
                        <div class="datalist">
                            <div class="dataitem">
                                <img src="#" alt="profilepic" />
                                <p class="dataitemtitle">{customerInfo.name ? customerInfo.name : 'no name'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="sectionrow">
                        <div class="datalist">
                            <div class="dataitem">
                                <p class="dataitemtitle">تاریخ تولد</p>
                                <p class="dataitemvalue">{customerInfo.birth ? moment(customerInfo.birth, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : 'وارد نشده'} </p>
                            </div>
                            <div class="dataitem">
                                <p class="dataitemtitle">خرید کل</p>
                                <p class="dataitemvalue">{customerInfo.wallet?customerInfo.wallet.shopping_value:'null'}</p>
                            </div>
                            <div class="dataitem">
                                <p class="dataitemtitle">جنسیت</p>
                                <p class="dataitemvalue">{customerInfo.gender == 0 ? 'زن' : 'مرد'}</p>
                            </div>
                            <div class="dataitem">
                                <p class="dataitemtitle">وضعیت تاهل</p>
                                <p class="dataitemvalue">{customerInfo.marital == 1 ? 'متاهل' : customerInfo.marital == 0 ? 'مجرد' : 'تایین نشده'}</p>
                            </div>
                            <div class="dataitem">
                                <p class="dataitemtitle">موبایل</p>
                                <p class="dataitemvalue">{customerInfo.mobile}</p>
                            </div>
                            <div class="dataitem">
                                <p class="dataitemtitle">دفعات سفارش</p>
                                <p class="dataitemvalue">؟؟</p>
                            </div>
                        </div>
                    </div>
                </section>}
            <section>
                <div class="sectionrow column">
                    <div class="tabs">
                        <button class={`tablinks ${tabName == 'likes' ? 'active' : ''}`} id="defaultOpen" onClick={() => setTabName('likes')}>مورد علاقه‌ها</button>
                        <button class={`tablinks ${tabName == 'carts' ? 'active' : ''}`} onClick={() => setTabName('carts')}>ذخیره‌شده‌ها</button>
                        <button class={`tablinks ${tabName == 'discountRequests' ? 'active' : ''}`} onClick={() => setTabName('discountRequests')}>تخفیف‌ها</button>
                        <button class={`tablinks ${tabName == 'inventoryRequests' ? 'active' : ''}`} onClick={() => setTabName('inventoryRequests')}>موجودی‌ها</button>
                        <button class={`tablinks ${tabName == 'addresses' ? 'active' : ''}`} onClick={() => setTabName('addresses')}>آدرس‌ها</button>
                        <button class={`tablinks ${tabName == 'orders' ? 'active' : ''}`} onClick={() => setTabName('orders')}>خریدهای اخیر</button>
                    </div>
                    <div id="likes" class="tabcontent">
                        <div class="table">
                            <div class="tableheader">
                                <div class="tableactions">
                                    <div class="selectall">
                                        <input
                                            checked={selectAll} onClick={handleSelectAll}
                                            type="checkbox" id="selectall" name="selectall" value="all" />
                                        <label for="selectall">انتخاب همه</label>
                                    </div>
                                    {/* {TODO:delete action items} */}
                                    <button class="removeselected inactive"><i class="remove"></i></button>
                                </div>
                                <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                            </div>
                            {tabName == 'likes' &&
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>نام محصول</div>
                                            </th>
                                            <th>
                                                <div>موجودی</div>
                                            </th>
                                            <th>
                                                <div>واحد فروش</div>
                                            </th>
                                            <th>
                                                <div>پسند</div>
                                            </th>
                                            <th>
                                                <div>درخواست تخفیف</div>
                                            </th>
                                            <th>
                                                <div>درخواست موجودی</div>
                                            </th>
                                            <th>
                                                <div>فروش (تومان)</div>
                                            </th>
                                            <th>
                                                <div></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actions && actions.map((data, index) =>
                                            <tr key={index}>
                                                <td>
                                                    <a href="product.html">موز ایرانی</a>
                                                </td>
                                                <td>
                                                    <div>3</div>
                                                </td>
                                                <td>
                                                    <div>1 کیلوگرم</div>
                                                </td>
                                                <td>
                                                    <div>5</div>
                                                </td>
                                                <td>
                                                    <div>1</div>
                                                </td>
                                                <td>
                                                    <div>2</div>
                                                </td>
                                                <td>
                                                    <div>30000</div>
                                                </td>
                                                <th>
                                                    <div><input
                                                        checked={isSelected(data)} onClick={() => handleSelectItem(data)}
                                                        type="checkbox" id="product-select-1" name="product-select-1" value="1" /></div>
                                                </th>
                                            </tr>)}
                                    </tbody>
                                </table>
                            }
                            {tabName == 'carts' &&
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>نام سبد</div>
                                            </th>
                                            <th>
                                                <div>تعداد محصول</div>
                                            </th>
                                            <th>
                                                <div>تعداد سفارش</div>
                                            </th>
                                            <th>
                                                <div>قیمت</div>
                                            </th>
                                            <th>
                                                <div>تاریخ آخرین سفارش</div>
                                            </th>
                                            <th>
                                                <div></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actions && actions.map((data, index) =>
                                            <tr>
                                                <td>
                                                    <a href="savedcart.html">{data.title}</a>
                                                </td>
                                                <td>
                                                    <div>??</div>
                                                </td>
                                                <td>
                                                    <div>??</div>
                                                </td>
                                                <td>
                                                    <div>??</div>
                                                </td>
                                                <td>
                                                    <div>??</div>
                                                </td>
                                                <th>
                                                    <div><input checked={isSelected(data)} onClick={() => handleSelectItem(data)} type="checkbox" id="product-select-1" name="product-select-1" value="1" /></div>
                                                </th>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            }
                            {tabName == 'discountRequests' &&
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>نام محصول</div>
                                            </th>
                                            <th>
                                                <div>موجودی</div>
                                            </th>
                                            <th>
                                                <div>واحد فروش</div>
                                            </th>
                                            <th>
                                                <div>پسند</div>
                                            </th>
                                            <th>
                                                <div>درخواست تخفیف</div>
                                            </th>
                                            <th>
                                                <div>درخواست موجودی</div>
                                            </th>
                                            <th>
                                                <div>فروش (تومان)</div>
                                            </th>
                                            <th>
                                                <div></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actions && actions.map((data, index) =>
                                            <tr>
                                                <td>
                                                    <a href="product.html">موز ایرانی</a>
                                                </td>
                                                <td>
                                                    <div>3</div>
                                                </td>
                                                <td>
                                                    <div>1 کیلوگرم</div>
                                                </td>
                                                <td>
                                                    <div>5</div>
                                                </td>
                                                <td>
                                                    <div>1</div>
                                                </td>
                                                <td>
                                                    <div>2</div>
                                                </td>
                                                <td>
                                                    <div>30000</div>
                                                </td>
                                                <th>
                                                    <div><input checked={isSelected(data)} onClick={() => handleSelectItem(data)} type="checkbox" id="product-select-1" name="product-select-1" value="1" /></div>
                                                </th>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            }
                            {tabName == 'inventoryRequests' &&
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>نام محصول</div>
                                            </th>
                                            <th>
                                                <div>موجودی</div>
                                            </th>
                                            <th>
                                                <div>واحد فروش</div>
                                            </th>
                                            <th>
                                                <div>پسند</div>
                                            </th>
                                            <th>
                                                <div>درخواست تخفیف</div>
                                            </th>
                                            <th>
                                                <div>درخواست موجودی</div>
                                            </th>
                                            <th>
                                                <div>فروش (تومان)</div>
                                            </th>
                                            <th>
                                                <div></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actions && actions.map((data, index) =>
                                            <tr>
                                                <td>
                                                    <a href="product.html">موز ایرانی</a>
                                                </td>
                                                <td>
                                                    <div>3</div>
                                                </td>
                                                <td>
                                                    <div>1 کیلوگرم</div>
                                                </td>
                                                <td>
                                                    <div>5</div>
                                                </td>
                                                <td>
                                                    <div>1</div>
                                                </td>
                                                <td>
                                                    <div>2</div>
                                                </td>
                                                <td>
                                                    <div>30000</div>
                                                </td>
                                                <th>
                                                    <div><input checked={isSelected(data)} onClick={() => handleSelectItem(data)} type="checkbox" id="product-select-1" name="product-select-1" value="1" /></div>
                                                </th>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            }
                            {tabName == 'addresses' &&

                                // actions && actions.map((data, index) =>
                                //     <div className='address-session'>
                                //         <div>
                                //             <div>
                                //                 <div>عنوان</div>
                                //                 <div>{data.title}</div>
                                //             </div>
                                //             <div>
                                //                 <div>آدرس</div>
                                //                 <div>{data.address}</div>
                                //             </div>
                                //         </div>
                                //         <div><input checked={isSelected(data)} onClick={() => handleSelectItem(data)} type="checkbox" id="product-select-1" name="product-select-1" value="1" /></div>
                                //     </div>
                                // )
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>عنوان آدرس</div>
                                            </th>
                                            <th>
                                                <div>شماره تلفن</div>
                                            </th>
                                            <th>
                                                <div>آدرس</div>
                                            </th>
                                            {/* <th>
                                                <div>تعداد ارسال</div>
                                            </th> */}
                                            <th>
                                                <div></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actions && actions.map((data, index) =>
                                            <tr>
                                                <td>
                                                    <a href="addresses.html">{data.title}</a>
                                                </td>
                                                <td>
                                                    <div>{data.phone_number}</div>
                                                </td>
                                                {/* <td>
                                                    <div>12</div>
                                                </td> */}
                                                <td>
                                                    <div>{data.address}</div>
                                                </td>
                                                <th>
                                                    <div><input checked={isSelected(data)} onClick={() => handleSelectItem(data)} type="checkbox" id="product-select-1" name="product-select-1" value="1" /></div>
                                                </th>
                                            </tr>)}
                                    </tbody>
                                </table>
                            }
                            {tabName == 'orders' &&
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>وضعیت</div>
                                            </th>
                                            <th>
                                                <div>قیمت کل</div>
                                            </th>
                                            <th>
                                                <div>تاریخ سفارش</div>
                                            </th>
                                            <th>
                                                <div>تاریخ ارسال</div>
                                            </th>
                                            <th>
                                                <div>تعداد محصول</div>
                                            </th>
                                            <th>
                                                <div></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actions && actions.map((data, index) =>
                                            <tr>
                                                <td>
                                                    <a href="singleorder.html">{config.status[data.status]}</a>
                                                </td>
                                                <td>
                                                    <div>{data.total_price}</div>
                                                </td>
                                                <td>
                                                    <div>{config.convertDate(data.created_at)}</div>
                                                </td>
                                                <td>
                                                    <div>{config.convertDate(data.send_date) ? config.convertDate(data.send_date) : 'تایین نشده'}</div>
                                                </td>
                                                <td>
                                                    <div>?</div>
                                                </td>
                                                <th>
                                                    <div><input checked={isSelected(data)} onClick={() => handleSelectItem(data)} type="checkbox" id="product-select-1" name="product-select-1" value="1" /></div>
                                                </th>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            }
                            <Pagination lastPage={pages} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CustomrSingle
