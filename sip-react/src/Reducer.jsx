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
        case 'SET_SELECTED_IMAGES':
            var matchingComments = getMatchingComments(action.payload)
            var matchingTags = getMatchingTags(action.payload)
            return {
                ...state,
                selectedImages: action.payload,
                matchingComments: matchingComments,
                matchingTags: matchingTags
            };

        // Select / unselect an image
        case 'SET_IMAGE_BLOBS':
            return {
                ...state,
                imageBlobs: action.payload
            };

        // Comments
        case 'SET_ALL_COMMENTS':
            return {
                ...state,
                allComments: action.payload
            };

        // Tags
        case 'SET_ALL_TAGS':
            return {
                ...state,
                allTags: action.payload
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
            console.log(action.payload)
            return {
                ...state,
                newTagTxt: action.payload
            };
        case 'SET_NEW_COMMENT_TEXT':
            return {
                ...state,
                newCommentTxt: action.payload
            };

        // Thumbnail Size
        case 'SET_THUMBNAIL_SIZE':
            return {
                ...state,
                thumbnailSize: action.payload
            };
        

        default:
            return state;
    }


    function getMatchingComments(images) {
        // Check which comments do all selected images have in common
        var allComments = images.map(image => { return image.imageCommentsList.map(comment => { return comment.id }) });
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
        return matchingComments
    }
    
    function getMatchingTags(images) {
        var allTags = images.map(image => { return image.imageHashtagsList.map(tag => { return tag.id }) });
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
                        matchingTags.push(state.allTags[j]);
                    }
                }
            }
        }
    
        return matchingTags
    }
};

export default Reducer;