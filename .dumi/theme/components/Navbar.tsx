import React, { useContext, FC, MouseEvent } from 'react';
import { context, Link, NavLink } from 'dumi/theme';
import LocaleSelect from './LocaleSelect';
import NavButton from './NavButton';
import './Navbar.less';

interface INavbarProps {
  location: any;
  isHome?: boolean;
  navPrefix?: React.ReactNode;
  onMobileMenuClick: (ev: MouseEvent<HTMLButtonElement>) => void;
}

const Navbar: FC<INavbarProps> = ({ onMobileMenuClick, navPrefix, location, isHome }) => {
  const {
    base,
    config: { mode, title, logo },
    nav: navItems,
  } = useContext(context);

  console.log(process.env.NODE_ENV);

  return (
    <div
      className="__dumi-default-navbar"
      data-mode={mode}
      style={isHome ? {} : { backgroundColor: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}
    >
      {/* menu toogle button (only for mobile) */}
      <button className="__dumi-default-navbar-toggle" onClick={onMobileMenuClick} />
      {/* logo & title */}
      <Link
        className="__dumi-default-navbar-logo"
        style={{
          backgroundImage: logo && `url('${logo}')`,
        }}
        to={base}
        data-plaintext={logo === false || undefined}
      >
        {title}
      </Link>
      <nav className="anna-theme-nav">
        {navPrefix}
        {/* nav */}
        {navItems.map(nav => {
          const child = Boolean(nav.children?.length) && (
            <ul>
              {nav.children.map(item => (
                <li key={item.path}>
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          );

          return nav.path ? (
            <NavButton to={nav.path} key={nav.path} base={base}>
              {nav.title}
            </NavButton>
          ) : (
            <span key={nav.title}>
              {nav.title}
              {child}
            </span>
          );
        })}
        <LocaleSelect location={location} />
      </nav>
    </div>
  );
};

export default Navbar;
