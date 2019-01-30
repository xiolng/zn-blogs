import axios from 'axios'

export default class Axios extends axios {
    constructor() {
        super()
        this.interceptors.request.use(
            config => config,
            error => Promise.reject(error)
        )
        this.interceptors.response.use(
            response => response,
            error => Promise.reject(error)
        )
    }

    defaults() {
        return {
            baseURL: '',
            headers: {
                common: {
                    'Authorization': 'AUTH_TOKEN'
                },
                post: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        }
    }
}