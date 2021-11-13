import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar, Menu, MenuItem, SidebarFooter, SidebarContent, SidebarHeader,
} from 'react-pro-sidebar';
import { PROJECT_NAME } from '@constants/global.constants';
import { UrlHelper } from '@helpers/url.helper';
import { MessageIcon } from '@components/icons/message';
import { GraphicsIcon } from '@components/icons/graphics';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Link } from '@components/link';
import { ROUTES } from '@constants/routes.contstants';
import { SignOutIcon } from '@components/icons/sign-out';
import styles from './sidebar.module.scss';

interface ISidebarProps {
  isToggled: boolean;
  handleToggleSidebar: (value: boolean) => void;
}

const MENU_ITEMS: {
  name: string,
  key: ROUTES,
  icon: React.FC,
}[] = [
  { key: ROUTES.MESSAGES, name: 'Сообщения', icon: MessageIcon },
  { key: ROUTES.GRAPHICS, name: 'Графики', icon: GraphicsIcon },
];

const COMPANY = 'puma';
const Sidebar: React.FC<ISidebarProps> = ({ handleToggleSidebar, isToggled }) => {
  const router = useRouter();
  // console.log(router.asPath);

  return (
    <ProSidebar
      className={styles.sidebar}
      toggled={isToggled}
      onToggle={handleToggleSidebar}
      collapsed={false}
      breakPoint="sm"
    >
      <SidebarHeader className={styles.header}>
        <p>{PROJECT_NAME}</p>
        <div className={styles.profile}>
          <img src={UrlHelper.getImageSrc('profile.png')} alt="profile" />
          <div className={styles.profileDetails}>
            <p>Настя Босацкая</p>
            <p>nastya_bos@mail.ru</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.key}
              className={cn(
                router.pathname.includes(item.key) ? 'active' : '',
                styles.menuItem, { [styles.active]: router.pathname.includes(item.key) },
              )}
            >
              <item.icon />
              <p className={styles.menuItemText}>
                <Link href={`/${COMPANY}/${item.key}`}>
                  {item.name}
                </Link>
              </p>
            </MenuItem>
          ))}
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu>
          <MenuItem className={styles.menuItem} onClick={() => alert('Выйти')}>
            <SignOutIcon />
            <p>Выйти</p>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
