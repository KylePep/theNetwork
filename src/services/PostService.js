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


}
export const postService = new PostService