import React from 'react';
import logo from '../image/Vector.svg';

export default function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
    </header>
  )
}
