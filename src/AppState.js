import { reactive } from 'vue'
import { postService } from "./services/PostService.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Post.js').Post} */
  posts: {},
  newer: null,
  older: null,
  page: 0,
  totalPages: 0,
  /** @type {import('./models/Ad.js').Ad} */
  ads: {},
  activeProfile: null,
  /** @type {import('./models/Post.js').Post} */
  activePost: null,
})
