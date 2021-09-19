import React, { useState, useEffect } from 'react'
import api from '../../../../tools/API'

function TagsList(props) {

    const [tags, setTags] = useState()
    const [selectedData, setSelectedData] = useState([])

    const isSelected = (reserve) => {
        if (props.single) {
            return (selectedData.id===reserve.id)
        }else{
            return (selectedData.filter(item => item.id == reserve.id).length > 0)
        }
    }
    const handleSelectItem = item => {
        // if (isSelected(item)) {
        //     setSelectedData(selectedData.filter(d => d.id !== item.id))
        // } else {
        //     setSelectedData([...selectedData, item])
        // }
        if (props.single) {
            setSelectedData(item)
        }else{
            if (isSelected(item)) {
                setSelectedData(selectedData.filter(d => d.id !== item.id))
            } else {
                setSelectedData([...selectedData, item])
            }
        }
    }

    const handleGetTagList = () => {
        api.tagListAll().then(res => {
            console.log(res, 'Taglist')
            setTags(res.data)
        }).catch(e => { console.log(e) })
    }
    const handlesendData = () => {
        props.onChange(selectedData)
        props.back()
    }

    useEffect(() => {
        handleGetTagList()
    }, [])
    return (
        <main>
            <header>
                <a onClick={()=>handlesendData()} class="primerybtn"> tagsاعمال</a>
                <a onClick={props.back} class="secondrybtn">انصراف</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    <a href="#">1 دسته‌بندی انتخاب شده است</a>
                </li>
            </ul>
            <section>
                <h2 class="sectiontitle"></h2>
                <div class="sectionrow column">
                    <div class="searchandfilter">
                        <p class="title">انتخاب برچسب:</p>
                        <div class="searchinput">

                            <label for="selectcategory">
                                <i class="searchicon"></i>
                                <input type="text" id="selectcategory" name="selectcategory" class="w40" placeholder="دسته‌بندی مورد نظر را جستجو کنید" />
                            </label>
                        </div>
                    </div>
                    <div class="lineandcats column">
                        <div class="linelist">
                            <div class="catlist wrap">
                                {tags&&tags.map((item, i) =>
                                    <div key={i} onClick={() => handleSelectItem(item)} class={`${isSelected(item) && 'selected'} catlistitem`}>
                                        <i class={isSelected(item) ? "closeicon" : 'plusicon'}></i>
                                        <p>{item.title}</p>
                                    </div>
                                )}

                                {/* <div class="selected catlistitem">
                                    <i class="closeicon"></i>
                                    <p>مصرف روزانه خانوار</p>
                                </div>
                                <div class="catlistitem">
                                    <i class="plusicon"></i>
                                    <p>مصرف روزانه خانوار</p>
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default TagsList
