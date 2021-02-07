
const ADD_USER = 'ADD_USER';
const ADD_MESSAGE = 'ADD_MESSAGE';
const SET_DATA = 'SET_DATA';
const IS_LOADING = 'IS_LOADING';
const IS_JOINED = 'IS_JOINED';



const initialState = {

    userName: null,

    users: [],

    messages: [],

    isLoading: false,

    joined: false,

    avatar: null

};

const chatReducer = (state = initialState, action) =>{
  
    switch (action.type) {
        case 'ADD_USER':
            
            return {
                ...state,
                users: action.payload
               
            };

        case 'SET_DATA':
         
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages
            
            };
        case 'ADD_MESSAGE':
            
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
                       
        case 'IS_LOADING':
            
            return {
                ...state,
                isLoading: action.payload
            };
        case 'IS_JOINED':
            
            return {
                ...state,
                joined: true,
                userName: action.payload.userName,
                avatar: action.payload.userAvatar
            };
              
        default:
            return state;
    }   
};

export const addUser = user => {
   
    return {
        type: ADD_USER,
        payload: user
    };
};
export const setData = data => {
   
    return {
        type: SET_DATA,
        payload: data
    };
};
export const addMessage = message => {
   
    return {
        type: ADD_MESSAGE,
        payload: message
    };
};

export const setLoading = bool => {
   
    return {
        type: IS_LOADING,
        payload: bool
    };
};
export const setJoined = str => {
   
    return {
        type: IS_JOINED,
        payload: str
    };
};

export default chatReducer;