const asyncHandler = require('../Middlewares/asyncHandler')
const { Products } = require('../Models/product')
const errorResponse = require('../Utils/errorResponse')

// @Get request to get all products by category
// @Private method (Token required)
exports.getProdsByCat = asyncHandler(
    async (req, res, next) => {
        //to get products of particular categories we can use queries
        let filter = {}
        if (req.query.category) {
            //we will pass value seperated by comma(',')
            //If we declare filter here we will not be able to use outside the if condition
            filter = {
                category: req.query.category.split(',')
            }
        }

        const allProducts = await Products.find(filter).populate('category')
        if (allProducts) {
            return res.status(200).json({ success: true, products: allProducts })
        }
        return next(new errorResponse('Products not found', 400))
    }
)

// @Get request to get product
// @Private method (Token required)
exports.getProduct = asyncHandler(
    async (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(new errorResponse('Product id not found', 404))
        }
        const product = await Products.findById(req.params.id).populate('category')
        if (product) {
            return res.status(200).json({ success: true, message: 'Product found', Product: product })
        }
        return next(new errorResponse('Product not found', 404))
    }
)

// @Post request to create product
// @Private method (Token required)
exports.createProduct = asyncHandler(
    async (req, res, next) => {
        // newImg = []
        // newImg.push(req.body.images)
        const newProduct = new Products({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
            dateCreated: req.body.dateCreated
        })


        if (req.isAdmin) {
            const productCreated = await Products.create(newProduct).catch(err => { res.status(500).json({ success: false, message: 'New product not created', error: err }) })
            if (productCreated) {
                res.status(200).json({ success: true, message: 'New product created successfully', product: productCreated })
            }
            return next(new errorResponse('Product not created', 400))

        }
        return next(new errorResponse('Product not created', 401))

    }
)

// @Delete request to delete product
// @Private method (Token required)
exports.deleteProduct = asyncHandler(
    async (req, res, next) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(new errorResponse('Product id not found', 404))
        }
        const deletedPro = await Products.findByIdAndRemove(req.params.id).then(res.send('Product deleted successfully'))
    }
)

// @Put request to update product
// @Private method (Token required)
exports.updateProd = asyncHandler(
    async (req, res) => {
        if (req.isAdmin) {
            if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(404).json({ success: false, message: 'Product id not found' })
            }
            const updatedProd = await Products.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                images: [req.body.images],
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured,
                dateCreated: req.body.dateCreated
            },
                { new: true })
            if (updatedProd) {
                return res.status(200).json({ success: true, message: 'Products updated successfully', updatedProduct: updatedProd })
            }
            return next(new errorResponse('Product not updated', 400))
        }
    }
)

// @Get request to featured product
// @Private method (Token required)
exports.getFeaturedProd = asyncHandler(
    async (req, res, next) => {
        const count = req.params.count ? req.params.count : 0
        const featuredProducts = await Products.find({ isFeatured: true }).limit(+count)
        if (!featuredProducts) {
            return next(new errorResponse('Products not found', 400))
        }
        res.res.status(200).json({ success: true, message: 'Featured products found', Products: featuredProducts })
    }
)