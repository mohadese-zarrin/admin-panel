import React, { useState, useEffect,useRef } from 'react'
import api from '../../../../tools/API'
import { useHistory } from 'react-router-dom'

function CategoryStore() {
    const history = useHistory()
    const inputRef = useRef(null)
    const [categoryInfo, setCategoryInfo] = useState({
        title: '',
        order: null,
        color_id: null,
        line_sale_id: null,
        status: true,
        image_id: null
    })
    const [colors, setColors] = useState([])
    const [lines, setLines] = useState([])
    const [image, setImage] = useState()

    const handleOnchangeInfo = (e) => {
        const { name, value } = e
        setCategoryInfo({ ...categoryInfo, [name]: value })
    }

    const handleGetColors = () => {
        api.colors().then(res => {
            console.log(res, 'color res');
            setColors(res.data)
        }).catch(e => [
            console.log(e)
        ])
    }
    const handleGetLines = () => {
        api.lineListAll().then(res => {
            console.log(res, 'lines res');
            setLines(res.data)
        }).catch(e => [
            console.log(e)
        ])
    }

    const onFileChange = event => {
        var imagedata = new FormData();
        imagedata.append('image', event.target.files[0])
        api.uploadImage(imagedata).then(res => {
            console.log(res, 'img res');
            handleOnchangeInfo({ value: res.data.id, name: 'image_id' })
            setImage(URL.createObjectURL(event.target.files[0]));
        }).catch(e => [
            console.log(e.response)
        ])
    };
    const handleStoreCategory = () => {
        api.categoriesStore(categoryInfo).then(res => {
            console.log(res)
            history.goBack()
        }).catch(e => {
            console.log(e.response)
        })
    }
    useEffect(() => {
        handleGetColors()
        handleGetLines()
    }, [])
    console.log(categoryInfo, '#####image*****');
    return (
        <main>
            <header>
                <a onClick={handleStoreCategory} class="primerybtn">اعمال</a>
                <a onClick={() => history.goBack()} class="secondrybtn">انصراف</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">ایجاد دسته‌بندی جدید</a>
                </li>
            </ul>
            <section>
                <h2 class="sectiontitle">اطلاعات</h2>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>نام دسته‌بندی:</p>
                            <input value={categoryInfo.title} onChange={(e) => handleOnchangeInfo({ value: e.target.value, name: 'title' })} type="text" id="stock" name="stock" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>اولویت:</p>
                            <input value={categoryInfo.order} onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'order' })} type="text" id="stock" name="stock" class="w20" />
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="inputwithdesc">
                        <div class="input">
                            <p>لاین:</p>
                            <select
                                onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'line_sale_id' })}
                                name="saleunit" id="saleunit" class="w20">
                                {lines && lines.map((data, index) =>
                                    <option key={index} value={data.id}>{data.title}</option>
                                )}
                                {/* <option value="1">میوه</option>
                                <option value="2">سبزی</option>
                                <option value="3">شیرینی</option>
                                <option value="4">خشکبار</option> */}
                            </select>
                        </div>
                        <p class="inputdesc"></p>
                    </div>
                    <div class="switches">
                        <label class="switch">
                            <p class="switchtext">نمایش</p>
                            <input
                                onChange={(e) => handleOnchangeInfo({ value: e.target.value, name: 'status' })}
                                type="checkbox"
                                id="special"
                                name="special"
                                checked={categoryInfo.status} />
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </section>
            <section>
                <h2 class="sectiontitle">مدیا</h2>
                <div class="sectionrow">
                    <div class="input">
                        <p>رنگ</p>
                        <div class="options">
                            {colors && colors.map((data, index) =>
                                <label onClick={() => handleOnchangeInfo({ value: data.id, name: 'color_id' })} key={index} class="container">{data.title}
                                    <input type="radio" checked={categoryInfo.color_id == data.id} name="color" id={data.id} value={data.id} />
                                    <span class="checkmark"></span>
                                </label>
                            )}
                            {/* <label class="container">قرمز
                                <input type="radio" checked="checked" name="color" id="red" value="red" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">آبی
                                <input type="radio" checked="checked" name="color" id="blue" value="blue" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">زرد
                                <input type="radio" checked="checked" name="color" id="yellow" value="yellow" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">صورتی
                                <input type="radio" checked="checked" name="color" id="pink" value="pink" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">سبز
                                <input type="radio" checked="checked" name="color" id="green" value="green" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">قهوه‌ای
                                <input type="radio" checked="checked" name="color" id="brown" value="brown" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">بنفش
                                <input type="radio" checked="checked" name="color" id="purple" value="purple" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">نارنجی
                                <input type="radio" checked="checked" name="color" id="orange" value="orange" />
                                <span class="checkmark"></span>
                            </label> */}
                        </div>
                    </div>
                </div>
                <div class="sectionrow">
                    <div class="input">
                        <p>تصویر شاخص</p>
                        <div onClick={() => inputRef.current.click()} class="fileupload fullwidth">
                            <div style={{ overflow: 'hidden' }} class="customizefileupload">
                                {image ?
                                    <img src={image} /> :
                                    <>
                                        <i class="plusicon"></i>
                                        <p>افزودن تصویر</p>
                                    </>
                                }
                            </div>
                            <input type="file" name="mainpicture" ref={inputRef} onChange={onFileChange} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CategoryStore
