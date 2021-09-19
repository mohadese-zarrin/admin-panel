import React, { useState, useEffect } from 'react'
import api from '../../../../tools/API'
import { RowCount, Pagination } from '../../../components'

function Index() {
    const [tagInfo, setTagInfo] = useState({
        title: '',
        order: null,
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

    const handleStoreTag = () => {
        api.tagStore(tagInfo).then(res => {
            console.log(res);
            handleGetTags()
            // settagInfo({title: '',base_value: null,status: true})
        }).catch(e => {
            console.log(e.response);
        })

    }

    const handleGetTags = () => {
        api.tagList(rowCount, currentPage).then(res => {
            console.log(res);
            setData(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response);
        })
    }

    const handleDeleteTags = () => {
        selectedData.forEach((data, index) => {
            api.tagDelete(data.id).then(res => {
                console.log(res, 'delete')
            }).catch(e => { console.log(e.response) })
        })
        if(currentPage==1){handleGetTags()}
        else{setCurrentPage(1)}
    }

    useEffect(() => {
        handleGetTags()
        console.log('useeffect')
    }, [currentPage])
    useEffect(() => {
        if (currentPage === 1) {
            handleGetTags()
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
                    <a href="#">برچسب‌ها</a>
                </li>
            </ul>
            <div class="tablewithform">
                <div class="form">
                    <form action="#">
                        <ul class="breadcrumd">
                            <li>
                                <a href="#">ایجاد برچسب جدید</a>
                            </li>
                        </ul>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>عنوان</p>
                                <input onChange={(e) => setTagInfo({ ...tagInfo, title: e.target.value })} type="text" id="linetitle" name="linetitle" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>اولویت</p>
                                <input onChange={(e) => setTagInfo({ ...tagInfo, order: parseInt(e.target.value) })} type="text" id="linepriority" name="linepriority" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                    </form>
                    <input onClick={handleStoreTag} type="submit" value="افزودن" class="fullbtn" />
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
                            <button onClick={handleDeleteTags} class="removeselected inactive"><i class="remove"></i></button>
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
                                    <div>دفعات استفاده</div>
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

                        </tbody>
                    </table>
                    <Pagination lastPage={pages} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
                </div>
            </div>
        </main>
    )
}

export default Index
