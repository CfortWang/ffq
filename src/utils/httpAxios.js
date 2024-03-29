// 默认配置
// axios.defaults.baseURL = 'https://api.gxwhkj.cn'; 
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
        if (response.data.alert) {
            mui.alert(response.data.alert)
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