import {action, computed, observable} from 'mobx'

export interface RegisterShowItem {
    showRegister: boolean
}
export interface RegisterInter {
    showRegister: RegisterShowItem,
    getShowRegister: RegisterShowItem,

    setShowRegister(showRegister: RegisterShowItem): any
}

class StoreRegister implements RegisterInter {
    @observable showRegister = {
        showRegister: false
    }

    @computed
    get getShowRegister(): RegisterShowItem {
        return this.showRegister
    }

    @action.bound
    setShowRegister(showRegister: RegisterShowItem): void {
        Object.assign(this.showRegister, showRegister)
        console.log(this.showRegister)
    }
}

export const storeRegister = new StoreRegister()