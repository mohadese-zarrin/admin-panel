import React, { useState, useEffect } from 'react'
import api from '../../../../tools/API'
import { RowCount, Pagination } from '../../../components'

function Index() {
    const [SUInfo, setSUInfo] = useState({
        title: '',
        base_value: null,
        status: true
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

    const storSaleUnit = () => {
        api.unitsStore(SUInfo).then(res => {
            console.log(res);
            handleGetSalesUnits()
            // setSUInfo({title: '',base_value: null,status: true})
        }).catch(e => {
            console.log(e.response);
        })
    }

    const handleGetSalesUnits = () => {
        api.unitsList(rowCount, currentPage).then(res => {
            console.log(res);
            setData(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response);
        })
    }
    const handleDeleteSaleUnits = () => {
        selectedData.forEach((data,index)=>{
            api.unitsDelete(data.id).then(res=>{
                console.log(res,'delete')
            }).catch(e=>{console.log(e.response)})
        })
        if(currentPage==1){handleGetSalesUnits()}
        else{setCurrentPage(1)}
    }

    useEffect(() => {
        handleGetSalesUnits()
        console.log('useeffect')
    }, [currentPage])
    useEffect(() => {
        if (currentPage === 1) {
            handleGetSalesUnits()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])

    return (
        <main>
            <ul class="breadcrumd">
                <li>
                    <a href="#">محصولات</a>
                    <i class="breaddivider">{"<"}</i>
                </li>
                <li>
                    <a href="#">واحدهای فروش</a>
                </li>
            </ul>
            <div class="tablewithform">
                <div class="form">
                    <form action="#">
                        <ul class="breadcrumd">
                            <li>
                                <a href="#">ایجاد واحد فروش جدید</a>
                            </li>
                        </ul>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>مقدار پایه</p>
                                <input onChange={e => setSUInfo({ ...SUInfo, base_value: parseInt(e.target.value) })} type="text" id="linetitle" name="linetitle" placeholder="مثلا 100" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>واحد</p>
                                <input onChange={e => setSUInfo({ ...SUInfo, title: e.target.value })} type="text" id="linepriority" name="linepriority" placeholder="مثلا گرم" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>

                    </form>
                    <input onClick={storSaleUnit} type="submit" value="افزودن" class="fullbtn" />
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
                            <button onClick={handleDeleteSaleUnits} class="removeselected inactive"><i class="remove"></i></button>
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
                                    <div>دفعات استفاده</div>
                                </th>
                                <th>
                                    <div></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((data, index) =>
                                <tr key={index}>
                                    <td>
                                        <div>{`${data.base_value} ${data.title}`}</div>
                                    </td>
                                    <td>
                                        <div>?</div>
                                    </td>
                                    <th>
                                        <div><input
                                            checked={isSelected(data)} onClick={() => handleSelectItem(data)}
                                            type="checkbox" id="category-select-1" name="category-select-1" value="1" /></div>
                                    </th>
                                </tr>
                            )}
                            {/* <tr>
                                <td>
                                    <div>100 گرم</div>
                                </td>
                                <td>
                                    <div>10</div>
                                </td>
                                <th>
                                    <div><input type="checkbox" id="category-select-1" name="category-select-1" value="1" /></div>
                                </th>
                            </tr> */}
                        </tbody>
                    </table>
                    <Pagination lastPage={pages} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
                </div>
            </div>
        </main>
    )
}

export default Index
