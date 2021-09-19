import React, { useState, useEffect } from 'react'
import api from '../../../../tools/API'
import { useHistory } from 'react-router-dom'
import { RowCount, Pagination } from '../../../components'

function Index() {
    const history = useHistory()
    const [categories, setCategories] = useState()

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
            setSelectedData(categories)
        }
        setSelectAll(!selectAll)

    }

    const handleGetCategories = () => {
        api.categoriesList(20, 1).then(res => {
            console.log(res, 'setCategories');
            setCategories(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => [
            console.log(e.repsonse)
        ])
    }

    const handleDeleteCategory = () => {
        selectedData.forEach((data, index) => {
            api.categoriesDelete(data.id).then(res => {
                console.log(res, 'delete')
            }).catch(e => { console.log(e.response) })
        })
        if(currentPage==1){handleGetCategories()}
        else{setCurrentPage(1)}
    }

    useEffect(() => {
        handleGetCategories()
        console.log('useeffect')
    }, [currentPage])
    useEffect(() => {
        if (currentPage === 1) {
            handleGetCategories()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    console.log(categories, 'categories')
    return (
        <main>
            <header>
                <a onClick={() => history.push('/products-CategoryStore')} class="primerybtn">ایجاد دسته‌بندی جدید</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">محصولات</a>
                    <i class="breaddivider">{'<'}</i>
                </li>
                <li>
                    <a href="#">دسته‌بندی‌ها</a>
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
                        <button onClick={handleDeleteCategory} class="removeselected inactive"><i class="remove"></i></button>
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
                                <div>لاین</div>
                            </th>
                            <th>
                                <div>نمایش در اپلیکیشن</div>
                            </th>
                            <th>
                                <div>اولویت</div>
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
                        {categories && categories.map((data, index) =>
                            <tr key={index} >
                                <td>
                                    <div onClick={() => history.push('/products-CategorySingle', { data })}>{data.title}</div>
                                </td>
                                <td>
                                    <div>{data.line_sale.title}</div>
                                </td>
                                <td>
                                    <div>{data.status ? 'نمایش' : 'عدم نمایش'}</div>
                                </td>
                                <td>
                                    <div>{data.order}</div>
                                </td>
                                <td>
                                    <div>{data.products_count}</div>
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

export default Index
