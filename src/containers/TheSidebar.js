import React, { useState,useEffect } from 'react'
import Navs from '../views/base/navs'
import navigation from './_nav'
import {Link,useHistory} from 'react-router-dom'

const TheSidebar = () => {
    const history=useHistory()
    const [firstLevel, setFirstLevel] = useState('1')
    const [secendLevel, setSecendLevel] = useState('1')
    useEffect(() => {
        setSecendLevel(1)
    }, [firstLevel])
    return (
        <aside class="rightsidebar">
            <div class="topsidebar">
                <img src="#" class="profilepic" />
                <p>محسن علوی نسب</p>
            </div>
            <ul class="sidebar">
                <li id='1' class={`firstlevel ${firstLevel == 1 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(1)} class="menutitle">
                        <i class="producticon"></i>
                            <a><p>محصولات</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to='/products-AllProducts'> همه محصولات</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 2 ? 'active' : ''}`}><Link to="/products-Line">لاین‌ها</Link></li>
                        <li  onClick={() => setSecendLevel(3)} class={`secondlevel ${secendLevel == 3 ? 'active' : ''}`}><Link to="/products-Category">دسته بندی ها</Link></li>
                        <li  onClick={() => setSecendLevel(4)} class={`secondlevel ${secendLevel == 4 ? 'active' : ''}`}><Link to="/products-Tags">برچسب‌ها</Link></li>
                        <li  onClick={() => setSecendLevel(5)} class={`secondlevel ${secendLevel == 5 ? 'active' : ''}`}><Link to="/products-Attributes">ویژگی ها</Link></li>
                        <li  onClick={() => setSecendLevel(6)} class={`secondlevel ${secendLevel == 6 ? 'active' : ''}`}><Link to="/products-SalesUnits">واحدهای فروش</Link></li>
                        <li  onClick={() => setSecendLevel(7)} class={`secondlevel ${secendLevel == 7 ? 'active' : ''}`}><Link to="/products-Packaging">بسته بندی ها</Link></li>
                    </ul>
                </li>
                <li id='2' class={`firstlevel ${firstLevel == 2 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel('2')} class="menutitle">
                        <i class="homeicon"></i>
                        <a ><p>ویرایش صفحه اصلی</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="/editPage-Banners"> بنرها</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 2 ? 'active' : ''}`}><Link to="/editPage-Videoes">ویدیوها</Link></li>
                    </ul>
                </li>
                <li id='3' class={`firstlevel ${firstLevel == 3 ? 'active' : ''}`}>
                    <Link onClick={() => {setFirstLevel(3);history.push('/orders-Orders')}} class="menutitle">
                        <i class="ordersicon"></i>
                        <a to="order.html"><p>سفارشات</p></a>
                    </Link>
                    {/* <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="homepLinkge.html"> بنرها</Link></li>
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="home-videoes.html">ویدیوها</Link></li>
                    </ul> */}
                </li>
                <li id='4' class={`firstlevel ${firstLevel == 4 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(4)} class="menutitle">
                        <i class="finicon"></i>
                        <a to="finance.html"><p>مدیریت مالی</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="/financialMng-Transactions">تراکنش ها</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 2 ? 'active' : ''}`}><Link to="/financialMng-CheckoutReq">درخواست های تسویه</Link></li>
                        <li  onClick={() => setSecendLevel(3)} class={`secondlevel ${secendLevel == 3 ? 'active' : ''}`}><Link to="/financialMng-Gift">هدیه</Link></li>
                        <li  onClick={() => setSecendLevel(4)} class={`secondlevel ${secendLevel == 4 ? 'active' : ''}`}><Link to="/financialMng-DiscountCode">کد تخفیف</Link></li>
                    </ul>
                </li>
                <li id='5' class={`firstlevel ${firstLevel == 5 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(5)} class="menutitle">
                        <i class="customericon"></i>
                        <a to="customer.html"><p>مدیریت مشتریان</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="/customers-Customers"> مشتریان</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 2 ? 'active' : ''}`}><Link to="/customers-Comments">نظرات</Link></li>
                    </ul>
                </li>
                <li id='6' class={`firstlevel ${firstLevel == 6 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(6)} class="menutitle">
                        <i class="charticon"></i>
                        <a to="chart.html"><p>آمار</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="homepage.html"> بنرها</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 2 ? 'active' : ''}`}><Link to="home-videoes.html">ویدیوها</Link></li>
                    </ul>
                </li>
                <li id='7' class={`firstlevel ${firstLevel == 7 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(7)} class="menutitle">
                        <i class="messageicon"></i>
                        <a to="message.html"><p>پیام‌ها</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="homepage.html"> بنرها</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="home-videoes.html">ویدیوها</Link></li>
                    </ul>
                </li>
                <li id='8' class={`firstlevel ${firstLevel == 8 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(8)} class="menutitle">
                        <i class="abouticon"></i>
                        <a to="about.html"><p>درباره ما</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="homepage.html"> بنرها</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="home-videoes.html">ویدیوها</Link></li>
                    </ul>
                </li>
                <li id='9' class={`firstlevel ${firstLevel == 9 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(9)} class="menutitle">
                        <i class="faqicon"></i>
                        <a to="faq.html"><p>سوالات متداول</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="homepage.html"> بنرها</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="home-videoes.html">ویدیوها</Link></li>
                    </ul>
                </li>
                <li id='10' class={`firstlevel ${firstLevel == 10 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(10)} class="menutitle">
                        <i class="termsicon"></i>
                        <a to="term.html"><p>قوانین و مقررات</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="homepage.html"> بنرها</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="home-videoes.html">ویدیوها</Link></li>
                    </ul>
                </li>
                <li id='11' class={`firstlevel ${firstLevel == 11 ? 'active' : ''}`}>
                    <Link onClick={() => setFirstLevel(11)} class="menutitle">
                        <i class="settingicon"></i>
                        <a to="setting.html"><p>تنظیمات</p></a>
                    </Link>
                    <ul class="submenu">
                        <li  onClick={() => setSecendLevel(1)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="homepage.html"> بنرها</Link></li>
                        <li  onClick={() => setSecendLevel(2)} class={`secondlevel ${secendLevel == 1 ? 'active' : ''}`}><Link to="home-videoes.html">ویدیوها</Link></li>
                    </ul>
                </li>
            </ul>
        </aside>
    )
}

export default React.memo(TheSidebar)
