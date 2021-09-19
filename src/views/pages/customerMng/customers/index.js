import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'
import moment from 'jalali-moment'
import { Link, useHistory } from 'react-router-dom'

function CustomersList(props) {
    const history = useHistory()
    const [customers, setcustomers] = useState()
    const [pages, setPages] = useState(1)
    const [rowCount, setRowCount] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedData, setSelectedData] = useState([])
    const [selectAll, setSelectAll] = useState(false)

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
            setSelectedData(customers)
        }
        setSelectAll(!selectAll)
    }

    const handleGetCustomers = () => {
        api.customersList(rowCount, currentPage).then(res => {
            console.log(res, 'get customers')
            setcustomers(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }
    const handleDeleteCustomer = () => {
        let ids = []
        selectedData.forEach((data) => {
            // api.customersDelete(data.id).then(res => {
            //     console.log(res, 'delete')
            // }).catch(e => { console.log(e.response) })
            ids.push(data.id)
        })
        let body = {action: 'delete',model: 'customer',ids}
        api.multipleAction(body).then(res => {
            console.log(res, 'delete customers')
            if (currentPage == 1) { handleGetCustomers() }
            else { setCurrentPage(1) }
        }).catch(e=>{
            console.log(e.response)
        })
    }
    useEffect(() => {
        handleGetCustomers()
        console.log('useeffect')
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            handleGetCustomers()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    return (
        <main>
            <header>
                <a href="singlecustomer.html" class="primerybtn">ایجاد کاربر جدید</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">مدیریت مشتریان</a>
                    <i class="breaddivider">{'<'}</i>
                </li>
                <li>
                    <a href="#">مشتریان</a>
                </li>
            </ul>
            <div class="table">
                <div class="tableheader">
                    <div class="tableactions">
                        <a onClick={() => history.push('/customers-CustomerFilter')} class="filter"><i class="filtericon"></i></a>
                        <div class="selectall">
                            <input
                                checked={selectAll} onClick={handleSelectAll}
                                type="checkbox" id="selectall" name="selectall" value="all" />
                            <label for="selectall">انتخاب همه</label>
                        </div>
                        <button onClick={handleDeleteCustomer} class="removeselected inactive"><i class="remove"></i></button>
                    </div>
                    <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div>نام (تلفن) کاربر</div>
                            </th>
                            <th>
                                <div>تاریخ عضویت</div>
                            </th>
                            <th>
                                <div>خرید کل (تومان)</div>
                            </th>
                            <th>
                                <div>دفعات سفارش</div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers && customers.map((data, index) =>
                            <tr>
                                <td>
                                    {/* <a href="singlecustomer.html">{data.name}</a> */}
                                    {/* <a onClick={()=>history.push('/customers-CustomerSingle',{data})}>{data.mobile}</a> */}
                                    <div onClick={() => history.push(`/customers-CustomerSingle/${data.id}`)}>{data.mobile}</div>
                                </td>
                                <td>
                                    {/* <div>{data.created_at}</div> */}
                                    <div>{config.convertDate(data.created_at)}</div>

                                </td>
                                <td>
                                    <div>{data.wallet ? data.wallet.shopping_value : 'null'}</div>
                                </td>
                                <td>
                                    <div>{data.orders_count}</div>
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
        </main>
    )
}

export default CustomersList
