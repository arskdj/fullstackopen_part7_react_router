import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act, render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import App from '../App'


test('test blog', () => {

    const likeBlog = App.likeBlog
    const blog = {
        title: 'test title',
        url: 'test url',
        author : 'test author',
        likes : 1111
    }

    const likeFn = jest.fn()
    const component = render( <Blog blog={blog} likeBlog={likeFn} />)

    const button = component.getByText('view')
    fireEvent.click(button)
    expect(button).toHaveTextContent('hide')

    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const likes = component.container.querySelector('#likes')

    expect(title).toHaveTextContent(`${blog.title} by ${blog.author}`)
    expect(url).toHaveTextContent(blog.url)
    expect(likes).toHaveTextContent(blog.likes)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeFn.mock.calls).toHaveLength(2)
    
})

