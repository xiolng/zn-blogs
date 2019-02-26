import {action, computed, observable} from 'mobx'

export interface LoginShowItem {
    showLogin: boolean
}
export interface LoginInter {
    showLogin: LoginShowItem,
    getShowLogin: LoginShowItem,

    setShowLogin(showLogin: LoginShowItem): any
}

class StoreLogin implements LoginInter {
    @observable showLogin = {
        showLogin: false
    }

    @computed
    get getShowLogin(): LoginShowItem {
        return this.showLogin
    }

    @action.bound
    setShowLogin(showLogin: LoginShowItem): void {
        Object.assign(this.showLogin, showLogin)
        console.log(this.showLogin)
    }
}

export const storeLogin = new StoreLogin()