// Generic type for menu items and sidebar menu
export interface MenuItem<T = {}> {
    title: string
    path: string
    icon?: any | null
    children?: MenuItem<T>[]
    additionalFields?: T
}
// Generic type for sidebar menu
export interface SidebarMenu<T = {}> {
    [key: string]: MenuItem<T>[]
}
