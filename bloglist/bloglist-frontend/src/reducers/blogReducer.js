import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch (action.type){
        case 'INIT_BLOGS':
            return action.data.blogs
        case 'ADD_BLOG':
            return [...state, action.data.blog]
        case 'LIKE_BLOG':
            return state.map(b => b.id === action.data.blog.id
                    ? action.data.blog
                    : b
            )
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data.id)
        default: return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const response = await blogService.getAll()
        const blogs = response.sort( (a,b) => b.likes - a.likes)
        dispatch({
            type : 'INIT_BLOGS',
            data : { blogs }
        })
    }
}

export const addBlog = (blog) => {
    return dispatch => {
        dispatch({
            type : 'ADD_BLOG',
            data : { blog }
        })
    }
}

export const likeBlog = (blog) => {
    return dispatch => {
        dispatch({
            type : 'LIKE_BLOG',
            data : {blog}
        })
    } 
}

export const removeBlog = (id) => {
    return dispatch => {
        dispatch({
            type : 'REMOVE_BLOG',
            data : {id}
        })
    } 
}
export default blogReducer
