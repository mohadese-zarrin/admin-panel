import React from 'react'
// import CIcon from '@coreui/icons-react'
import PIcon from '../views/base/icon'
const _nav = [

  {
    _tag: 'CSidebarNavItem',
    name: 'محصولات',
    icon:'Store',
    children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'همه محصولات',
        to: '/products-AllProducts',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'دسته بندی ها',
        to:  '/products-Category',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'برچسب ها',
        to: '/products-Tags',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'ویژگی ها',
        to: '/products-Attributes',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'لاین',
        to: '/products-Line',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'واحد های فروش',
        to: '/products-SalesUnits',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'بسته بندی ها',
        to: '/products-Packaging',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'ویرایش صفحه اصلی',
    route: '/service-management',
    icon: 'Pen',
    children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'لیست خدمات',
        to: '/service-management/service-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'تخفیف ها و پکیج ها',
        to: '/service-management/coupons&packages',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'سفارشات',
    route: '/reserv-management',
    icon:'Shop',
    children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'لیست رزروها',
        to: '/reserv-management/reserve-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'غیرفعال سازی موقت',
        to: '/reserv-management/temporary-suspense',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'مدیریت مالی',
    route: '/personnel-management',
    icon: 'Wallet',
    children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'لیست آرایش‌گران',
        to: '/personnel-management/personnel-list',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'آمارها',
      //   to: '/personnel-management/reports',
      // },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'مدیریت مشتریان',
    route: '/customers-management',
    icon: 'UserGroup',
    children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'لیست مشتریان',
        to: '/customers-management/customers-list',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'گروه‌ها',
      //   to: '/customers-management/groups',
      // },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'آمار',
    route: '/financial-management',
    icon: 'BarChart',
    children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'لیست تراکنش‌ها',
        to: '/financial-management/transactions-list',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'درخواست‌ها',
      //   to: '/customers-management/requests',
      // },
    ],
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'پیام‌ها',
    route: '/messages',
    icon: 'Message',
    children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'نوشتن',
        to: '/messages/write-message',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'دریافت شده',
        to: '/messages/inbox-messages',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'ارسال شده',
        to: '/messages/outbox-messages',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'پیش نویس',
        to: '/messages/draft=-messages',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'درباره‌ما',
    to: '/samples',
    icon: 'Help',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'سوالات متداول',
    to: '/comments',
    icon: 'Question',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'قوانین و مقررات',
    to: '/samples',
    icon: 'FileText',
  },
]

export default _nav
