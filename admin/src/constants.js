export const BASE_URL = 'http://localhost:8800/api';

export const API_ENDPOINTS = {
    APPROVE_PRODUCT: `${BASE_URL}/admin/products/approve/`,
    GET_EMP_REQ: `${BASE_URL}/admin/getempreq`,
    DENY_PRODUCT: `${BASE_URL}/admin/products/deny/`,
    SIGNIN: `${BASE_URL}/signin`,
    CATEGORY: `${BASE_URL}/category/`,
    CATEGORY_UPLOAD: `${BASE_URL}/category/upload/`,
    CATEGORY_IMAGE: `${BASE_URL}/category/image/`,
    BRANDS: `${BASE_URL}/brands/`,
    MODELS: `${BASE_URL}/models/`,
    PHONE_CONFIG: `${BASE_URL}/phoneconfig`,
    REQUESTS: `${BASE_URL}/requests/`,
    BANNERS_UPLOAD: `${BASE_URL}/banners/upload/`,
    BANNERS: `${BASE_URL}/banners/`,
    USERS: `${BASE_URL}/users/`,
    GET_VALUE: `${BASE_URL}/attribute/getvalue/`
};
