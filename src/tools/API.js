import config from "./Globals.js";
export default {
  login: body => {
    return config.axiosHandle().post("api", body);
  },
  //api/panel/model-multiple-action
  multipleAction: (body) => {
    return config.axiosHandle().post(`api`, body)
  },

  // محصولات
  productList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  productSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  productStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  productDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  productUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },
  //PUT or PATCH?


  // برچسب ها
  tagList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  tagListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  tagSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  tagStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  tagDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  tagUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },


  // لاین ها
  lineList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  lineListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  lineSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  lineStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  lineDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  lineUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },

  // دسته بندی ها
  categoriesList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  categoriesListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  categoriesSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  categoriesStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  categoriesDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  categoriesUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },

  // واحدها
  unitsList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  unitsListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  unitsSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  unitsStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  unitsDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  unitsUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },

  // بسته بندی ها
  packsList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  packsListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  packsSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  packsStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  packsDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  packsUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },
  // ویژگی ها
  attributesList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  attributesListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  attributesSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  attributesStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  attributesDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  attributesUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },

  //رنگ ها
  colors: () => {
    return config.axiosHandle().get(`api`)
  },
  // بارگذاری
  uploadImage: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  uploadVideo: (body) => {
    return config.axiosHandle().post(`api`, body)
  },


  //بنر ها 
  bannersList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  bannersListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  bannersSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  bannersStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  bannersDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  bannersUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },


  //ویدیو های صفحه اصلی
  homeVideosList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  homeVideosListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  homeVideosSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  homeVideosStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  homeVideosDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  homeVideosUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },

  // سفارشات
  ordersList: (perPage, page,srt) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}${srt}`)
  },
  ordersListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  ordersSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  ordersStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  ordersDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  ordersUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },


  //مدیریت کابران
  customersList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  customersListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  customersSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  customersStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  customersDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  customersUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },
  customersActions: (id, actionName, perPage, page) => {
    return config.axiosHandle().get(`api/${id}/${actionName}/${perPage}?page=${page}`)
  },

  commentsList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  commentsListAll: () => {
    return config.axiosHandle().get(`api`)
  },
  commentsSingle: (id) => {
    return config.axiosHandle().get(`api/${id}`)
  },
  commentsStore: (body) => {
    return config.axiosHandle().post(`api`, body)
  },
  commentsDelete: (id) => {
    return config.axiosHandle().delete(`api/${id}`)
  },
  commentsUpdate: (id, body) => {
    return config.axiosHandle().put(`api/${id}`, body)
  },

  //مدیریت مالی
  transactionsList: (perPage, page) => {
    return config.axiosHandle().get(`api/${perPage}?page=${page}`)
  },
  settlementsList: (perPage, page) => {
    return config.axiosHandle().get(`api${perPage}?page=${page}`)
  },
  settlementsListAll: () => {
  },
  settlementsSingle: (id) => {
  },
  settlementsDelete: (id) => {
  },
  giftsList: (perPage, page) => {
  },
  giftStore: (body) => {
  },
  discountsList: (perPage, page) => {
  },
};
