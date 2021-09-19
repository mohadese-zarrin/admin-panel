import React, { useState, useEffect } from 'react'
import api from '../../../../tools/API'
import { RowCount, Pagination } from '../../../components'

function Index(props) {
    const [lineInfo, setLineInfo] = useState({
        title: '',
        order: null
    })
    const [data, setData] = useState()
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
            setSelectedData(data)
        }
        setSelectAll(!selectAll)
    }

    const handleOnchangeInfo = (e) => {
        const { name, value } = e
        setLineInfo({ ...lineInfo, [name]: value })
    }

    const handleCreateline = () => {
        console.log('handleCreateline');
        const body = {
            title: lineInfo.title,
            order: lineInfo.order
        }
        api.lineStore(body).then(res => {
            console.log(res, 'res')
            handleGetLines()
        }).catch(e => {
            console.log(e)
        })
        console.log(body, 'body');
    }
    const handleGetLines = () => {
        api.lineList(rowCount, currentPage).then(res => {
            console.log(res)
            setData(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => [
            console.log(e.response)
        ])
    }
    const handleDeleteLine = () => {
        selectedData.forEach((data,index)=>{
            api.lineDelete(data.id).then(res=>{
                console.log(res,'delete')
            }).catch(e=>{console.log(e.response)})
        })
        if(currentPage==1){handleGetLines()}
        else{setCurrentPage(1)}
    }

    useEffect(() => {
        handleGetLines()
    }, [currentPage])
    useEffect(() => {
        if (currentPage === 1) {
            handleGetLines()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    return (
        <main>
            <ul class="breadcrumd">
                <li>
                    <a href="#">محصولات</a>
                    <i class="breaddivider">{'<'}</i>
                </li>
                <li>
                    <a href="#">لاین</a>
                </li>
            </ul>
            <div class="tablewithform">
                <div class="form">
                    <form >
                        <ul class="breadcrumd">
                            <li>
                                <a href="#">ایجاد لاین جدید</a>
                            </li>
                        </ul>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>عنوان</p>
                                <input onChange={(e) => handleOnchangeInfo({ value: e.target.value, name: 'title' })} type="text" id="linetitle" name="linetitle" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>اولویت</p>
                                <input onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'order' })} type="text" id="linepriority" name="linepriority" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                    </form>
                    <input onClick={handleCreateline} type="submit" value="افزودن" class="fullbtn" />
                </div>
                <div class="table">
                    <div class="tableheader">
                        <div class="tableactions">
                            <div class="selectall">
                                <input
                                    checked={selectAll} onClick={handleSelectAll}
                                    type="checkbox" id="selectall" name="selectall" value="all" />
                                <label for="selectall">انتخاب همه</label>
                            </div>
                            <button onClick={handleDeleteLine} class="removeselected inactive"><i class="remove"></i></button>
                        </div>
                        <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <div>عنوان</div>
                                </th>
                                <th>
                                    <div>اولویت</div>
                                </th>
                                <th>
                                    <div></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((data, index) =>
                                <tr>
                                    <td>
                                        <div>{data.title}</div>
                                    </td>
                                    <td>
                                        <div>{data.order}</div>
                                    </td>
                                    <th>
                                        <div><input
                                            checked={isSelected(data)} onClick={()=>handleSelectItem(data)}
                                            type="checkbox" id="category-select-1" name="category-select-1" value="1" /></div>
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

export default Index
