
const db = require("../db/config")

module.exports = {
  findAll: async () => {
    const posts = await db('public.post').then((result) => {
      return result;
    })

    return posts;
  },

  find: async (id) => {
    const post = await db('public.post')
      .where({ id: id })
      .first()
      .then((result) => {
        return result;
      })

    return post;
  },
}