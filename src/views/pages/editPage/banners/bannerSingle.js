import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../tools/API'
import { Link, useParams, useHistory } from 'react-router-dom'
import config from '../../../../tools/Globals'
import CategoriesList from '../../products/category/categotyList'
import TagsList from '../../products/tags/tagsList'

function BannerStore(props) {
    const history = useHistory()
    const id = props.match.params.id
    const discountTypes = [{ lable: 'درصدی', value: 'percent' }, { lable: 'مبلغ ثابت', value: 'amount' }]
    const [banerInfo, setBanerInfo] = useState({
        color_id: null,
        category: null,
        tag: null,
        status: false,
        image_id: null,
        link: '',
        type: 'category',
        value: null,
        order: 1
    })
    const [modal, setModal] = useState({
        categories: false,
        tags: false
    })
    const [imagePrev, setImagePrev] = useState()
    const [colors, setColors] = useState()
    const inputRef = useRef(null)

    const handleOnchangeInfo = (e) => {
        const { name, value } = e
        setBanerInfo({ ...banerInfo, [name]: value })
    }
    const handleGetColors = () => {
        api.colors().then(res => {
            setColors(res.data)
            handleOnchangeInfo({ value: res.data[0].id, name: 'color_id' })
        }
        ).catch(errors => {
            console.log(errors, 'errors')
        })
    }
    const handleUploadFile = (event, type) => {
        var formdata = new FormData();
        formdata.append('image', event.target.files[0])
        api.uploadImage(formdata).then(res => {
            console.log(res, 'img res');
            handleOnchangeInfo({ value: res.data.id, name: 'image_id' })
            setImagePrev(URL.createObjectURL(event.target.files[0]))
        }).catch(e => [
            console.log(e.response)
        ])
    };

    const handleUpdateBanner = (data) => {
        console.log(data, 'data')
        api.bannersUpdate(data.id,data).then(res => {
            console.log(res, 'bannersStore')
            history.goBack()
        }).catch(e => { console.log(e.response) })
    }
    const handleValidate = () => {
        if (banerInfo.image_id) {
            if (banerInfo.type == 'tag' && banerInfo.tag) {
                let newData = banerInfo
                newData.value = banerInfo.tag.id
                handleUpdateBanner(newData)
            }
            if (banerInfo.type == 'category' && banerInfo.category) {
                let newData = banerInfo
                newData.value = banerInfo.category.id
                handleUpdateBanner(newData)
            }
            if (banerInfo.type == 'link' && banerInfo.link) {
                let newData = banerInfo
                newData.value = banerInfo.link
                handleUpdateBanner(newData)
            }
        } else {
            console.log(banerInfo, 'false')
        }

    }

    const handleGetLinkInfo = (data) => {
        if (data.type == 'category') {
            api.categoriesSingle(data.value).then(res => {
                console.log(res.data)
                setBanerInfo({ ...data,image_id:data.image.id, category: res.data })
            }).catch(e => { console.log(e) })
        }
        else if (data.type == 'tag') {
            api.tagSingle(data.value).then(res => {
                console.log(res.data)
                setBanerInfo({ ...data,image_id:data.image.id, tag: res.data })
            }).catch(e => { console.log(e) })
        } else {
            setBanerInfo({ ...data,image_id:data.image.id, link: data.value })
        }
    }
    const handleGetBannerInfo = () => {
        api.bannersSingle(id).then(res => {
            console.log(res, 'get banner')
            handleGetLinkInfo(res.data)
            if (res.data.image) {
                setImagePrev(`${config.baseURL}storage/${res.data.image.path.original}`)
            }
        }).catch(e => {
            console.log(e, 'error')
        })
    }

    useEffect(() => {
        handleGetColors()
        handleGetBannerInfo()
    }, [])
    console.log(banerInfo, 'banerInfo')
    return (
        <main>
            <header>
                {/* TODO: update*/}
                <a onClick={handleValidate} class="primerybtn">ایجاد بنر جدید</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">ایجاد بنر جدید</a>
                </li>
            </ul>
            <section>
                <h2 class="sectiontitle">اطلاعات</h2>
                <div class="sectionrow">
                    <div class="input">
                        <p>تصویر شاخص</p>
                        {/* <div onClick={() => inputRef.current.click()} class="fileupload">
                            <div style={{ overflow: 'hidden' }} class="customizefileupload">
                                {files.image ?
                                    <img src={files.image} /> :
                                    <>
                                        <i class="plusicon"></i>
                                        <p>افزودن تصویر</p>
                                    </>
                                }
                            </div>
                            <input type="file" name="mainpicture" ref={inputRef} onChange={(event) => handleUploadFile(event, 'image')} />
                        </div> */}
                        <div onClick={() => inputRef.current.click()} class="fileupload fullwidth">
                            <div style={{ overflow: 'hidden' }} class="customizefileupload">
                                {imagePrev ?
                                    <img src={imagePrev} /> :
                                    <>
                                        <i class="plusicon"></i>
                                        <p>افزودن تصویر</p>
                                    </>
                                }
                            </div>
                            <input ref={inputRef} onChange={(event) => handleUploadFile(event, 'image')} type="file" name="mainpicture" />
                        </div>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="input">
                        <p>رنگ</p>
                        <div class="options">
                            {colors && colors.map((data, index) =>
                                <label onClick={() => handleOnchangeInfo({ value: data.id, name: 'color_id' })} key={index} class="container">{data.title}
                                    <input type="radio" checked={banerInfo.color_id === data.id} name="color" id={data.id} value={data.id} />
                                    <span class="checkmark"></span>
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div class="sectionrow">

                    <div class="inputwithdesc">
                        <div class="input">
                            <p>اولویت:</p>
                            <input value={banerInfo.order} onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'order' })} type="text" id="stock" name="stock" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="switches">
                        <label class="switch">
                            <p class="switchtext">فعال</p>
                            <input
                                onChange={() => handleOnchangeInfo({ value: !banerInfo.status, name: 'status' })} type="checkbox" id="special" name="special" checked={banerInfo.status} />
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </section>
            <section>
                <h2 class="sectiontitle">اتصال</h2>
                <div class="conectoptions">
                    <label class="container" for="red1">
                        <div class="listinput">
                            <div class="title">
                                <p>دسته‌بندی</p>
                                <a onClick={() => setModal({ ...modal, categories: true })}><i class="pageicon"></i>نمایش لیست دسته‌بندی</a>
                            </div>
                            <div class="lists">
                                {banerInfo.category &&
                                    <div class="listitem">
                                        <i
                                            onClick={() => handleOnchangeInfo({ value: null, name: 'category' })}
                                            class="closeicon"></i>
                                        <p>{banerInfo.category.title}</p>
                                    </div>}
                            </div>
                        </div>
                        <input
                            onClick={() => handleOnchangeInfo({ value: 'category', name: 'type' })}
                            type="radio" checked={banerInfo.type == 'category'} name="category" id="red1" value="red" />
                        <span class="checkmark"></span>
                    </label>
                    <label class="container" for="blue1">
                        <div class="listinput">
                            <div class="title">
                                <p>برچسب</p>
                                <a onClick={() => setModal({ ...modal, tags: true })}><i class="pageicon"></i>نمایش لیست برچسب‌ها</a>
                            </div>

                            <div class="lists">
                                {banerInfo.tag &&
                                    <div class="listitem">
                                        <i
                                            onClick={() => handleOnchangeInfo({ value: null, name: 'tag' })}
                                            class="closeicon"></i>
                                        <p>{banerInfo.tag.title}</p>
                                    </div>}
                            </div>
                        </div>
                        <input
                            onClick={() => handleOnchangeInfo({ value: 'tag', name: 'type' })}
                            checked={banerInfo.type == 'tag'} type="radio" name="tag" id="blue1" value='tag' />
                        <span class="checkmark"></span>
                    </label>
                    <label class="container" for="yellow1">
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>لینک بیرونی:</p>
                                <input value={banerInfo.link} onChange={(e) => handleOnchangeInfo({ value: e.target.value, name: 'link' })} type="text" id="productname" name="productname" class="w40" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                        <input
                            onClick={() => handleOnchangeInfo({ value: 'link', name: 'type' })}
                            checked={banerInfo.type == 'link'} type="radio" name="link" id="yellow1" value="yellow" />
                        <span class="checkmark"></span>
                    </label>
                </div>
            </section>
            {modal.categories && <div class={'modal'}>
                <CategoriesList single={true} onChange={(e) => handleOnchangeInfo({ value: e, name: 'category' })} back={() => setModal({ ...modal, categories: false })} />
            </div>}
            {modal.tags && <div class={'modal'}>
                <TagsList single={true} onChange={(e) => handleOnchangeInfo({ value: e, name: 'tag' })} back={() => setModal({ ...modal, tags: false })} />
            </div>}
        </main>
    )
}

export default BannerStore
