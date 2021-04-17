const Reducer = (state, action) => {
    switch (action.type) {
        // Website / API is loading
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        
        // Set all Images 
        case 'SET_ALL_IMAGES':
            return {
                ...state,
                allImages: action.payload
                //allImages: state.posts.concat(action.payload)
            };
        
        // Select / unselect an image
        case 'SELECT_IMAGE':
            return {
                ...state,
                selectedImages: state.posts.filter(post => post.id !== action.payload)
            };
        
        // Comments
        case 'SET_ALL_COMMENTS':
            return {
                ...state,
                allComments: action.payload
            };
        case 'SET_MATCHING_COMMENTS':
            return {
                ...state,
                matchingComments: action.payload
            };

        // Tags
        case 'SET_ALL_TAGS':
            return {
                ...state,
                allTags: action.payload
            };
        case 'SET_MATCHING_TAGS':
            return {
                ...state,
                matchingTags: action.payload
            };

        // Store searches
        case 'SET_SEARCH_TAGS':
            return {
                ...state,
                searchTags: action.payload
            };
        case 'SET_SEARCH_COMMENTS':
            return {
                ...state,
                searchComments: action.payload
            };
    

        default:
            return state;
    }
};

export default Reducer;