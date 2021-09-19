import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import api from '../../../../tools/API'

function AttributesList(props) {
  

    const [attributeList, setAttributeList] = useState()
    const [selectedData, setSelectedData] = useState([])

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

    const handleGetAttributeList = () => {
        api.attributesListAll().then(res => {
            console.log(res,'attributelist')
            setAttributeList(res.data)
        }).catch(e => { console.log(e) })
    }
    const handlesendData = () => {
        props.onChangeData(selectedData)
        props.back()
    }

    useEffect(() => {
        handleGetAttributeList()
    }, [])
    console.log(selectedData,'selected data')
    return (
        <main>
            <header>
                <a onClick={()=>handlesendData()} class="primerybtn">اعمال</a>
                <a onClick={props.back} class="secondrybtn">انصراف</a>
                <a href="login.html" class="logout"><i class="logouticon"></i></a>
            </header>
            <ul class="breadcrumd">
                <li>
                    {selectedData.length ? <a>{`${selectedData.length}  ویژگی انتخاب شده است`}</a>:<></>}
                </li>
            </ul>
            <section>
                <h2 class="sectiontitle"></h2>
                <div class="sectionrow column">
                    <div class="searchandfilter">
                        <p class="title">انتخاب ویژگgfhfghfghfی:</p>
                        <div class="searchinput">

                            <label for="selectcategory">
                                <i class="searchicon"></i>
                                <input type="text" id="selectcategory" name="selectcategory" class="w40" placeholder="ویژگی مورد نظر را جستجو کنید" />
                            </label>
                        </div>
                    </div>
                    <div class="propertylist column">
                        {attributeList && attributeList.map((data, index) =>
                            <label
                                onClick={() => handleSelectItem(data)}
                                key={index} class="propertylistitem" for="propertyid-1">{data.title}
                                <input type="checkbox" checked={isSelected(data)} name="propertyid-1" id={data.id} />
                                <span class="checkboxmark"></span>
                            </label>
                        )}
                        {/* <label class="propertylistitem" for="propertyid-1">رنگ
                            <input type="checkbox" checked="checked" name="propertyid-1" id="propertyid-1" />
                            <span class="checkboxmark"></span>
                        </label>
                        <label class="propertylistitem" for="propertyid-5">وزن متوسط
                            <input type="checkbox" name="propertyid-5" id="propertyid-5" />
                            <span class="checkboxmark"></span>
                        </label> */}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AttributesList
