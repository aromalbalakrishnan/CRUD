const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Please enter product Name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        }
    },{timestamps: true}
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;