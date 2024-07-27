import type { ReactNode } from 'react'

export interface Branding {
    logo?: Logo
    title: string
}

export type NavLabel = string | null | undefined

export interface NavItem {
    label?: NavLabel
    href: string
}

export interface NavMenuItem extends NavItem {
    leading?: ReactNode // leading/trailing icons maybe?
    trailing?: ReactNode
    menu?: NavMenuItem[]
    divider?: boolean
}

export interface NavUser {
    name: string
    email: string
    avatar: string
}

export type Logo = string // SVG or any other string type for logo URL

export interface NavBranding extends Branding {}
