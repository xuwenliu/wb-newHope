import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountLogout() {
  return request('/api/logout',{
    method: 'POST',
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
