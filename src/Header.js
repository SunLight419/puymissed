import React from 'react';
import './Header.css'; // スタイルシートをインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <header className="header header-margin-bottom">
      <h1 className="header-title">MNTぷよぷよ連鎖シミュレーター with ChatGPT β</h1>
      <a href="https://twitter.com/kyopro_mint" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" style={{ color: '#1da1f2' }} className="twitter-logo" />
      </a>
    </header>
  );
};

export default Header;
