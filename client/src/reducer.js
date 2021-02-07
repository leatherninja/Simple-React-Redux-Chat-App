export default (state, action) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: true,
                userName: action.payload.userName,
                userId: action.payload.userId,
            };
       
    
        default:
            return state;
    }
};