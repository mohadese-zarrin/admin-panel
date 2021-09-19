import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import { RowCount, Pagination } from '../../../components'

function Videos() {
    const videoRef = useRef(null)
    const [videoInfo, setVideoInfo] = useState({
        video_id: null,
        status: false,
        order: 1
    })
    const [videos, setVideos] = useState()

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
            setSelectedData(videos)
        }
        setSelectAll(!selectAll)
    }

    const handleOnchangeInfo = (e) => {
        const { name, value } = e
        setVideoInfo({ ...videoInfo, [name]: value })
    }
    const handleUploadFile = (event) => {
        var formdata = new FormData();
        formdata.append('video', event.target.files[0])
        api.uploadVideo(formdata).then(res => {
            console.log(res, 'video res');
            handleOnchangeInfo({ value: res.data.id, name: 'video_id' })
        }).catch(e => [
            console.log(e.response)
        ])

    };

    const storeVideo = () => {
        api.homeVideosStore(videoInfo).then(res => {
            console.log(res);
            if (currentPage === 1) { handleGetVideos() }
            else { setCurrentPage(1) }
        }).catch(e => {
            console.log(e.response);
        })
    }
    const handleGetVideos = () => {
        api.homeVideosList(rowCount, currentPage).then(res => {
            console.log(res, 'get videos')
            setVideos(res.data.data)
            setPages(res.data.meta.last_page)
        }).catch(e => {
            console.log(e.response)
        })
    }
    // const handleDeleteVideos = () => {
    //     selectedData.forEach((data) => {
    //         api.homeVideosDelete(data.id).then(res => {
    //             console.log(res, 'delete')
    //         }).catch(e => { console.log(e.response) })
    //     })
    //     if(currentPage==1){handleGetVideos()}
    //     else{setCurrentPage(1)}
    // }
    const handleDeleteVideos = () => {
        let ids = []
        selectedData.forEach((data) => {
            ids.push(data.id)
        })
        // FIXME:model of delete video
        let body = { action: 'delete', model: 'home_video', ids }
        api.multipleAction(body).then(res => {
            console.log(res, 'delete Videos')
            if (currentPage == 1) { handleGetVideos() }
            else { setCurrentPage(1) }
        }).catch(e => {
            console.log(e.response)
        })
    }
    useEffect(() => {
        handleGetVideos()
        console.log('useeffect')
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            handleGetVideos()
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
                    <a href="#">صفحه اصلی</a>
                    <i class="breaddivider"></i>
                </li>
                <li>
                    <a href="#">ویدیوها</a>
                </li>
            </ul>
            <div class="tablewithform">
                <div class="form">
                    <form>
                        <ul class="breadcrumd">
                            <li>
                                <a href="#">ایجاد ویدیو جدید</a>
                            </li>
                        </ul>
                        <div class="input column">
                            <p>ویدیو</p>
                            <div onClick={() => videoRef.current.click()} class="fileupload">
                                <div class="customizefileupload">
                                    <i class="plusicon"></i>
                                    <p>افزودن ویدیو</p>
                                </div>
                                <input type="file" name="productvideo" ref={videoRef} onChange={(event) => handleUploadFile(event)} />
                            </div>
                        </div>
                        <div class="switches">
                            <label class="switch">
                                <p class="switchtext">ویژه</p>
                                <input onChange={() => handleOnchangeInfo({ value: !videoInfo.status, name: 'status' })} type="checkbox" id="special" name="special" checked={videoInfo.status} />
                                <span class="slider"></span>
                            </label>
                        </div>
                        {/* <input onClick={storeVideo} type="submit" value="افزودن" class="fullbtn" /> */}
                    </form>
                    <input onClick={storeVideo} type="submit" value="افزودن" class="fullbtn" />
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
                            <button onClick={handleDeleteVideos} class="removeselected inactive"><i class="remove"></i></button>
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
                                    <div>تعداد نمایش</div>
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
                            {videos && videos.map((data, index) =>
                                <tr key={index}>
                                    <td>
                                        <a>
                                            {data.video && <video width="320" height="240" >
                                                <source src={`${config.baseURL}storage/${data.video.path}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>}
                                        </a>
                                    </td>
                                    <td>
                                        <div>{data.number_visits}</div>
                                    </td>
                                    <td>
                                        <div>{data.status ? 'نمایش' : 'عدم نمایش'}</div>
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

export default Videos
