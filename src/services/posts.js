import Joi from '@hapi/joi'

import db from '../helpers/db'

// Scaffold the Posts Schema

const postSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  author: Joi.string().required(),
})

const createNewPostObject = (data) => {
  const { error, value } = postSchema.validate(data)
  return !error
    ? {
        ...value,
        created: new Date().toLocaleString(),
        updated: new Date().toLocaleString(),
      }
    : { error }
}

const createPostObject = (data) => {
  const { error, value } = postSchema.validate(data)
  return !error
    ? {
        ...value,
        updated: new Date().toLocaleString(),
      }
    : { error }
}

// Get all posts

export const getAll = async () => {
  const posts = await db('posts')
  return posts
}

// Get single post by ID

export const getById = async (id) => {
  const post = await db('posts').where({ id }).first()
  return post
}

// Add post to the DB

export const add = async (post) => {
  const postObject = createNewPostObject(post)
  if (!postObject.error) {
    const id = await db('posts').insert(postObject)
    return await getById(id[0])
  } else {
    return postObject
  }
}

// Update post by ID

export const update = async (post, id) => {
  if (await getById(id)) {
    const postObject = createPostObject(post)
    if (!postObject.error) {
      await db('posts').where({ id }).update(postObject)
      return await getById(id)
    } else {
      return postObject
    }
  } else {
    return null
  }
}

// Remove post by ID

export const remove = async (id) => {
  await db('posts').where({ id }).del()
  return { msg: 'Ok' }
}
