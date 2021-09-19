import React from 'react'

function index() {
    return (
        <div>
            <table className='product-table'>
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
                    <tr>
                        <td>
                            <a>name</a>
                        </td>
                        <td>
                            <div>Inventory</div>
                        </td>
                        <td>
                            <div>saleunit</div>
                        </td>
                        <td>
                            <div>discount request</div>
                        </td>
                        <td>
                            <div>Inventory request</div>
                        </td>
                        <td>
                            <div>sales amount</div>
                        </td>
                        <th>
                            <div><input type="checkbox" id="product-select-1" name="product-select-1" value="1"/></div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default index
