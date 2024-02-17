const express = require('express');
const router = express.Router();
const { Category } = require('../Models/category')
const mongoose = require('mongoose');
const {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updatecategory
} = require('../Controller/categoryController');

router

    //To get all categories
    .get('/', getCategories)

    //To get specific category
    .get('/:id', getCategory)

    //To create category
    .post('/', createCategory)

    //To delete category
    .delete('/:id', deleteCategory)

    //To update category
    .put('/:id', updatecategory)

module.exports = router