

export default function handlerReducer(state,action){
    switch(action.type){
        case 'change':
            return {...state,[action.id]: action.value};
        case 'lessons':
            if(state[action.id]){return {...state,[action.id]:false}
    }else return {...state,[action.id]:true};
        case 'submit':
            return '';
        default:
            return new Error('Action not supported');
    }
}

