import axios from "axios";
export const VERIFY_LENGTH = 6;
// export const API_BASE_URL = "http://softcheetahs.herokuapp.com/"
// export const API_BASE_URL = "http://172.17.3.149/";
// export const API_BASE_URL = "http://127.0.0.1:8000/";
export const API_BASE_URL = "http://172.17.3.149/";
axios.defaults.baseURL = API_BASE_URL;

export const API_UPLOAD_DOC_URL = "api/account/upload-documents";
export const API_EMAIL_CHECK_URL = "api/account/check-existence";
export const API_LOGIN_URL = "api/account/login";
export const API_EMAIL_VERIFY_URL = "api/account/send-email";
export const API_SIGNUP_URL = "api/account/register";
export const API_TOKEN_URL = "api/token/";
export const API_PROFILE_URL = "api/account/properties";
export const API_PROFILE_UPDATE_URL = "api/account/properties/update";
export const API_PROFILE_UPDATE_AVATAR_URL = "api/account/update_account_image";
export const API_PROFILE_SHOW_AVATAR_URL = "api/account/show_account_image";
export const API_SEARCH_USER_URL = "api/account/properties/all";
// export const API_UPLOAD_IMAGE_URL = "api/villa/admin/remove-waste-images/"
export const API_UPLOAD_DOC_RESIDANCE_URL = "api/villa/user/documents/"; //contains typo we know.
export const API_UPLOAD_IMAGE_URL = "api/villa/user/images/";
export const API_CHECK_DOC_URL = "api/account/check-document-existence";
export const API_ADD_VILLA_URL = "api/villa/user/";
export const API_VILLA_PROFILE_URL = "api/villa/user/";
export const API_SEARCH_VILLA = "api/villa/search/";
export const API_TOP_RATED_VILLA = "api/villa/most-rated/show/";
export const API_FAVORITE_VILLA = "api/villa/user/likes/";
export const API_USER_RESERVED = "api/villa/user/me/?reserved";
export const API_USER_HOSTED = "api/villa/user/me/?hosted";
export const API_MOST_REGISTERED_VILLA = "api/villa/most-registered/show/";
export const API_GET_FIXED_RULES = "api/villa/fixed-rules/";
export const API_GET_SPECIAL_RULES = "api/villa/special-rules/";
export const API_RESERVE_VILLA = "api/villa/user/register/";
export const API_GET_RESERVED_DATES = "api/villa/calendar/show/";
export const API_GET_SHOW_CHAT_INFO_AND_LIST = "api/chat/show/";
export const API_START_CHAT = "api/chat/add/";
export const API_CHAT_UPLOAD_FILE = "api/chat/upload/";
export const API_REGISTER_FIREBASE_TOKEN = "device/add/";

export const WS_BASE_URL = "ws://172.17.3.149:3000/";
// export const WS_BASE_URL = "ws://localhost:8000/";
export const API_ADD_REMOVE_FAVORITE_VILLA = "/api/villa/like/";
// export const API_HIDE = "/api/villa/user/?villa_id=1&visible=";
export const WS_CHAT_URL = "ws/api/chat/";
export const WEB_PUSH_CERTIFICATE =
  "BPMnplC3Ef7aPJoRSQ9qUW5kvtpPIWOYTMqFJdy5Pod-h3v3aaRo5qFJts746LRY_709ZiTZ9TgQgViATLucIqQ";

export const STORAGE_KEY = "sweet-home";
