import React from 'react';
import './Usage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


const Usage = () => {
  return (
    <div className="usage-container">
      <h1>このWebアプリについて</h1>
      <p>このWebアプリはぷよぷよの連鎖をシミュレートするものです。<br />
        ChatGPT4の力を（主にReact周りやCSS周りで）借りながら、Reactで開発されています。
      </p>
      <p>何かあれば <a href="https://twitter.com/kyopro_mint" target="_blank" rel="noopener noreferrer">
        @kyopro_mint
      </a> までご連絡ください。</p>

      <h2>ぷよの配置方法</h2>
      <ul>
        <li>右側でぷよの色を選んで、フィールドをクリックすることでぷよを置くことができます。</li>
        <li>PCは長押しに対応しています。</li>
        <li>右クリックでぷよを削除できます。</li>
      </ul>

      <h2>連鎖の実行方法</h2>
      <ul>
        <li>連鎖は速さを選んでAutoで実行、もしくはStepで一手ずつ実行できます。</li>
        <li>Moderate: 中くらいの速さ、Instantaneous: 爆速 （Fast未満Slow以上な単語とFast以上な単語をChatGPTに聞いたら教えてくれました）。</li>
        <li>ただし、Stepはまだ機能が怪しいのでAutoがおすすめです。</li>
        <li>Redoも怪しいです。</li>
      </ul>
    </div>
  );
};

export default Usage;
