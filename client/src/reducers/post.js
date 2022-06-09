import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_FRIENDS_BEGIN,
    FETCH_FRIENDS_FAILURE,
    FETCH_FRIENDS_SUCCESS,
    REMOVE_FRIEND_BEGIN,
    REMOVE_FRIEND_FAILURE,
    REMOVE_FRIEND_SUCCESSFULLY,
    FETCH_COMMENTS_SUCCESS,
    COMMENT_ADDED_FAIL,
    COMMENT_ADDED_SUCCESS,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    LIKE_ADDED_FAILURE,
    LIKE_ADDED_SUCCESSFULLY,
    REMOVE_LIKE_FAILURE,
    REMOVE_LIKE_SUCCESSSFULL,
    EDIT_COMMENT_FAILURE,
    EDIT_COMMENT_SUCCESSFULL,
    VIEW_USER_PROFILE_SUCCESSFULLY,
    VIEW_USER_PROFILE_FAILURE
  } from '../actions/types';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_PRODUCTS_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_PRODUCTS_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          items: action.payload
        };
        case EDIT_COMMENT_SUCCESSFULL:
          // All done: set loading "false".
          // Also, replace the items with the ones from the server
          alert(action.payload.message)
          return {
            ...state,
            loading: false,
            items: action.payload
          };

          case VIEW_USER_PROFILE_SUCCESSFULLY:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
              ...state,
              loading: false,
              items: action.payload
            };
        case EDIT_COMMENT_FAILURE: 
        case VIEW_USER_PROFILE_FAILURE:
        case DELETE_POST_SUCCESS:
          // All done: set loading "false".
          // Also, replace the items with the ones from the server
          return {
            ...state,
            loading: false,
            items: action.payload
          };
          case REMOVE_LIKE_SUCCESSSFULL:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            alert(action.payload.message)
            return {
              ...state,
              loading: false,
              items: action.payload
            };
          case REMOVE_LIKE_FAILURE:
          case DELETE_POST_FAILURE:
          case LIKE_ADDED_SUCCESSFULLY:
              // All done: set loading "false".
              // Also, replace the items with the ones from the server
              alert(action.payload.message)
              return {
                ...state,
                loading: false,
                items: action.payload
              };
    
          case LIKE_ADDED_FAILURE:
        case COMMENT_ADDED_SUCCESS:
          // All done: set loading "false".
          // Also, replace the items with the ones from the server
          return {
            ...state,
            loading: false,
            items: action.payload
          };
        case REMOVE_FRIEND_SUCCESSFULLY:
          // All done: set loading "false".
          // Also, replace the items with the ones from the server
          return {
            ...state,
            loading: false,
            items: action.payload
          };
      case COMMENT_ADDED_FAIL:
      case FETCH_PRODUCTS_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have items to display anymore, so set `items` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the items around!
        // Do whatever seems right for your use case.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };
        case REMOVE_FRIEND_FAILURE:
          // The request failed. It's done. So set loading to "false".
          // Save the error, so we can display it somewhere.
          // Since it failed, we don't have items to display anymore, so set `items` empty.
          //
          // This is all up to you and your app though:
          // maybe you want to keep the items around!
          // Do whatever seems right for your use case.
          return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: []
          };
        case FETCH_FRIENDS_SUCCESS:
          // All done: set loading "false".
          // Also, replace the items with the ones from the server
          return {
            ...state,
            loading: false,
            items: action.payload
          };
          case FETCH_COMMENTS_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
              ...state,
              loading: false,
              items: action.payload
            };
          case FETCH_FRIENDS_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
              ...state,
              loading: true,
              error: null
            };
            case FETCH_FRIENDS_FAILURE:
              // The request failed. It's done. So set loading to "false".
              // Save the error, so we can display it somewhere.
              // Since it failed, we don't have items to display anymore, so set `items` empty.
              //
              // This is all up to you and your app though:
              // maybe you want to keep the items around!
              // Do whatever seems right for your use case.
              return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
              };
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }