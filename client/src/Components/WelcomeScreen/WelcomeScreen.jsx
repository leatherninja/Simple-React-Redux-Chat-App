import axios from 'axios';
import React, {useState} from 'react';
import {FaRegComments} from 'react-icons/fa';
import './WelcomeScreen.scss';

function WelcomeScreen({onLogin, setLoading, isLoading, dispatch, getAvatar}) {
  const [userName, setUserName] = useState('');

  const onEnter = async () => {
    dispatch(setLoading(true));
    const userAvatar =` https://avatars.dicebear.com/4.5/api/human/${userName}.svg`;
    await axios.post('/room', {userName, userAvatar});
    onLogin(userName, userAvatar);
    dispatch(setLoading(false));
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-screen__title">
        <span className="welcome-screen__title__logo">
          <FaRegComments size="150px" color="#665DFE" />
        </span>
      </div>
      <div className="welcome-screen__input">
        <input
          type="text"
          value={userName}
          placeholder="Введите имя"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className="sign-in">
        {isLoading ? (
          <span className="sign-in__loader">Загрузка...</span>
        ) : userName && (
          <button className="sign-in__btn" onClick={onEnter}>
            Войти
          </button>
        )}
      </div>
    </div>
  );
}

export default WelcomeScreen;
