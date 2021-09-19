import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'
import moment from 'jalali-moment'
import { Link, useHistory } from 'react-router-dom'


function Gift(props) {
    const history = useHistory()
    const [gifts, setGifts] = useState()

    const [giftInfo, setGiftInfo] = useState({
        mobile: '',
        value: ''
    })
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
            setSelectedData(gifts)
        }
        setSelectAll(!selectAll)
    }

    const handleGetgifts = () => {
        api.giftsList(rowCount, currentPage).then(res => {
            console.log(res, 'get gift')
            setGifts(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }
    // TODO: delete items
    const handleDeletegifts = () => {
        selectedData.forEach((data) => {
            api.customersDelete(data.id).then(res => {
                console.log(res, 'delete')
            }).catch(e => { console.log(e.response) })
        })
        if(currentPage==1){handleGetgifts()}
        else{setCurrentPage(1)}
    }
    const handleStoreGift = () => {
        let data=giftInfo
        data.mobile=giftInfo.mobile.replace(/^0+/, '')
        api.giftStore(data).then(res=>{
            console.log(res,'gift store')
            if(currentPage===1){handleGetgifts()}
            else{setCurrentPage(1)}
        }).catch(e=>{
            console.log('errorr')
            console.log(e.response)
        })
    }

    useEffect(() => {
        handleGetgifts()
        console.log('useeffect')
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            handleGetgifts()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    console.log(giftInfo, 'giftInfo')
    return (
        <main>
            <header>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">مدیریت مالی</a>
                    <i class="breaddivider">{`>`}</i>
                </li>
                <li>
                    <a href="#">هدیه</a>
                </li>
            </ul>
            <div class="tablewithform">
                <div class="form">
                    <form>
                        <ul class="breadcrumd">
                            <li>
                                <a href="#">ایجاد هدیه جدید</a>
                            </li>
                        </ul>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>تلفن مشتری</p>
                                <input type='number' onChange={(e) => setGiftInfo({ ...giftInfo, mobile: e.target.value })} type="text" id="linetitle" name="linetitle" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>مبلغ</p>
                                <input onChange={(e) => setGiftInfo({ ...giftInfo, value: e.target.value })} type="text" id="linepriority" name="linepriority" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>

                    </form>
                    <input onClick={() => handleStoreGift()} type="submit" value="افزودن" class="fullbtn" />
                </div>
                <div class="table">
                    <div class="tableheader">
                        <div class="tableactions">
                            <div class="selectall">
                                <input type="checkbox" id="selectall" name="selectall" value="all" />
                                <label for="selectall">انتخاب همه</label>
                            </div>
                            <button class="removeselected inactive"><i class="remove"></i></button>
                        </div>
                        <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <div>تلفن مشتری</div>
                                </th>
                                <th>
                                    <div>مبلغ (تومان)</div>
                                </th>
                                <th>
                                    <div></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {gifts && gifts.map((data, index) =>
                                <tr key={index}>
                                    <td>
                                        <div>{data.customer.mobile}</div>
                                    </td>
                                    <td>
                                        <div>{data.value}</div>
                                    </td>
                                    <th>
                                        <div><input type="checkbox" id="category-select-1" name="category-select-1" value="1" /></div>
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination lastPage={pages} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
                </div>
            </div>
        </main>
    )
}

export default Gift
