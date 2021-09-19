import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'
import moment from 'jalali-moment'
import { Link, useHistory } from 'react-router-dom'

function Checkout() {
    const history = useHistory()
    const [checkoutReq, setCheckoutReq] = useState()
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
            setSelectedData(checkoutReq)
        }
        setSelectAll(!selectAll)
    }

    const handleGetCheckoutReq = () => {
        api.settlementsList(rowCount, currentPage).then(res => {
            console.log(res, 'get customers')
            setCheckoutReq(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }
    const handleDeleteCheckoutReq = () => {
        selectedData.forEach((data) => {
            api.customersDelete(data.id).then(res => {
                console.log(res, 'delete')
            }).catch(e => { console.log(e.response) })
        })
        if(currentPage==1){handleGetCheckoutReq()}
        else{setCurrentPage(1)}
    }
    useEffect(() => {
        handleGetCheckoutReq()
        console.log('useeffect')
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            handleGetCheckoutReq()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    return (

        <main>
            <header>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">مدیریت مالی</a>
                    <i class="breaddivider">{'<'}</i>
                </li>
                <li>
                    <a href="#">درخواست‌های تسویه</a>
                </li>
            </ul>
            <div class="table">
                <div class="tableheader">
                    <div class="tableactions">
                        <div class="selectall">
                            <input type="checkbox" id="selectall" name="selectall" value="all" />
                            <label for="selectall">انتخاب همه</label>
                        </div>
                        <button
                            checked={selectAll} onClick={handleSelectAll}
                            onClick={handleDeleteCheckoutReq} class="removeselected inactive"><i class="remove"></i></button>
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
                                <div>مبلغ (تومان)</div>
                            </th>
                            <th>
                                <div>تاریخ و زمان</div>
                            </th>
                            <th>
                                <div>وضعیت</div>
                            </th>
                            <th>
                                <div>شماره پیگیری</div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkoutReq && checkoutReq.map((data, index) =>
                            <tr key={index}>
                                <td>
                                    <a href="purification.html">{data.customer?data.customer.name?data.customer.name:data.customer.mobile:'نامشخص'}</a>
                                </td>
                                <td>
                                    <div>{data.value}</div>
                                </td>
                                <td>
                                    <div>{`${config.convertDate(data.created_at)} - ${config.getTime(data.created_at)}`}</div>
                                </td>
                                <td>
                                    <div>????</div>
                                </td>
                                <td>
                                    <div>????</div>
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

export default Checkout
