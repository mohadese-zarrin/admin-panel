import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../tools/API'
import { Link, useParams, useHistory } from 'react-router-dom'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'

function Banner() {
    const history = useHistory()
    const types={category:'دسته بندی',tag:'برچسب',link:'لینک برونی'}
    const [banners, setBanners] = useState()
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
            setSelectedData(banners)
        }
        setSelectAll(!selectAll)
    }


    const handleGetBanners = () => {
        api.bannersList(rowCount, currentPage).then(res => {
            console.log(res, 'get Banners')
            setBanners(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }
    // const handleDeleteBanners = () => {
    //     selectedData.forEach((data) => {
    //         api.homeBannersDelete(data.id).then(res => {
    //             console.log(res, 'delete')
    //         }).catch(e => { console.log(e.response) })
    //     })
    //     if(currentPage==1){handleGetBanners()}
    //     else{setCurrentPage(1)}
    // }
    const handleDeleteBanners = () => {
        let ids = []
        selectedData.forEach((data) => {
            ids.push(data.id)
        })
        let body = {action: 'delete',model: 'banner',ids}
        api.multipleAction(body).then(res => {
            console.log(res, 'delete Banners')
            if (currentPage == 1) { handleGetBanners() }
            else { setCurrentPage(1) }
        }).catch(e=>{
            console.log(e.response)
        })
    }

    useEffect(() => {
        handleGetBanners()
        console.log('useeffect')
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            handleGetBanners()
        } else {
            setCurrentPage(1)
        }
    }, [rowCount])
    return (
        <main>
            <header>
                <a onClick={() => history.push('/editPage-BannerStore')} class="primerybtn">ایجاد بنر جدید</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">صفحه اصلی</a>
                    <i class="breaddivider">{ }</i>
                </li>
                <li>
                    <a href="#">بنرها</a>
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
                        <button onClick={handleDeleteBanners} class="removeselected inactive"><i class="remove"></i></button>
                    </div>
                    <RowCount value={rowCount} onChange={e => setRowCount(e.target.value)} />
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div>تصویر</div>
                            </th>
                            <th>
                                <div>لینک</div>
                            </th>
                            <th>
                                <div>تعداد کلیک</div>
                            </th>
                            <th>
                                <div>اولویت</div>
                            </th>
                            <th>
                                <div>وضعیت</div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners && banners.map((data, index) =>
                            <tr>
                                <td>
                                    <a><img onClick={()=>history.push(`/editPage-BannerSingle/${data.id}`)} src={`${config.baseURL}storage/${data.image.path.original}`} alt="banner" /></a>
                                </td>
                                <td>
                                    {/* <div onClick={() => handleSelectItem(data)}>دسته میوه</div> */}
                                    <div>{types[data.type]}</div>
                                </td>
                                <td>
                                    <div>{data.click?data.click:0}</div>
                                </td>
                                <td>
                                    <div>1</div>
                                </td>
                                <td>
                                    <div>{data.status}</div>
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

export default Banner
