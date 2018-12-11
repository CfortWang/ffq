// 默认配置
axios.defaults.baseURL = 'https://api.gxwhkj.cn'; 
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (config) => {
    return axios(config)
};

// http request 拦截器
axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    (response) => {
        // 判断是否存在alert属性
        if (response.data.data.alert || response.data.data.data.alert) {
            response.data.data.has = 1
        }
        return response;
    },
    (error) => {
        // if(error.response) {
        //     switch (error.response.status) {
        //         case 401:
        //         router.replace({
        //             path: '/login',
        //             query: {redirect: router.currentRoute.fullPath}
        //         });
        //     }
        // }
        return response
        // return Promise.reject(error.response.data);
    }
);