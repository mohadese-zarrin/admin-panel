import React from 'react'
import PIcon from '../views/base/icon'
// import { useSelector, useDispatch } from 'react-redux'
// import {
//   CHeader,
//   CToggler,
//   CHeaderNav,
//   CRow
// } from '@coreui/react'
// import PIcon from '../views/base/icon'
// import config from '../tools/Globals'
const TheHeader = () => {
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector(state => state.sidebarShow)

  // const toggleSidebar = () => {
  //   const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
  //   dispatch({type: 'set', sidebarShow: val})
  // }

  // const toggleSidebarMobile = () => {
  //   const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
  //   dispatch({type: 'set', sidebarShow: val})
  // }

  return (
    <header>
      <a href="products.html" class="primerybtn">اعمال</a>
      <a href="products.html" class="secondrybtn">انصراف</a>
      <a href="login.html" class="logout"><i class="logouticon"></i></a>
    </header>
  )
}

export default TheHeader
