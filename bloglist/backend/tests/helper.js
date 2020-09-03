const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [ { user: '5f3d623f14cfa280f05328de', _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 } ]

const getAllBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const initialUsers = [
    {'_id':'5f3d623f14cfa280f05328de','name':'mario','blogs':['5a422a851b54a676234d17f7'],'username':'some1','password':'$2b$15$Yq.wgv7tJ0czSGZU6vOKDevQst1xNuOnA.OUNf8HSakkSAv7RVvvu','__v':0},
    {'_id':'5f3d623f14cfa280f05328df','name':'wario','blogs':[],'username':'some4','password':'$2b$15$BvJlzkwq5usqAAF6d6YAx.76nykQZFZFlNae2Q2xSGw/jy5SgWO0u','__v':0},
    {'_id':'5f3d623f14cfa280f05328e0','name':'waluigi','blogs':[],'username':'some3','password':'$2b$15$Y2t1CtfqdCt2Kxb0.kisiO6g2QyesKzxVpS5lnPIZi3agv6rpr0Gm','__v':0},
    {'_id':'5f3d623f14cfa280f05328e1','name':'luigi','blogs':[],'username':'some2','password':'$2b$15$9fTOUtpcl8tuc47MlW3U6ezNkH7IlRp/GjPO4PjpsAjz52MOkXabC','__v':0}
]


const getAllUsers = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    getAllBlogs,
    initialUsers,
    getAllUsers
}
