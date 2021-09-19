import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'
import moment from 'jalali-moment'

function Transactions() {
    const history = useHistory()
    const [transactionsList, setTransactionstList] = useState([])
    const [pages, setPages] = useState(1)
    const [rowCount, setRowCount] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const [selectedData, setSelectedData] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [loading, setLoading] = useState(false)

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
            setSelectedData(transactionsList)
        }
        setSelectAll(!selectAll)

    }

    const getTransactionsList = () => {
        console.log('in function')
        api.transactionsList(rowCount, currentPage).then(res => {
            console.log(res, 'res')
            setTransactionstList(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }
    const handleDeleteTransaction = () => {
        selectedData.forEach((data, index) => {
            api.productDelete(data.id).then(res => {
                console.log(res, 'delete')
            }).catch(e => { console.log(e.response) })
        })
       if(currentPage==1){ getTransactionsList()}
       else{setCurrentPage(1)}
    }

    useEffect(() => {
        getTransactionsList()
        console.log('useeffect')
    }, [currentPage])
    useEffect(() => {
        if (currentPage === 1) {
            getTransactionsList()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    return (
        <main>
            <header>
                <a class="primerybtn">??ایجاد تراکنش جدید</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">مدیریت مالی</a>
                    <i class="breaddivider">{'>'}</i>
                </li>
                <li>
                    <a href="#">تراکنش‌ها</a>
                </li>
            </ul>
            <div class="table">
                <div class="tableheader">
                    {/* <div class="tableactions">
                        <a href="transactionfilter.html" class="filter"><i class="filtericon"></i></a>
                        <div class="selectall">
                            <input
                                checked={selectAll} onClick={handleSelectAll}
                                type="checkbox" id="selectall" name="selectall" value="all" />
                            <label for="selectall">انتخاب همه</label>
                        </div>
                        <button onClick={handleDeleteTransaction} class="removeselected inactive"><i class="remove"></i></button>
                    </div> */}
                    <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div>نوع تراکنش</div>
                            </th>
                            <th>
                                <div>نام(تلفن) کاربر</div>
                            </th>
                            <th>
                                <div>شماره پیگیری</div>
                            </th>
                            <th>
                                <div>مبلغ (تومان)</div>
                            </th>
                            <th>
                                <div>تاریخ و زمان</div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsList && transactionsList.map((data, index) =>
                            <tr key={index}>
                                <td>
                                    <div>{data.title}</div>
                                </td>
                                <td>
                                    <div>{data.customer.name ? data.customer.name : data.customer.mobile}</div>
                                </td>
                                <td>
                                    <div>{data.transaction_id}</div>
                                </td>
                                <td>
                                    <div>{data.value}</div>
                                </td>
                                <td>
                                    <div>{`${config.convertDate(data.created_at)} - ${config.getTime(data.created_at)}`}</div>
                                </td>
                                {/* <th>
                                    <div><input
                                        checked={isSelected(data)} onClick={() => handleSelectItem(data)}
                                        type="checkbox" id="category-select-1" name="category-select-1" value="1" /></div>
                                </th> */}
                            </tr>)}
                    </tbody>
                </table>
                <Pagination lastPage={pages} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
            </div>
        </main>
    )
}

export default Transactions
