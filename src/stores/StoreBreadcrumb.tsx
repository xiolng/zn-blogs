import {observable, action, computed} from 'mobx'

export interface BreadCrumbItem {
    parentName: string,
    name: string,
    keys: string
}

export interface BreadcrumbInter {
    breadcrumb: BreadCrumbItem;
    getBreadcrumb: BreadCrumbItem;
}

class StoreBreadcrumb implements BreadcrumbInter {
    @observable breadcrumb = {
        parentName: 'Home',
        name: 'list',
        keys: '0'
    };

    constructor() {
        this.setBreadcrumb(
            JSON.parse(
                localStorage.getItem('NavName') || this.breadcrumb.toString()
            )
        )
    }

    @computed
    get getBreadcrumb(): BreadCrumbItem {
        return this.breadcrumb
    }

    @action.bound
    setBreadcrumb(breadcrumb: BreadCrumbItem): void {
        Object.assign(this.breadcrumb, {...breadcrumb})
        localStorage.setItem('NavName', JSON.stringify(this.breadcrumb))
    }
}

export const storeBreadcrumb = new StoreBreadcrumb()