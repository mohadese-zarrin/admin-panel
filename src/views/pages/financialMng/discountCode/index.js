import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'

function DiscountCode(props) {
    const history = useHistory()
    const [discountsList, setDiscountsList] = useState([])
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
            setSelectedData(discountsList)
        }
        setSelectAll(!selectAll)

    }

    const getdiscountsList = () => {
        api.discountsList(rowCount, currentPage).then(res => {
            console.log(res, 'res')
            setDiscountsList(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }
    const handleDeleteDiscount = () => {
        selectedData.forEach((data, index) => {
            console.log('qqqq')
            api.discountsDelete(data.id).then(res => {
                console.log(res, 'delete')
            }).catch(e => { console.log(e.response) })
        })
        if(currentPage==1){getdiscountsList()}
        else{setCurrentPage(1)}
    }

    useEffect(() => {
        getdiscountsList()
    }, [currentPage])
    useEffect(() => {
        if (currentPage === 1) {
            getdiscountsList()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    return (

        <main>
            <header>
                <a onClick={() => history.push('/financialMng-DiscountStore')} class="primerybtn">ایجاد تخفیف جدید</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">مدیریت مالی</a>
                    <i class="breaddivider">{'>'}</i>
                </li>
                <li>
                    <a href="#">کد تخفیف</a>
                </li>
            </ul>
            <div class="table">
                <div class="tableheader">
                    <div class="tableactions">
                        <div class="selectall">
                            <input
                                checked={selectAll} onClick={handleSelectAll}
                                type="checkbox" id="selectall" name="selectall" value="all" />
                            <label for="selectall">انتخاب همه</label>
                        </div>
                        <button onClick={handleDeleteDiscount} class="removeselected inactive"><i class="remove"></i></button>
                    </div>
                    <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div>کد تخفیف</div>
                            </th>
                            <th>
                                <div>مقدار</div>
                            </th>
                            <th>
                                <div>نوع</div>
                            </th>
                            <th>
                                <div>حداقل مبلغ سبد(تومان)</div>
                            </th>
                            <th>
                                <div>تعداد</div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {discountsList && discountsList.map((data, index) =>
                            <tr key={index}>
                                <td>
                                    <a onClick={()=>history.push(`/financialMng-DiscountSingle/${data.id}`)}>{data.code}</a>
                                </td>
                                <td>
                                    <div>{data.value}</div>
                                </td>
                                <td>
                                    <div>{config.discountTypes[data.type]}</div>
                                </td>
                                <td>
                                    <div>{data.order_minimum_amount}</div>
                                </td>
                                <td>
                                    <div>{data.count}</div>
                                </td>
                                <th>
                                    <div><input
                                        onChange={() => handleSelectItem(data)} checked={isSelected(data)}
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

export default DiscountCode
