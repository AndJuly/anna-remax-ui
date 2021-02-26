import * as React from 'react';
import './NavButton.less';

const NavButton = props => {
  const { to } = props;
  const handleClick = () => {
    if (to?.includes('http')) {
      window.open(to);
      return;
    }
    window.location.href = process.env.NODE_ENV === 'development' ? to : '/annar' + to;
  };
  return (
    <div className="anna-nav-button" onClick={handleClick}>
      {props.children}
    </div>
  );
};

export default NavButton;
