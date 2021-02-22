import {
  parse
} from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import {
  useIntl
} from 'umi';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const {
    NODE_ENV
  } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const arrTrans = (num, arr) => {
  // 一维数组转换为二维数组
  const iconsArr = []; // 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num); // 计算该元素为第几个素组内
    if (!iconsArr[page]) {
      // 判断是否存在
      iconsArr[page] = [];
    }
    iconsArr[page].push(item);
  });
  return iconsArr;
};

export const getRoutes = () => {
  const intl = useIntl();
  return [{
      label: intl.formatMessage({
        id: 'menu.data-show',
      }),
      path: '/dataShow',
      value: 1,
    },
    {
      label: intl.formatMessage({
        id: 'menu.data-query',
      }),
      path: '/dataQuery',
      value: 2,
    },
    {
      label: intl.formatMessage({
        id: 'menu.data-upload',
      }),
      path: '/dataUpload',
      value: 3,
    },
    {
      label: intl.formatMessage({
        id: 'menu.data-config',
      }),
      path: '/dataConfig',
      value: 4,
    },
    {
      label: intl.formatMessage({
        id: 'menu.data-main',
      }),
      path: '/dataMain',
      value: 5,
    },
    {
      label: intl.formatMessage({
        id: 'menu.manger',
      }),
      path: '/manger',
      value: 6,
    },
  ];
};


// 通用下载方法
export const downloadFile = (fileName) => {
  window.location.href = "/api/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}
