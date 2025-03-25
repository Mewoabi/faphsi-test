require('dotenv').config();
const axios = require('axios');

//sandbox headers
const baseUrl = process.env.API_BASEURL;
const headers = {
    apiuser: process.env.API_USER,
    apikey: process.env.API_KEY,
};


function initiatePay(data) {
    return new Promise(async function (resolve) {
        try {
            if (!data?.amount) resolve(error('amount required', 400));
            if (!Number.isInteger(data.amount)) resolve(error('amount must be of type integer', 400));
            if (data.amount < 100) resolve(error('amount cannot be less than 100 XAF', 400));

            const config = {
                method: 'post',
                url: baseUrl + '/initiate-pay',
                headers: headers,
                data: data,
            };
            const response = await axios(config);
            response.data.statusCode = response.status;
            resolve(response.data);
        } catch (e) {
            e.response.data.statusCode = e?.response?.status;
            resolve(e.response.data);
        }
    });
}

function directPay(data) {
    return new Promise(async function (resolve) {
        try {
            if (!data?.amount) resolve(error('amount required', 400));
            if (!Number.isInteger(data.amount)) resolve(error('amount must be of type integer', 400));
            if (data.amount < 100) resolve(error('amount cannot be less than 100 XAF', 400));
            if (!data?.phone) resolve(error('phone number required', 400));
            if (typeof data.phone !== 'string') resolve(error('phone must be of type string', 400));
            if (!/^6[\d]{8}$/.test(data.phone)) resolve(error('invalid phone number', 400));

            const config = {
                method: 'post',
                url: baseUrl + '/direct-pay',
                headers: headers,
                data: data,
            };
            const response = await axios(config);
            response.data.statusCode = response.status;
            resolve(response.data);
        } catch (e) {
            e.response.data.statusCode = e?.response?.status;
            resolve(e.response.data);
        }
    });
}

function paymentStatus(transId) {
    return new Promise(async function (resolve) {
        try {
            if (!transId || typeof transId !== 'string') resolve(error('invalid type, string expected', 400));
            if (!/^[a-zA-Z0-9]{8,10}$/.test(transId)) resolve(error('invalid transaction id', 400));

            const config = {
                method: 'get',
                url: baseUrl + '/payment-status/' + transId,
                headers: headers,
            };
            const response = await axios(config);
            response.data.statusCode = response.status;
            resolve(response.data);
        } catch (e) {
            e.response.data.statusCode = e?.response?.status;
            resolve(e.response.data);
        }
    });
}

function expirePay(transId) {
    return new Promise(async function (resolve) {
        try {
            if (!transId || typeof transId !== 'string') resolve(error('invalid type, string expected', 400));
            if (!/^[a-zA-Z0-9]{8,10}$/.test(transId)) resolve(error('invalid transaction id', 400));

            const config = {
                method: 'post',
                url: baseUrl + '/expire-pay',
                data: { transId },
                headers: headers,
            };
            const response = await axios(config);
            response.data.statusCode = response.status;
            resolve(response.data);
        } catch (e) {
            e.response.data.statusCode = e?.response?.status;
            resolve(e.response.data);
        }
    });
}

function userTrans(userId) {
    return new Promise(async function (resolve) {
        try {
            if (!userId || typeof userId !== 'string') resolve(error('invalid type, string expected', 400));
            if (!/^[a-zA-Z0-9-_]{1,100}$/.test(userId)) resolve(error('invalid user id', 400));

            const config = {
                method: 'get',
                url: baseUrl + '/transaction/' + userId,
                headers: headers,
            };
            const response = await axios(config);
            resolve(response.data);
        } catch (e) {
            e.response.data.statusCode = e?.response?.status;
            resolve(e.response.data);
        }
    });
}

function balance() {
    return new Promise(async function (resolve) {
        try {
            const config = {
                method: 'get',
                url: baseUrl + '/balance',
                headers: headers,
            };
            const response = await axios(config);
            response.data.statusCode = response.status;
            resolve(response.data);
        } catch (e) {
            e.response.data.statusCode = e?.response?.status;
            resolve(e.response.data);
        }
    });
}

function payout(data) {
    return new Promise(async function (resolve) {
        try {
            if (!data?.amount) return resolve(error('amount required', 400));
            if (!Number.isInteger(data.amount)) return resolve(error('amount must be of type integer', 400));
            if (data.amount < 100) return resolve(error('amount cannot be less than 100 XAF', 400));
            if (!data?.phone) return resolve(error('phone number required', 400));
            if (typeof data.phone !== 'string') return resolve(error('phone must be of type string', 400));
            if (!/^6[\d]{8}$/.test(data.phone)) return resolve(error('invalid phone number', 400));

            const config = {
                method: 'post',
                url: baseUrl + '/payout',
                headers: headers,
                data: data,
            };
            const response = await axios(config);
            response.data.statusCode = response.status;
            resolve(response.data);
        } catch (e) {
            e.response.data.statusCode = e?.response?.status;
            resolve(e.response.data);
        }
    });
}

function search(params = {}) {
    return new Promise(async function (resolve) {
        try {
            const config = {
                method: 'get',
                url: baseUrl + '/search',
                params: params,
                headers: headers,
            };
            const response = await axios(config);
            resolve(response.data);
        } catch (e) {
            e.response.data.statusCode = e?.response?.status;
            resolve(e.response.data);
        }
    });
}

module.exports = {
    initiatePay,
    directPay,
    paymentStatus,
    expirePay,
    userTrans,
    balance,
    payout,
    search,
};

function error(message, statusCode) {
    return { message, statusCode };
}