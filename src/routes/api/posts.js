import { Router } from 'express'

const router = Router()

router.get('/posts', (req, res) => {
    res.json({ todo: 'Get all posts' })
})

router.get('/posts/:id', (req, res) => {
    res.json({ todo: `Get one post with ID: ${req.params.id}` })
})

router.post('/posts', (req, res) => {
    res.json({ todo: 'Add one post' })
})

router.put('/posts/:id', (req, res) => {
    res.json({ todo: `Update post with ID: ${req.params.id}` })
})

router.delete('/posts/:id', (req, res) => {
    res.json({ todo: `Delete post with ID: ${req.params.id}` })
})

export default router
