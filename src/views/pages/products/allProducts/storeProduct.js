import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../../../tools/API'
import config from '../../../../tools/Globals'
import axios from 'axios';
import AttributesList from '../attributes/attributesList'
import CategoriesList from '../category/categotyList'
import TagsList from '../tags/tagsList'

function StoreProduct(props) {
    const history = useHistory()
    const discountTypes = [{ lable: 'درصدی', value: 'percent' }, { lable: 'مبلغ ثابت', value: 'amount' }]
    const [productInfo, setProductInfo] = useState({
        unit_id: '',
        color_id: '',
        category_ids: [],
        pack_id: null,
        title: '',
        desc: 'store product page',
        price: '',
        tags: [],
        minimum_purchase: '',
        existence: null,
        special_discount: false,
        special: 0,
        status: true,
        commentable: 0,
        special_tags: {},
        gallery: [],
        image_id: null,
        video_id: null,
        discount: null,
        discount_type: ''
    })
    const [specialTags, setSpecialTags] = useState()
    const [info, setInfo] = useState({
        saleUnits: [],
        colors: [],
        packs: []
    })
    const inputRef = useRef(null)
    const videoRef = useRef(null)
    const galleryRef = useRef(null)

    const [modal, setModal] = useState({
        attribute: false,
        categories: false,
        tags: false
    })
    const [files, setFiles] = useState({
        image: '',
        video: '',
        gallery: []
    })
    const onchangeSpecialTags = (event, i) => {
        let newData = specialTags
        newData[i].value = event.target.value
        setSpecialTags(newData)
    }

    const handleOnchangeInfo = (e) => {
        const { name, value } = e
        setProductInfo({ ...productInfo, [name]: value })
    }
    const sendMultiReq = () => {
        axios.all([api.packsListAll(), api.unitsListAll(), api.colors()]).then(
            axios.spread((...responses) => {
                setInfo({
                    packs: responses[0].data,
                    saleUnits: responses[1].data,
                    colors: responses[2].data
                })
                setProductInfo({ ...productInfo, pack_id:responses[0].data[0].id,unit_id:responses[1].data[0].id})
            })
        ).catch(errors => {
            console.log(errors, 'errors')
        })
    }

    const handleUploadFile = (event, type) => {
        var formdata = new FormData();
        formdata.append(type === 'gallery' ? 'image' : type, event.target.files[0])
        if (type == 'image') {
            api.uploadImage(formdata).then(res => {
                console.log(res, 'img res');
                handleOnchangeInfo({ value: res.data.id, name: 'image_id' })
                setFiles({ ...files, image: URL.createObjectURL(event.target.files[0]) })
            }).catch(e => [
                console.log(e.response)
            ])
        } else if (type === 'video') {
            api.uploadVideo(formdata).then(res => {
                console.log(res, 'video res');
                handleOnchangeInfo({ value: res.data.id, name: 'video_id' })
                setFiles({ ...files, video: URL.createObjectURL(event.target.files[0]) })
            }).catch(e => [
                console.log(e.response)
            ])
        } else if (type === 'gallery') {
            api.uploadImage(formdata).then(res => {
                console.log(res, 'img res');
                handleOnchangeInfo({ value: [...productInfo.gallery, res.data.id], name: 'gallery' })
                setFiles({ ...files, gallery: [...files.gallery, URL.createObjectURL(event.target.files[0])] })
            }).catch(e => [
                console.log(e.response)
            ])
        }
    };


    const handleStoreProduct = (data) => {
        api.productStore(data).then(res => {
            console.log(res, 'productStore')
            history.goBack()
        }).catch(e => { console.log(e,'rererererere') })
    }
    const handleValidate = () => {
        let newSpecialTags = []
        let newTags = []
        let newCategoris = []
        productInfo.category_ids.forEach((data) => { newCategoris = [...newCategoris, data.id] })
        productInfo.tags.forEach((data) => { newTags = [...newTags, data.title] })
        for (let i = 0; i < specialTags.length; i++) {
            newSpecialTags =[...newSpecialTags, {[specialTags[i].id]: specialTags[i].value }]
        }
        let newData = productInfo
        newData.category_ids = newCategoris
        newData.tags = newTags
        newData.special_tags = newSpecialTags
        handleStoreProduct(newData)
    }


    useEffect(() => {
        if (props.location.state && props.location.state.data) {
            setProductInfo(props.location.state.data)
        }
        sendMultiReq()
    }, [])
    // console.log(modal, 'modal')
    console.log(productInfo, 'productInfo')
    return (
        <div>
            <main>
                <header>
                    <a onClick={handleValidate} class="primerybtn">اعمال</a>
                    <a onClick={() => history.goBack()} class="secondrybtn">انصراف</a>
                    <a href="login.html" class="logout"><i class="logouticon"></i></a>
                </header>
                <ul class="breadcrumd">
                    <li>
                        <a href="#">ایجاد محصول جدید</a>
                    </li>
                </ul>
                <section>
                    <h2 class="sectiontitle">اطلاعات</h2>
                    <div class="sectionrow">
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>نام محصول:</p>
                                <input onChange={(e) => handleOnchangeInfo({ value: e.target.value, name: 'title' })} value={productInfo.title} type="text" id="productname" name="productname" class="w60" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                    </div>
                    <div class="sectionrow">
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>توضیحات:</p>
                                <textarea value={productInfo.desc} id="description" name="description" class="w60"></textarea>
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                    </div>
                    <div class="sectionrow">
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>واحد فروش:</p>
                                <select
                                    onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'unit_id' })}
                                    name="saleunit"
                                    id="saleunit"
                                    class="w20">
                                    {info.saleUnits && info.saleUnits.map((data, index) =>
                                        <option selected={productInfo.unit_id == data.id} key={index} value={data.id}>{data.title}</option>
                                    )}
                                </select>
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>بسته بندی:</p>
                                <select
                                    onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'pack_id' })}
                                    name="pack"
                                    id="pack"
                                    class="w20">
                                    {info.packs && info.packs.map((data, index) =>
                                        <option selected={productInfo.pack_id == data.id} key={index} value={data.id}>{data.title}</option>
                                    )}
                                </select>
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                    </div>
                    <div class="sectionrow">
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>موجودی:</p>
                                <input onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'existence' })} value={productInfo.existence} type="text" id="stock" name="stock" class="w20" />
                            </div>
                            <p class="inputdesc">چند برابر واحد فروش (400 گرم) موجود است.</p>
                        </div>
                        <div class="switches">
                            <label class="switch">
                                <p class="switchtext">ویژه</p>
                                <input onChange={() => handleOnchangeInfo({ value: !productInfo.special, name: 'special' })} type="checkbox" id="special" name="special" checked={productInfo.special} />
                                <span class="slider"></span>
                            </label>
                            <label class="switch">
                                <p class="switchtext">ارسال نظر</p>
                                <input
                                    onChange={() => handleOnchangeInfo({ value: !productInfo.commentable, name: 'commentable' })}
                                    checked={productInfo.commentable}
                                    type="checkbox" id="camment" name="camment" />
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="sectionrow">
                        <div class="listinput">
                            <div class="title">
                                <p>ویژگی</p>
                                {/* <span onClick={() => history.push('/products-AttributesList', { data: productInfo })}><i class="pageicon"></i>نمایش لیست ویژگی</span> */}
                                <a onClick={() => setModal({ ...modal, attribute: true })}><i class="pageicon"></i>نمایش لیست ویژگی</a>
                            </div>
                            <div class="propertylists">
                                {specialTags && specialTags.length > 0 && specialTags.map((data, index) =>
                                    <div key={index} class="propertyitem">
                                        <i
                                            onClick={() => setSpecialTags(specialTags.filter(d => d.id !== data.id))}
                                            class="closeicon"></i>
                                        <p class="propertyitemtitle">{data.title}</p>
                                        <input
                                            onChange={(e) => onchangeSpecialTags(e, index)}
                                            type="text" id="propertyid-1" name="propertyid-1" class="w50" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>



                    <div class="sectionrow">
                        <div class="listinput">
                            <div class="title">
                                <p>دسته‌بندی</p>
                                {/* <span onClick={() => history.push('/products-CategoryList', { data: productInfo })}><i class="pageicon"></i>نمایش لیست دسته‌بندی</span> */}
                                <a onClick={() => setModal({ ...modal, categories: true })}><i class="pageicon"></i>نمایش لیست دسته‌بندی</a>
                            </div>
                            <div class="lists">
                                {productInfo.category_ids.length > 0 && productInfo.category_ids.map((data, index) =>
                                    <div key={index} class="listitem">
                                        <i
                                            onClick={() => handleOnchangeInfo({ value: productInfo.category_ids.filter(d => d.id !== data.id), name: 'category_ids' })}
                                            class="closeicon"></i>
                                        <p>{data.title}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div class="sectionrow">
                        <div class="listinput">
                            <div class="title">
                                <p>برچسب</p>
                                {/* <Link to='/products-TagsList'><i class="pageicon"></i>نمایش لیست برچسب</Link> */}
                                <a onClick={() => setModal({ ...modal, tags: true })}><i class="pageicon"></i>نمایش لیست برچسب</a>
                            </div>
                            <div class="lists">
                                {productInfo.tags.length > 0 && productInfo.tags.map((data, index) =>
                                    <div key={index} class="listitem">
                                        <i
                                            onClick={() => handleOnchangeInfo({ value: productInfo.tags.filter(d => d.id !== data.id), name: 'tags' })}
                                            class="closeicon"></i>
                                        <p>{data.title}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 class="sectiontitle">مالی</h2>
                    <div class="sectionrow">
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>قیمت:</p>
                                <input
                                    onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'price' })}
                                    type="text" id="price" name="price" class="w20" placeholder="قیمت به تومان" />
                            </div>
                            <p class="inputdesc">قیمت برای هر یک واحد فروش (هر 400 گرم)</p>
                        </div>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>حداقل فروش:</p>
                                <input
                                    onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'minimum_purchase' })}
                                    type="text" id="mainsales" name="mainsales" class="w20" />
                            </div>
                            <p class="inputdesc">حداقل چند برابر واحد فروش(400 گرم)</p>
                        </div>
                    </div>
                    <div class="sectionrow">
                        <div class="input">
                            <p>نوع تخفیف</p>
                            <div class="options">
                                {discountTypes.map((data, index) =>
                                    <label onClick={() => handleOnchangeInfo({ value: data.value, name: 'discount_type' })} key={index} class="container">{data.lable}
                                        <input type="radio" checked={productInfo.discount_type == data.value} name="'discount_type'" id={index} value={data.id} />
                                        <span class="checkmark"></span>
                                    </label>
                                )}
                            </div>
                        </div>
                        <div class="inputwithdesc">
                            <div class="input">
                                <p>میزان تخفیف:</p>
                                <input
                                    onChange={(e) => handleOnchangeInfo({ value: parseInt(e.target.value), name: 'discount' })}
                                    type="text" id="discountrate" name="discountrate" class="w20" />
                            </div>
                            <p class="inputdesc"></p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 class="sectiontitle">مدیا</h2>
                    <div class="sectionrow">
                        <div class="input">
                            <p>رنگ</p>
                            <div class="options">
                                {info.colors && info.colors.map((data, index) =>
                                    <label onClick={() => handleOnchangeInfo({ value: data.id, name: 'color_id' })} key={index} class="container">{data.title}
                                        <input type="radio" checked={productInfo.color_id == data.id} name="color" id={data.id} value={data.id} />
                                        <span class="checkmark"></span>
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div class="sectionrow">
                        <div class="input">
                            <p>تصویر شاخص</p>
                            <div onClick={() => inputRef.current.click()} class="fileupload">
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
                            </div>
                        </div>
                        <div class="input">
                            <p>ویدیو</p>
                            <div onClick={() => videoRef.current.click()} class="fileupload">
                                <div class="customizefileupload">
                                    <i class="plusicon"></i>
                                    <p>افزودن ویدیو</p>

                                </div>
                                <input type="file" name="productvideo" ref={videoRef} onChange={(event) => handleUploadFile(event, 'video')} />
                            </div>
                            {/* <input type="file" name="productvideo" onChange={(event) => handleUploadFile(event, 'video')} /> */}
                        </div>
                    </div>
                </section>
                <section>
                    <h2 class="sectiontitle">گالری تصاویر</h2>
                    <div class="sectionrow">
                        <div class="gallery">
                            {files.gallery && files.gallery.map((data, index) =>
                                <div class="fileupload">
                                    <img src={data}/>
                                </div>
                            )}
                            <div onClick={() => galleryRef.current.click()} class="fileupload">
                                <div class="customizefileupload">
                                    <i class="plusicon"></i>
                                    <p>افزودن تصویر</p>
                                </div>
                                <input type="file" name="galleryimage" ref={galleryRef} onChange={(event) => handleUploadFile(event, 'gallery')} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section>
                    <h2 class="sectiontitle">آمار</h2>
                    <div class="sectionrow">

                    </div>
                    <div class="chart">
                        <h2 class="sectiontitle">نمودار</h2>
                    </div>
                </section> */}
                {modal.attribute && <div class='modal'>
                    {/* <AttributesList onChangeData={(e) => handleOnchangeInfo({ value: e, name: 'special_tags' })} back={() => setModal({ ...modal, attribute: false })} /> */}
                    <AttributesList onChangeData={(e) => setSpecialTags(e)} back={() => setModal({ ...modal, attribute: false })} />
                </div>}
                {modal.categories && <div class={'modal'}>
                    <CategoriesList onChange={(e) => handleOnchangeInfo({ value: e, name: 'category_ids' })} back={() => setModal({ ...modal, categories: false })} />
                </div>}
                {modal.tags && <div class={'modal'}>
                    <TagsList onChange={(e) => handleOnchangeInfo({ value: e, name: 'tags' })} back={() => setModal({ ...modal, tags: false })} />
                </div>}
            </main>
        </div>
    )
}

export default StoreProduct
