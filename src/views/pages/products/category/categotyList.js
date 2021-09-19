import React, { useState, useEffect } from 'react'
import api from '../../../../tools/API'
import { Link, useHistory, Redirect } from 'react-router-dom'

function CategotyList(props) {
    const history = useHistory()
    const [lines, setlines] = useState()
    const [selectedData, setSelectedData] = useState([])

    const handleGetlines = () => {
        api.lineListAll().then(res => {
            console.log(res, 'setlines');
            setlines(res.data)
        }).catch(e => [
            console.log(e.repsonse)
        ])
    }


    const isSelected = (reserve) => {
        if (props.single) {
            return (selectedData.id===reserve.id)
        }else{
            return (selectedData.filter(item => item.id == reserve.id).length > 0)
        }
       
    }
    const handleSelectItem = item => {
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
    const handlesendData = () => {
        props.onChange(selectedData)
        props.back()
    }

    useEffect(() => {
        handleGetlines()
    }, [])
    // console.log(lines[5].categories)
    return (
        <main>
            <header>
                <a onClick={() => handlesendData()} class="primerybtn">category اعمال</a>
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
                        <p class="title">انتخاب دسته‌بندی:</p>
                        <div class="searchinput">

                            <label for="selectcategory">
                                <i class="searchicon"></i>
                                <input type="text" id="selectcategory" name="selectcategory" class="w40" placeholder="دسته‌بندی مورد نظر را جستجو کنید" />
                            </label>
                        </div>
                    </div>
                    <div class="lineandcats column">
                        {lines && lines.map((data, index) =>
                            data.categories.length > 0 &&
                            <div key={index} class="linelist">
                                <p class="linetitle">{data.title}</p>
                                <div class="catlist wrap">

                                    {data.categories.map((item, i) =>
                                        <div onClick={() => handleSelectItem(item)} class={`${isSelected(item) && 'selected'} catlistitem`}>
                                            <i class={isSelected(item) ? "closeicon" : 'plusicon'}></i>
                                            <p>{item.title}</p>
                                        </div>
                                    )}

                                </div>

                            </div>

                        )}
                    </div>

                </div>


            </section>
        </main>
    )
}

export default CategotyList
