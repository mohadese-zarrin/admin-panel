import React,{lazy} from 'react';

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AllProducts = lazy(()=> import('./views/pages/products/allProducts'));
const SingleProduct = lazy(()=> import('./views/pages/products/allProducts/singleProduct'));
const StoreProduct = lazy(()=> import('./views/pages/products/allProducts/storeProduct'));

const Category = lazy(()=> import('./views/pages/products/category'));
const CategoryList = lazy(()=> import('./views/pages/products/category/categotyList'));
const CategoryStore = lazy(()=> import('./views/pages/products/category/categoryStore'));
const CategorySingle = lazy(()=> import('./views/pages/products/category/categorySingle'));

const Line = lazy(()=> import('./views/pages/products/line'));
const Tags = lazy(()=> import('./views/pages/products/tags'));
const TagsList = lazy(()=> import('./views/pages/products/tags/tagsList'));
const Attributes = lazy(()=> import('./views/pages/products/attributes'));
const AttributesList = lazy(()=> import('./views/pages/products/attributes/attributesList'));
const SalesUnits = lazy(()=> import('./views/pages/products/salesUnits'));
const Packaging = lazy(()=> import('./views/pages/products/packaging'));

const Banners = lazy(()=> import('./views/pages/editPage/banners'));
const BannerStore = lazy(()=> import('./views/pages/editPage/banners/bannerStore'));
const BannerSingle = lazy(()=> import('./views/pages/editPage/banners/bannerSingle'));
const Videoes = lazy(()=> import('./views/pages/editPage/videoes'));

const Orders = lazy(()=> import('./views/pages/orders'));
const OrderStore = lazy(()=> import('./views/pages/orders/orderStore'));
const OrderSingle = lazy(()=> import('./views/pages/orders/orderSingle'));
const OrderFilter = lazy(()=> import('./views/pages/orders/orderFilter'));

const Customers = lazy(()=> import('./views/pages/customerMng/customers'));
const CustomerStore = lazy(()=> import('./views/pages/customerMng/customers/customerStore'));
const CustomerSingle = lazy(()=> import('./views/pages/customerMng/customers/customrSingle'));
const CustomerFilter = lazy(()=> import('./views/pages/customerMng/customers/customerFilter'));
const Comments = lazy(()=> import('./views/pages/customerMng/comments'));

const Transactions = lazy(()=> import('./views/pages/financialMng/transactions'));
const TransactionStore = lazy(()=> import('./views/pages/financialMng/transactions/transactionStore'));
const CheckoutReq = lazy(()=> import('./views/pages/financialMng/checkoutReq'));
const Gift = lazy(()=> import('./views/pages/financialMng/gift'));
const DiscountCode = lazy(()=> import('./views/pages/financialMng/discountCode'));
const DiscountStore = lazy(()=> import('./views/pages/financialMng/discountCode/discountStore'));
const DiscountSingle = lazy(()=> import('./views/pages/financialMng/discountCode/discountSingle'));

