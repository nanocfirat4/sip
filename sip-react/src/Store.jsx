import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'
import keycloak from './keycloak'

// Services
import { ImageService } from './services/ImageService'
import { CommentService } from './services/CommentService'
import { TagService } from './services/TagService'



const initialState = {
    loading: false,

    allImages: [],
    selectedImages: [],

    allComments: [],
    matchingComments: [],
    allTags: [],
    matchingTags: [],

    searchTags: [],
    searchComments: "",
};




const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;