const router = require('koa-router')()
const Person = require('../dbs/models/person')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addPerson', async function(ctx) {
  let person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })

  let code;

  try {
      await person.save();
      code = 0
    } catch (error) {
      code = -1
    }
  ctx.body = {
    code: code,
  }
})

router.post('/getPerson', async function(ctx) {
  const result = await Person.findOne({name: ctx.request.body.name});
  const results = await Person.find({ name: ctx.request.body.name });
  ctx.body = {
    code: 0,
    result,
    results,
  }
})

router.post('/updatePerson', async function (ctx) {
  let startTime = new Date().toLocaleString()

  const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    name: ctx.request.body.newName,
    age: ctx.request.body.newAge
  }).then(async data => {
    return await new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        resolve(data)
      }, 2000);
    })
  }).then( data => {return data}) 

  let endTime = new Date().toLocaleString()
  
  ctx.body = {
    startTime,
    endTime,
    result,
  }
})

router.post('/deletePerson', async function(ctx) {
  const result = await Person.where({
    name: ctx.request.body.name
  }).remove()

  ctx.body = {
    code: 0,
    result,
  }
})

module.exports = router
