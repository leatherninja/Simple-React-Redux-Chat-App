import React, {useRef, useState, useEffect} from 'react';
import './Room.scss';
import socket from '../../socket';
import {FaArrowRight} from 'react-icons/fa';

function Room({users, messages, userName, onAddMessage, avatar}) {
  const [messageValue, setMessageValue] = useState('');

  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      text: messageValue,
      avatar: avatar,
    });
    setMessageValue('');
    onAddMessage({
      userName,
      text: messageValue,
      id: messages.id,
      avatar: avatar,
    });
  };

  return (
    <div className="room">
      <div className="users-list">
        <div className="users-list__online-count">
          <span>
            в сети :
            <span  className="users-list__online-count__count">{users.length}</span>
          </span>
        </div>
        <ul className="users-list__items">
          {users.map((user, idx) => (
            <li className="users-list__items__item" key={idx + user.userName}>
              <span
                className="users-list__items__item__avatar"
                style={{backgroundImage: `url(${user.userAvatar})`}}
              ></span>
              <span className="users-list__items__item__name">
                {user.userName}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="room-wrap">
        <div className="header">
          <div
            className="header__avatar"
            style={{backgroundImage: `url(${avatar})`}}
          ></div>
          <div className="header__name">
            <span>{userName}</span>
          </div>
        </div>
        <div className="message-area" ref={messagesRef}>
          {messages.map((message, idx) => (
            <div
              className={message.id ? 'message' : 'my-message'}
              key={idx + message.userName}
            >
              <div
                className="message-avatar"
                style={{backgroundImage: `url(${message.avatar})`}}
              ></div>
              <span className="message-name">{message.userName}</span>
              <p className="message-text">{message.text}</p>
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={(e) => e.preventDefault()}>
          <textarea
            className="chat-form__text-area"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          ></textarea>
          <div className="chat-form__btn-wrapper">
            <button
              className="chat-form__btn-wrapper__btn"
              disabled={!messageValue}
              onClick={sendMessage}
            >
              <span className="chat-form__btn-wrapper__btn__icon">
                <FaArrowRight color="#665DFE" size="18px" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Room;
