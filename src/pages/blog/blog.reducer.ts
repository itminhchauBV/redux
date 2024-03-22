import { createAction, createReducer } from '@reduxjs/toolkit'
import { initalPostlist } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editStatePost: Post | null
}

const initalStase: BlogState = {
  postList: initalPostlist,
  editStatePost: null,
}
export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<string>('blog/deletePost')
export const startEditPost = createAction<string>('/blog/startEditPost')
export const cancelEditPost = createAction('/blog/cancelEditPost')
export const editPost = createAction<Post>('blog/editPost')

const blogReducer = createReducer(initalStase, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      const newPost = action.payload
      state.postList.push(newPost)
    })
    .addCase(deletePost, (state, action) => {
      const idPost: string = action.payload
      const newList = state.postList.filter((item) => item.id !== idPost)
      state.postList = newList
    })
    .addCase(startEditPost, (state, action) => {
      const data = state.postList.find((element) => element.id === action.payload) || null
      state.editStatePost = data
    })
    .addCase(cancelEditPost, (state, action) => {
      state.editStatePost = null
    })
    .addCase(editPost,(state, action)=>{
        state.postList.some((post,index)=>{
    
            if (post.id === action.payload.id) {
                state.postList[index] = action.payload
                return true
            }
            return false
        })
        
    })
})

export default blogReducer
