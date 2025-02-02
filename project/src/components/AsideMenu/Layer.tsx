import React from 'react'
import { mdiLogout, mdiClose } from '@mdi/js'
import Icon from '../Icon'
import AsideMenuItem from './Item'
import AsideMenuList from './List'
import { MenuAsideItem } from '../../interfaces'
import { useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

type Props = {
  menu: MenuAsideItem[]
  className?: string
  onAsideLgCloseClick: () => void
}

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const darkMode = useAppSelector((state) => state.darkMode.isEnabled)
  const router = useRouter()

  const handleLogout = () => {
    console.log('Logout clicked');
    localStorage.removeItem('authToken');
    router.push('/login');
  }

  const logoutItem: MenuAsideItem = {
    label: 'Log Out',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
    onClick: handleLogout, 
  }

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  return (
    <aside
      className={`${className} zzz lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={`aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900`}
      >
        <div
          className={`aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900`}
        >
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <b className="font-black">Menu</b>
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <Icon path={mdiClose} />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            darkMode ? 'aside-scrollbars-[slate]' : 'aside-scrollbars'
          }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <ul>
          <AsideMenuItem item={logoutItem} />
        </ul>
      </div>
    </aside>
  )
}
