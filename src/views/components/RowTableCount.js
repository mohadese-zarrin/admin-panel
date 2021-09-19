import React from 'react'

function RowTableCount(props) {
    // const options = [{ title: '5', id: 5 }, { title: '10', id: 10 }, { title: '15', id: 15 }, { title: '20', id: 20 }]
    const options=[5,10,15,20]
    return (
        <div class="settablerow">
            <select
                onChange={(e) => props.onChange(e)}
                name="rownumber" id="rownumber">
                {options.map((data, index) =>
                    <option selected={data===props.value}  key={index} value={data}>{`نمایش ${data} مورد در هر صفحه`}</option>
                )}
            </select>
        </div>
    )
}

export default RowTableCount
