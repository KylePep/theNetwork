import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
  async getActiveProfilebyId(id) {
    if (!AppState.account.id) {
      return
    }
    if (!id) {
      const res = await api.get(`api/profiles/${AppState.account.id}`)
      logger.log('[Api Profile Response]', res.data)
      AppState.activeProfile = new Profile(res.data)
    } else {
      const res = await api.get(`api/profiles/${id}`)
      logger.log('[Api Profile Response]', res.data)
      AppState.activeProfile = new Profile(res.data)
    }
  }


  async getPostsById(id) {
    const res = await api.get(`api/profiles/${id}/posts`)
    logger.log('[Api Posts/Profile Response]', res.data)
    AppState.posts = res.data.posts.map(postPojo => new Post(postPojo))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
  }
}
export const profileService = new ProfileService()