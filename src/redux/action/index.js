import axios from "axios";
import { EMAIL_VERIFY, GET_LIST_POST, LOGIN } from "../../utils/constant";
import history from "../../utils/history";
import { toastError, toastSuccess } from "../../utils/toast";

const url = "http://192.168.68.51:3000/api";

export const login = (params) => async (dispatch) => {
  const { checkRemember } = params;
  try {
    const response = await axios.post(`${url}/auth/login`, { ...params });

    dispatch({
      type: LOGIN,
      payload: response.data.user,
    });
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem(
      "info",
      JSON.stringify({
        email: response.data.user.email,
        fullName: response.data.user.fullName,
        role: response.data.user.isAdmin,
      })
    );
    localStorage.removeItem("prevEmail");
    if (checkRemember) {
      localStorage.setItem("prevEmail", response.data.user.email);
    }
    toastSuccess(response.data.msg);
    history.push("/");
  } catch (error) {
    toastError(error.response.data.msg);
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/auth/register`, data);
    dispatch({
      type: EMAIL_VERIFY,
      payload: data.email,
    });
    toastSuccess(res.data.msg);
    history.push("/verify-email");
  } catch (error) {
    toastError(error.response.data.msg);
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN,
      payload: {},
    });
    localStorage.removeItem("token");
    localStorage.removeItem("info");
  } catch (error) {
    toastError(error.response.data.msg);
  }
};

export const checkToken = (token) => async (dispatch) => {
  try {
    const headers = { authorization: `Bearer ${token}` };
    const res = await axios.get(`${url}/user/token/info`, { headers });
    dispatch({
      type: LOGIN,
      payload: res.data.user,
    });
  } catch (error) {
    toastError(error.response.data.msg);
  }
};

export const getListPost = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(`${url}/post`, { headers });

    dispatch({
      type: GET_LIST_POST,
      payload: response.data,
    });
  } catch (error) {
    toastError(error.response.data.error);
    if (error.response.data.status === 456) dispatch(logout());
  }
};

export const createPost = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };
  try {
    const response = await axios.post(
      `${url}/post`,
      { ...params },
      { headers }
    );

    if (response.data.success) toastSuccess(response.data.success);
  } catch (error) {
    toastError(error.response.data.error);
    if (error.response.data.status === 456) dispatch(logout());
  }
};
