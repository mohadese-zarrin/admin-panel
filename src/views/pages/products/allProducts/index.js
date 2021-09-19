import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'

function Index() {
    const history = useHistory()
    const [productList, setProductList] = useState([])
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
            setSelectedData(productList)
        }
        setSelectAll(!selectAll)

    }

    const getProductList = () => {
        api.productList(rowCount, currentPage).then(res => {
            console.log(res, 'res')
            // setProductList(res.data.data)
            // setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e,'error')
        })
    }
    // const handleDeleteProducts = () => {
    //     selectedData.forEach((data,index)=>{
    //         api.productDelete(data.id).then(res=>{
    //             console.log(res,'delete')
    //         }).catch(e=>{console.log(e.response)})
    //     })
    //     if(currentPage==1){
    //         getProductList()
    //     }else{
    //         setCurrentPage(1)
    //     }
    // }
    const handleDeleteProducts = () => {
        let ids = []
        selectedData.forEach((data) => {
            ids.push(data.id)
        })
        let body = {action: 'delete',model: 'product',ids}
        api.multipleAction(body).then(res => {
            console.log(res, 'delete customers')
            if (currentPage == 1) { getProductList() }
            else { setCurrentPage(1) }
        }).catch(e=>{
            console.log(e.response)
        })
    }

    useEffect(() => {
        getProductList()
    }, [currentPage])
    useEffect(() => {
        if (currentPage === 1) {
            getProductList()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    return (
        <main>
            <header >
                <a onClick={() => history.push('/products-StoreProduct')} class="primerybtn">ایجاد محصول جدید</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">محصولات</a>
                    <i class="breaddivider">{'>'}</i>
                </li>
                <li>
                    <a href="#">همه محصولات</a>
                </li>
            </ul>
            <div class="table">
                <div class="tableheader">
                    <div class="tableactions">
                        <div class="selectall">
                            <input
                                checked={selectAll} onClick={handleSelectAll}
                                type="checkbox" id="selectall" name="selectall" value="all"
                            />
                            <label for="selectall">انتخاب همه</label>
                        </div>
                        <button onClick={handleDeleteProducts} class="removeselected inactive"><i class="remove"></i></button>
                    </div>
                    <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div>نام محصول</div>
                            </th>
                            <th>
                                <div>موجودی</div>
                            </th>
                            <th>
                                <div>واحد فروش</div>
                            </th>
                            <th>
                                <div>درخواست تخفیف</div>
                            </th>
                            <th>
                                <div>درخواست موجودی</div>
                            </th>
                            <th>
                                <div>میزان فروش</div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList && productList.map((data, index) =>
                            <tr key={index}>
                                <td>
                                    {/* <Link to="/products-SingleProduct">{data.name}</Link> */}
                                    <div onClick={() => history.push(`/products-SingleProduct/${data.id}`)}>{data.title}</div>
                                </td>
                                <td>
                                    <div>{data.existence}</div>
                                </td>
                                <td>
                                    <div>{data.unit.title}</div>
                                </td>
                                <td>
                                    <div>{data.discount_requests_count}</div>
                                </td>
                                <td>
                                    <div>{data.inventory_requests_count}</div>
                                </td>
                                <td>
                                    <div>{data.total_sale_information ? data.total_sale_information : 0}</div>
                                </td>
                                <th>
                                    <input
                                        checked={isSelected(data)} onClick={() => handleSelectItem(data)}
                                        type="checkbox" id="product-select-1" name="product-select-1" value="1" />
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
