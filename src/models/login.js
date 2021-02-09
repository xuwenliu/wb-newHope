import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, fakeAccountLogout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      if (response.code === 0) {
        localStorage.setItem('user', JSON.stringify(response.data));
        response.status = 'ok';
        response.currentAuthority = 'admin';
        response.type = 'account';
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        history.replace('/');
      }
    },

    *logout({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogout, payload);
      if (response) {
        localStorage.removeItem('user');
        localStorage.removeItem('antd-pro-authority');
        if (window.location.pathname !== '/user/login') {
          history.replace({
            pathname: '/user/login',
          });
        }
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
