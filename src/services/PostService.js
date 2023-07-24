import { useAttrs } from "vue"
import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('[Api Posts response]', res.data)
    AppState.posts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
  }

  async changePage(url) {
    const res = await api.get(url)
    logger.log('[Changing Page]')
    AppState.posts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
  }

  async createPost(formData) {
    const res = await api.post('api/posts', formData)
    AppState.posts.unshift(new Post(res.data))
  }

  async likeButton(postId) {
    const res = await api.post(`api/posts/${postId}/like`)
    const postIndex = AppState.posts.findIndex(p => p.id == postId)
    logger.log('[Data]', res.data, '[index]', postIndex)
    AppState.posts.splice(postIndex, 1, new Post(res.data))
    // AppState.posts[postIndex].
  }

  async removePostById(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    const postIndex = AppState.posts.findIndex(p => p.id == postId)
    logger.log('[Data]', res.data, '[index]', postIndex)
    AppState.posts.splice(postIndex, 1)
  }

  editFormById(postId) {
    const postIndex = AppState.posts.find(p => p.id == postId)
    if (postIndex.edit == false) {
      postIndex.edit = true
      logger.log('[Edit Post]')
      return
    } else {
      postIndex.edit = false
    }
  }

  async editPostById(postId, formData) {
    const res = await api.put(`api/posts/${postId}`, formData)
    const postIndex = AppState.posts.findIndex(p => p.id == postId)
    logger.log('[Data]', res.data, '[index]', postIndex)
    AppState.posts.splice(postIndex, 1, new Post(res.data))
  }

  async getPostsByQuery(query) {
    const res = await api.get(`api/posts/?query=${query}`)
    logger.log('[Query Results]', res.data, '[query]', query)
    AppState.posts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
    window.location.href = `#/search/${query}`
  }

}
export const postService = new PostService