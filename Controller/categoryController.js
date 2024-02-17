const { Category } = require('../Models/category')
const asyncHandler = require('../Middlewares/asyncHandler')
const errorResponse = require('../Utils/errorResponse')

// @Get request to get all categories
// @Private method (Token required)
exports.getCategories = asyncHandler(
    async (req, res) => {
        const allcategory = await Category.find()
        res.send(allcategory)
    }
)

// @Get request to get specific category
// @Private method (Token required)
exports.getCategory = asyncHandler(
    async (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(new errorResponse('Category id is not valid', 400))
        }
        const oneCategory = await Category.findById(req.params.id)
        if (!oneCategory) {
            return next(new errorResponse('category not found', 400))
        } else {
            res.staus(200).json({ success: true, message: 'Category found', Category: oneCategory })
        }
    }
)

// @Post request to create category
// @Private method (Token required)
exports.createCategory = asyncHandler(
    async (req, res, next) => {
        if (req.isAdmin) {
            let newCategory = new Category(
                {
                    name: req.body.name,
                    icon: req.body.icon,
                    color: req.body.color
                }
            )
            const createdCategory = await Category.create(newCategory)
                .catch(next(new errorResponse('Category not created', 400)))

            if (createdCategory) {
                return res.status(200).json({ success: true, category: createdCategory })
            } else {
                return next(new errorResponse('Category not created', 400))
            }
        }
    }
)

// @Delete request to delete category
// @Private method (Token required)
exports.deleteCategory = asyncHandler(
    async (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(new errorResponse('Category id not found', 404))
        }
        Category.findByIdAndRemove(req.params.id).then(category => {
            if (category) {
                return res.status(200).json({ success: true, message: 'Category deleted succesfully' })
            } else {
                return next(new errorResponse('Category not deleted', 400))
            }
        }).catch(err => {
            return next()
        })
    }
)

// @Put request to update category
// @Private method (Token required)
exports.updatecategory = asyncHandler(
    async (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(new errorResponse('Category id not found', 404))
        }
        const updatedCat = await Category.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color
            },
            { new: true }
        )
        if (!updatedCat) {
            return next(new errorResponse('Category not found', 400))
        } else {
            return res.status(200).json({ success: true, message: 'Category updated succesfully' })
        }
    }
)