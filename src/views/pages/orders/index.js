import React, { useState, useEffect, useRef } from 'react'
import api from '../../../tools/API'
import { RowCount, Pagination } from '../../components'
import { useHistory } from 'react-router-dom'
import OrderFilter from './orderFilter'
import config from '../../../tools/Globals'

function Orders() {
    const history = useHistory()
    const status = { paid: 'پرداخت شده', unpaid: 'پرداخت نشده', processing: 'در حال پردازش', waiting_to_send: 'در انتظار ارسال', sent: 'ارسال شده', delivered: 'دریافت شده', process_completion: 'تکمیل شده', returned_products: 'برگشت خورده', canceled: 'کنسل شده' }
    const [orders, setOrders] = useState()
    const [pages, setPages] = useState(1)
    const [rowCount, setRowCount] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedData, setSelectedData] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [filterModal, setFilterModal] = useState(false)
    const [filter, setfilter] = useState()

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
            setSelectedData(orders)
        }
        setSelectAll(!selectAll)
    }
    const handleGetOrders = () => {
        let srt = ''
        if (filter) {
            console.log(filter,'filter')
            Object.keys(filter).map((key, value) => {
                if (filter[key]!=null) {
                    console.log(key,'key')
                    srt = srt + `&filter[${key}]=${filter[key]}`
                }
            })
        }
        console.log(srt, 'srt')
        api.ordersList(rowCount, currentPage,srt).then(res => {
            console.log(res, 'res')
            setOrders(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }

    const handleDeleteOrders = () => {
        selectedData.forEach((data) => {
            api.ordersDelete(data.id).then(res => {
                console.log(res, 'delete')
            }).catch(e => { console.log(e.response) })
        })
        if (currentPage == 1) { handleGetOrders() }
        else { setCurrentPage(1) }
    }
    const handleFilterData = () => {

    }

    useEffect(() => {
        handleGetOrders()
        console.log('useeffect')
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            handleGetOrders()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    useEffect(() => {
        console.log('filter useeffect',filter)
        if (currentPage === 1) {
            handleGetOrders()
        } else {
            setCurrentPage(1)
        }
        setFilterModal(false)
    }, [filter])

    return (
        <main>
            <header>
                <a onClick={() => history.push('/orders-OrderStore ')} class="primerybtn">ایجاد سفارش جدید</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">سفارشات</a>
                </li>
            </ul>
            <div class="table">
                <div class="tableheader">
                    <div class="tableactions">
                        <a onClick={() => setFilterModal(true)} class="filter"><i class="filtericon"></i></a>
                        {filter&&<a onClick={() => setfilter()} class="secondrybtn">لغو فیلتر</a>}
                        <div class="selectall">
                            <input
                                checked={selectAll} onClick={handleSelectAll}
                                type="checkbox" id="selectall" name="selectall" value="all" />
                            <label for="selectall">انتخاب همه</label>
                        </div>
                        <button onClick={handleDeleteOrders} class="removeselected inactive"><i class="remove"></i></button>
                    </div>
                    <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div>نام مشتری</div>
                            </th>
                            <th>
                                <div>قیمت کل (تومان)</div>
                            </th>
                            <th>
                                <div>وضعیت</div>
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
                        {orders && orders.map((data, index) =>
                            <tr>
                                <td>
                                    <div onClick={() => history.push(`/orders-OrderSingle/${data.id}`)}>{data.name ? data.name : 'کاربر'}</div>
                                </td>
                                <td>
                                    <div>{data.final_price}</div>
                                </td>
                                <td>
                                    <div>{status[data.status]}</div>
                                </td>
                                <td>
                                    <div>{data.send_date?config.convertDate(data.send_date):'تایین نشده'}</div>
                                </td>
                                <td>
                                    <div>{data.items_count}</div>
                                </td>
                                <th>
                                    <div><input
                                        checked={isSelected(data)} onClick={() => handleSelectItem(data)}
                                        type="checkbox" id="category-select-1" name="category-select-1" value="1" /></div>
                                </th>
                            </tr>

                        )}
                    </tbody>
                </table>
                <Pagination lastPage={pages} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
            </div>
            {filterModal && <div class='modal'>
                {/* <AttributesList onChangeData={(e) => handleOnchangeInfo({ value: e, name: 'special_tags' })} back={() => setModal({ ...modal, attribute: false })} /> */}
                <OrderFilter onClick={(e) => setfilter(e)} back={() => setFilterModal(false)} />
            </div>}
        </main>

    )
}

export default Orders

