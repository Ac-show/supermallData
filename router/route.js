const express = require('express')
const route = express.Router()
const path = require('path')
const fs = require('fs')
const url = require('url')

const multidata = require('../data/home/multidata.json')
const recommend = require('../data/recommend/recommend.json')
const category = require('../data//category/category.json')

route.get('/home/multidata', (req, res) => {
  res.send(multidata)
})

route.get('/home/data', (req,res) => {
  let query = url.parse(req.url, true).query
  if (!query.type && !query.page) {
    return 
  }
  const relativePath = `../data/${query.type}/${query.type}${query.page}.json`
  let absolutePath = path.resolve(__dirname, relativePath)
  let data = fs.readFileSync(absolutePath)
  res.send(data.toString())
})

route.get('/detail', (req, res) => {
  let query = url.parse(req.url, true).query
  if (!query.iid) {
    return
  }

  const relativePath = `../data/details/${query.iid}.json`
  let absolutePath = path.resolve(__dirname, relativePath)
  let data = fs.readFileSync(absolutePath)
  res.send(data.toString())
})

route.get('/recommend', (req, res) => {
  res.send(recommend)
})

route.get('/category', (req, res) => {
  res.send(category)
})

route.get('/subcategory', (req, res) => {
  let query = url.parse(req.url, true).query
  if (!query.maitKey) {
    return
  }

  const relativePath = `../data/subcategory/${query.maitKey}.json`
  let absolutePath = path.resolve(__dirname, relativePath)
  let data = fs.readFileSync(absolutePath)
  res.send(data.toString())
})

route.get('/subcategory/detail', (req, res) => {
  let query = url.parse(req.url, true).query
  if (!query.miniWallkey || !query.type) {
    return
  }

  const relativePath = `../data/subcategory_detail/${query.type}/${query.miniWallkey}.json`
  let absolutePath = path.resolve(__dirname, relativePath)
  let data = fs.readFileSync(absolutePath)
  res.send(data.toString())
})





module.exports = route