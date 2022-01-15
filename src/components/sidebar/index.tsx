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
import config from '@utils/config';

import { Link } from '@components/link';
import { COMPANY_ROUTE, ROUTES } from '@constants/routes.contstants';
import { SignOutIcon } from '@components/icons/sign-out';
import { useSignOut } from '@components/modal/sign-in.modal/sign-in.hooks';
import { useMe } from '@hooks/use-me.hooks';
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

const Sidebar: React.FC<ISidebarProps> = ({ handleToggleSidebar, isToggled }) => {
  const router = useRouter();
  const [signOut] = useSignOut();
  const [, user] = useMe();

  if (!user) {
    return <div />;
  }

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
          <img src={UrlHelper.getImageSrc(user.image.filename, config.APP_STATIC_FILES)} alt="profile" />
          <div className={styles.profileDetails}>
            <p>{user.name} {user.surname}</p>
            <p>{user.email}</p>
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
                <Link href={COMPANY_ROUTE(user.institutionId.toString(), item.key)}>
                  {item.name}
                </Link>
              </p>
            </MenuItem>
          ))}
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu>
          <MenuItem onClick={signOut} className={styles.menuItem}>
            <SignOutIcon />
            <p>Выйти</p>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
