import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'
import moment from 'jalali-moment'
import { Link, useHistory } from 'react-router-dom'

function Comments(props) {
    const history = useHistory()
    const [comments, setComments] = useState()
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
            setSelectedData(comments)
        }
        setSelectAll(!selectAll)
    }

    const handleGetcomments = () => {
        api.commentsList(rowCount, currentPage).then(res => {
            console.log(res, 'get comments')
            setComments(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }
    const handleDeleteComment = () => {
        let ids = []
        selectedData.forEach((data) => {
            // api.commentsDelete(data.id).then(res => {
            //     console.log(res, 'delete')
            // }).catch(e => { console.log(e.response) })
            ids.push(data.id)
        })
        let body = { action: 'delete', model: 'comment', ids }
        api.multipleAction(body).then(res => {
            console.log(res, 'delete comments')
            if (currentPage == 1) { handleGetcomments() }
            else { setCurrentPage(1) }
        }).catch(e => {
            console.log(e.response)
        })
    }
    useEffect(() => {
        handleGetcomments()
        console.log('useeffect')
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            handleGetcomments()
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
                    <a href="#">مدیریت مشتریان</a>
                    <i class="breaddivider">{'>'}</i>
                </li>
                <li>
                    <a href="#">نظرات</a>
                </li>
            </ul>
            <div class="table">
                <div class="tableheader">
                    <div class="tableactions">
                        {/* FIXME : make comments filter page */}
                        <a onClick={() => history.push('/customers-CustomerFilter')} class="filter"><i class="filtericon"></i></a>
                        <div class="selectall">
                            <input
                                checked={selectAll} onClick={handleSelectAll}
                                type="checkbox" id="selectall" name="selectall" value="all" />
                            <label for="selectall">انتخاب همه</label>
                        </div>
                        <button onClick={handleDeleteComment} class="removeselected inactive"><i class="remove"></i></button>
                    </div>
                    <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div>نظردهنده</div>
                            </th>
                            <th>
                                <div>وضعیت</div>
                            </th>
                            <th>
                                <div>زمان و تاریخ</div>
                            </th>
                            <th>
                                <div>نمره</div>
                            </th>
                            <th>
                                <div>محصول مرتبط</div>
                            </th>
                            <th>
                                <div>عنوان</div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments && comments.map((data, index) =>
                            <tr>
                                <td>
                                    <a href="comment.html">سیدمحسن علوی نسب سوق</a>
                                </td>
                                <td>
                                    <div>عدم تایید</div>
                                </td>
                                <td>
                                    <div>1400/01/01 - 16:43</div>
                                </td>
                                <td>
                                    <div>5</div>
                                </td>
                                <td>
                                    <div><a href="product.html">موز ایرانی</a></div>
                                </td>
                                <td>
                                    <div>الب الب الب الب الب الب الب الب الب الب الب الب </div>
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
        </main>
    )
}

export default Comments
