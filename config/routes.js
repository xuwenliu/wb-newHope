export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/home',
              },
              {
                path: '/home',
                name: 'home',
                icon: 'home',
                component: './Home',
              },
              {
                name: 'data-show',
                icon: 'areaChart',
                path: '/dataShow',
                component: './DataShow',
              },
              {
                name: 'data-query',
                icon: 'search',
                path: '/dataQuery',
                component: './DataQuery',
              },
              {
                name: 'data-upload',
                icon: 'upload',
                path: '/dataUpload',
                component: './DataUpload',
              },
              {
                name: 'data-config',
                icon: 'setting',
                path: '/dataConfig',
                component: './DataConfig',
              },
              {
                name: 'data-main',
                icon: 'inbox',
                path: '/dataMain',
                component: './DataMain',
              },
              {
                name: 'manger',
                icon: 'user',
                path: '/manger',
                component: './Manger',
              },

              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Home',
              //       authority: ['admin'],
              //     },
              //   ],
              // },

              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
