const Product = require('../models/Products');

module.exports = {
    createProduct: async (req,res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json(`product created successfully.`);
        } catch (error) {
            res.status(500).json(`failed to create product.`);
            console.log(`Creating product error!\n ${error}`);
        }
    },

    getAllProducts: async (req,res) => {
        try {
            const products = await Product.find().sort({createdAt: -1});
            res.status(200).json(products); 
        } catch (error) {
            res.status(500).json(`failed to get products.`);
            console.log(`Getting products error!\n ${error}`);
            
        }
    },

    getProduct: async (req,res) => {
        const {id} = req.params;
        try {
            const product = await Product.findById(id);
            res.status(200).json(product); 
        } catch (error) {
            res.status(500).json(`failed to get product.`);
            console.log(`Getting product error!\n ${error}`);
        }
    },

    searchProduct: async (req,res) => {

        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "furniture",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(`failed to get products.`);
            console.log(`Searching  product error!\n ${error}`);
        }
    },


}