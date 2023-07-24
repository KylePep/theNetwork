export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github
    this.resume = data.resume
    this.linkedin = data.linkedin
    this.graduated = data.graduated
    this.createdAt = data.createdAt
    this.class = data.class
  }
}

// const profile = {
//   "_id": "649b4e146845e119caa23265",
//   "subs": [
//       "auth0|649b4e13717429313a76062c"
//   ],
//   "email": "jeremy@jeremy.test",
//   "name": "jeremy",
//   "picture": "https://s.gravatar.com/avatar/fbe0a0aa52b0a02916a4d8727e477a69?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
//   "bio": "",
//   "coverImg": "https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
//   "github": "",
//   "linkedin": "",
//   "resume": "",
//   "class": "",
//   "graduated": false,
//   "createdAt": "2023-06-27T21:01:21.032Z",
//   "updatedAt": "2023-06-27T21:01:21.032Z",
//   "__v": 0,
//   "id": "649b4e146845e119caa23265"
// }