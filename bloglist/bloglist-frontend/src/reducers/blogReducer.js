import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch (action.type){
        case 'ADD_BLOG':
            return [...state, action.data.blog]
        case 'INIT_BLOGS':
            return action.data.blogs
        default: return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
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
export default blogReducer
