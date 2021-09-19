const axios = require('axios');
const moment = require('jalali-moment')

const config = {
    baseURL: 'http:baseUrl/',

    udata: JSON.parse(localStorage.getItem("baloot")),
    axiosHandle: () => {
        return axios.create({
            baseURL: `${config.baseURL}/`,
            headers:
                config.udata && config.udata.api_token
                    ? {
                        Authorization: "Bearer " + config.udata.api_token,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                    : {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
        });
    },
    getError: data => {
        if (!data.response || !data.response.data) {
            return null;
        }
        const response = data.response.data;

        if (response && response.non_field_errors) {
            return response.non_field_errors[0];
        }

        if (Array.isArray(response) && response.length > 0) {
            return response[0];
        }
        if (
            typeof response === "object" &&
            Object.values(response)[0] &&
            Object.values(response)[0][0]
        ) {
            return Object.values(response)[0][0];
        }
        return "خطا سرور قابل تعیین نمی باشد";
    },
    setAuth: user => {
        console.log(user, 'user')
        if (typeof user === "object" && user !== null && user.api_token) {
            localStorage.setItem("baloot", JSON.stringify(user));
            console.log(config.usdata)
            config.udata = user;
            console.log(config.usdata)
        } else {
            console.log("user problem");
        }
    },
    logoutUser: () => {
        localStorage.removeItem("user");
        window.location.href = '/login'
        config.udata = null;
    },
    getUser: () => {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"));
        } else {
            return null;
        }
    },
    checkAuth: () => {
        const user = config.getUser();
        if (user && user.token) {
            config.udata = user;
            return true;
        } else {
            return false;
        }
    },
    checkAccess: roles => {
        const user = config.getUser();
        if (Array.isArray(roles)) {
            return roles.some(r => user.roles.includes(r));
        } else {
            return false;
        }
    },
    formatNumber: function (input) {
        if (input) {
            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return "";
        }
    },
    removeFormatNumber: function (input) {
        if (input) {
            return input.toString().replace(/,/g, "");
        } else {
            return "";
        }
    },
    enNumToFa: n => {
        const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    faNumToEn: str => {
        const farsiDigits = [
            /۰/g,
            /۱/g,
            /۲/g,
            /۳/g,
            /۴/g,
            /۵/g,
            /۶/g,
            /۷/g,
            /۸/g,
            /۹/g
        ];
        if (typeof str === "string") {
            for (var i = 0; i < 10; i++) {
                str = str.replace(farsiDigits[i], i);
            }
        }
        return str;
    },
    separator: n => {
        let digit = n.toString().split(".");
        digit[0] = digit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return digit.join(".");
    },
    onlyNum: n => {
        const reg = /^[0-9]+$/;
        if (n.match(reg)) {
            return n;
        } else {
            return n.replace(/\D/g, "");
        }
    },
    com: n => {
        let test = parseInt(n.replace(/\D/g, ""));
        return test.toLocaleString();
    },
    convertDate: date => {
        if (date) {
            return moment(date, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')
        } else { return null }
    },
    getTime: d => {
        var date = new Date(d)
        var time = date.getHours() + ":" + date.getMinutes();
        return time
    },
    STATE: {
        0: "در حال بررسی",
        10: "دریافت شد",
        11: "در حال انجام",
        20: "در حال انجام",
        40: "انجام شد",
        45: "ارسال شد",
        50: "ارسال شد",
        51: "تحویل داده شد"
    },
    status: {
        paid: 'پرداخت شده',
        unpaid: 'پرداخت نشده',
        processing: 'در حال پردازش',
        waiting_to_send: 'در انتظار ارسال',
        sent: 'ارسال شده',
        delivered: 'دریافت شده',
        process_completion: 'تکمیل شده',
        returned_products: 'برگشت خورده',
        canceled: 'کنسل شده'
    },
    discountTypes: {
        amount: 'مقداری',
        percent: 'درصدی'
    },
    // constants
    REQUEST_TRACK_DONE: 40,
    REQUEST_TRACK_BRANCH_DONE: 48,
    REQUEST_TRACK_DELIVERED: 51,
    INVOICE_STATUS_NEW: 1,
    INVOICE_STATUS_PAID: 10,
    INVOICE_STATUS_CANCELED: 2,
    INVOICE_STATUS_CONFIRMED: 5,

    TRACK_UNKNOWN: 0,
    TRACK_PICKED_UP: 11,
    TRACK_IN_PROGRESS: 20,
    TRACK_DONE: 40,
    TRACK_RETURNED_TO_STORE: 43,
    TRACK_EXIT: 45,
    TRACK_DELIVERED: 51,

    INVOICE_DETAIL_TRACK_DONE: 40,
    INVOICE_DETAIL_TRACK_RETURNED: 38,

    REQUEST_STATUS: {
        1: "درحال بررسی",
        2: "لغو شد",
        5: "تأیید شد"
    },
    REQUEST_TRACK: {
        0: "ناشناخته",
        10: "دریافت شد",
        11: "دریافت شد",
        20: "در حال انجام",
        50: "ارسال شد",
        51: "تحویل داده شد",
        40: "انجام شد",
        45: "خروج از شعبه"
    },
    NOTES: {
        TRANSFER: "بزودی منتقل می شوید",
        PROGRESS: "لطفا صبر کنید",
        EMAIL: "ایمیل ضروری می باشد",
        EMAIL_CODE_GENERATE: " لینک فعالسازی به ایمیل شما ارسال شد. ",
        EMAIL_NOT_CONFIRM: " آدرس ایمیل تایید نشده است  ",
        REQUIRE_ALL: "پرکردن همه موارد لازمست.",
        REGISTER_SUCCESS: "به خانواده پاکان خوش آمدید.",
        LOGIN_SUCCESS: "سلام! خوش آمدید",
        RESET_PASS_SUCCESS: "کلمه عبور با موفقیت تغییر کرد. ",
        NETWORK: " اینترنت فعال نمی باشد ",
        SAVE: " اطلاعات شما با موفقیت ثبت شد.  ",
        REGISTER_CODE_REQUIRED: "وارد کردن کد فعال‌سازی لازمست.",
        REGISTER_MIN_PASS_REQUIRED: "کلمه عبور باید حداقل چهار کاراکتر باشد.",
        REGISTER_PROCESS_ERROR: "خطا هنگام پردازش لطفا دقایقی بعد تلاشش نمایید",
        RESET_CODE_WRONG: "کد فعال‌سازی اشتباهست!",
        RESET_REAPEATPASS_WRONG: "تکرار کلمه عبور صحیح نمی باشد.",
        REMOVE_ADDRESS: "نشانی مورد نظر با موفقیت حذف شد.",
        ADDRESS_ADD_SUCCESS: "نشانی با موفقیت ثبت شد. "
    }
};

export default config;
