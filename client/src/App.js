import './App.scss';
import Room from './Components/Room/Room';
import WelcomeScreen from './Components/WelcomeScreen/WelcomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  setJoined,
  addUser,
  setLoading,
  addMessage,
  setData,
} from './redux/reducers/chatReducer';
import socket from './socket';
import {useEffect} from 'react';
import axios from 'axios';

function App() {

  const { joined, 
          users, 
          userName, 
          isLoading, 
          messages, 
          avatar
        } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const setUsers = (users) => {
    dispatch(addUser(users));
  };



  const onLogin = async (userName, userAvatar) => {
    dispatch(setJoined({
      userName: userName,
      userAvatar: userAvatar
    }));
    socket.emit('ROOM:JOIN', {userName, userAvatar});
    const {data} = await axios.get('/room');
    dispatch(setData(data));
  };

  const onAddMessage = (message) => {
    dispatch(addMessage(message));
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', data => {
      setUsers(data);
    });
    socket.on('ROOM:NEW_MESSAGE', onAddMessage);
  }, []);

  return (
    <div className="App">
      {!joined ? (
        <WelcomeScreen
          onLogin={onLogin}
          isLoading={isLoading}
          setLoading={setLoading}
          dispatch={dispatch}
        />
      ) : (
        <Room
          users={users}
          userName={userName}
          messages={messages}
          isLoading={isLoading}
          onAddMessage={onAddMessage}
          avatar = {avatar}
        />
      )}
    </div>
  );
}

export default App;
