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
            };

        // Select / unselect an image
        case 'SELECT_IMAGE':
            return {
                ...state,
                selectedImages: state.posts.filter(post => post.id !== action.payload)
            };

        // Comments
        case 'SET_ALL_COMMENTS':
            console.log(action.payload);
            return {
                ...state,
                allComments: action.payload
            };
        case 'SET_MATCHING_COMMENTS':
            // Check which comments do all selected images have in common
            var allComments = state.selectedImages.map(image => { return image.imageCommentsList.map(comment => { return comment.id }) });
            var matchingComments = []

            if (allComments.length > 0) {
                // Filter Comments
                var result = allComments.shift().filter(function (v) {
                    return allComments.every(function (a) {
                        return a.indexOf(v) !== -1;
                    });
                });
                // Add Comments to state
                for (var j = 0; j < state.allComments.length; j++) {
                    for (var i = 0; i < result.length; i++) {
                        if (state.allComments[j].id === result[i]) {
                            matchingComments.push(state.allComments[j]);
                        }
                    }
                }
            }

            return {
                ...state,
                matchingComments: matchingComments
            };

        // Tags
        case 'SET_ALL_TAGS':
            return {
                ...state,
                allTags: action.payload
            };
        case 'SET_MATCHING_TAGS':
            var allTags = state.selectedImages.map(image => { return image.imageHashtagsList.map(tag => { return tag.id }) });
            var matchingTags = []

            if (allTags.length > 0) {
                var result = allTags.shift().filter(function (v) {
                    return allTags.every(function (a) {
                        return a.indexOf(v) !== -1;
                    });
                });

                for (var j = 0; j < state.allTags.length; j++) {
                    for (var i = 0; i < result.length; i++) {
                        if (state.allTags[j].id == result[i]) {
                            matchingTags.push(state.allTags[j].hashtagtxt);
                        }
                    }
                }
            }
            console.log(state.allTags)
            console.log(matchingTags)

            return {
                ...state,
                matchingTags: matchingTags
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

        // Store searches
        case 'SET_NEW_TAG_TEXT':
            return {
                ...state,
                newTagTxt: action.payload
            };
        case 'SET_NEW_COMMENT_TEXT':
            return {
                ...state,
                newCommentTxt: action.payload
            };

        default:
            return state;
    }
};

export default Reducer;