// const CustomerList = lazy(()=> import('./views/pages/Customers/CustomerList'));
// const singleCustomer = lazy(()=> import('./views/pages/Customers/SingleCustomer'));
// const TransactionList = lazy(()=> import('./views/pages/Financial/TransactionsList'));
// const CommentsList = lazy(()=> import('./views/pages/Comments/CommentsList'));
// const SingleComment = lazy(()=> import('./views/pages/Comments/SingleComments'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/products-AllProducts', name: 'AllProducts', component: AllProducts },
  { path: '/products-SingleProduct/:id', name: 'SingleProducts', component: SingleProduct },
  { path: '/products-StoreProduct', name: 'StoreProducts', component: StoreProduct},

  { path: '/products-Category', name: 'Category', component: Category },
  { path: '/products-CategoryList', name: 'CategoryList', component: CategoryList },
  { path: '/products-CategoryStore', name: 'CategoryStore', component: CategoryStore },
  { path: '/products-CategorySingle', name: 'CategorySingle', component: CategorySingle },
  
  { path: '/products-Line', name: 'Line', component: Line },
  { path: '/products-Tags', name: 'Tags', component: Tags },
  { path: '/products-TagsList', name: 'TagsList', component: TagsList },
  { path: '/products-Attributes', name: 'Attributs', component: Attributes },
  { path: '/products-AttributesList', name: 'AttributesList', component: AttributesList },
  { path: '/products-SalesUnits', name: 'SalesUnits', component: SalesUnits },
  { path: '/products-Packaging', name: 'Packaging', component: Packaging },

  { path: '/editPage-Banners', name: 'Banners', component: Banners },
  { path: '/editPage-BannerStore', name: 'BannerStore', component: BannerStore },
  { path: '/editPage-BannerSingle/:id', name: 'BannerSingle', component: BannerSingle },
  { path: '/editPage-Videoes', name: 'Videoes', component: Videoes },

  { path: '/orders-Orders', name: 'Orders', component: Orders },
  { path: '/orders-OrderStore', name: 'OrderStore', component: OrderStore },
  { path: '/orders-OrderSingle/:id', name: 'OrderSingle', component: OrderSingle },
  { path: '/orders-OrderFilter', name: 'OrderSingle', component: OrderFilter },

  { path: '/customers-Customers', name: 'Customers', component: Customers },
  { path: '/customers-CustomerFilter', name: 'Customers', component: CustomerFilter },
  { path: '/customers-CustomerStore', name: 'CustomerStore', component: CustomerStore },
  { path: '/customers-CustomerSingle/:id', name: 'CustomerSingle', component: CustomerSingle },
  { path: '/customers-Comments', name: 'Comments', component: Comments },

  { path: '/financialMng-Transactions', name: 'Transactions', component: Transactions },
  { path: '/financialMng-TransactionStore', name: 'TransactionStore', component: TransactionStore },
  { path: '/financialMng-CheckoutReq', name: 'CheckoutReq', component: CheckoutReq },
  { path: '/financialMng-Gift', name: 'Gift', component: Gift },
  { path: '/financialMng-DiscountCode', name: 'DiscountCode', component: DiscountCode },
  { path: '/financialMng-DiscountStore', name: 'DiscountStore', component: DiscountStore },
  { path: '/financialMng-DiscountSingle/:id', name: 'DiscountSingle', component: DiscountSingle },
  // { path: '/service-management/coupons&packages', name: 'Cupons&Packages', component: CouponsAndPackage },
  // { path: '/service-management/service-list', name: 'service-list', component: SerciceList },
  // { path: '/service-management/add-discount', name: 'AddDiscount', component: AddDiscount },
  // { path: '/service-management/edit-discount', name: 'AddDiscount', component: AddDiscount },
  // { path: '/reserv-management/reserve-list', name: 'reserveList', component: ReserveList },
  // { path: '/reserv-management/temporary-suspense', name:'temporary-suspense', component: EmployeeSuspenseList },
  // { path: '/reserv-management/create-reserve', name: 'create-reserve', component: CreateReserve },
  // { path: "/reserv-management/single-rserve", name:'single-reserve', component: SingleReserve},
  // { path: '/reserv-management/create-employee-suspense', name: 'create-employee-suspense', component: CreateEmployeeSuspense },
  // { path: '/messages/write-message', name: 'writeMessage', component: WriteMessage },
  // { path: '/messages/inbox-messages', name:'inbox-messages', component:InboxMessages},
  // { path: '/messages/outbox-messages', name:'outbox-messages', component: OutboxMessages},
  // { path: '/personnel-management/personnel-list', name:'personnel-list', component: PersonelList},
  // { path: '/personnel-management/profile', name:'personnel-profile', component: PersonelProfile},
  // { path: '/samples', name:'samples', component: Samples},
  // { path: '/customers-management/customers-list', name:'customer-list', component: CustomerList},
  // { path: '/customers-management/singleCustomer/:id', name:'customer-list', component: singleCustomer},
  // { path: '/financial-management/transactions-list', name:'transaction-list', component: TransactionList},
  // { path: "/comments", name:'comments', component: CommentsList},
  // { path: "/single-comment", name:'singleComments', component: SingleComment},
];

export default routes;
