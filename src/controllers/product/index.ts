import expressAsyncHandler from "express-async-handler";
import { ProductModel } from "../../database/schema/product";
import mongoose from "mongoose";

const createProduct = async (req: any, res: any) => {
  const { productName } = req?.body;

  const product = await ProductModel.findOne({ productName });

  if (product) {
    res?.status(400)?.json({
      message: "Product already exists",
    });
  }

  const newProduct = new ProductModel({
    ...req?.body,
  });

  await newProduct
    ?.save()
    ?.then((response) => {
      res?.status(201)?.json({
        data: response,
        message: "Product created successfully",
      });
    })
    ?.catch((err) => {
      res?.status(400)?.json({
        message: `There was an error creating this product ${err.message}`,
        // error: handleErrors(err),
      });
    });
};

const updateProduct = async (req: any, res: any) => {
  if (!req.body) {
    return res.status(400).json({ message: "Data to update cannot be empty" });
  }

  const { id, ...rest } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "id is required to update this data" });
  }

  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      rest,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "No product found with this id" });
    }

    return res.status(202).json({
      data: updatedProduct,
      message: "Product updated Successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: "There was an error updating product",
      error: error.message,
    });
  }
};

/**
 * @description Single Product
 * @route api/products/:id
 * @access Private
 */
const getProductById = async (req: any, res: any) => {
  console.log("Fetching product with id:", req.params.id);
  const { id } = req?.params;


  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return res?.status(400)?.json({
      message: "Invalid id format",
    });
  }

  const isProductExists = await ProductModel?.findById(id);
  if (!isProductExists) {
    return res?.status(404)?.json({
      message: "No product found with this id",
    });
  }

  await ProductModel?.findById(id)?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

/**
 * @description Get All Products
 * @route api/products
 * @access Private
 */
const getProducts = async (_: any, res: any) => {
  await ProductModel?.find({})
    ?.populate("category")
    ?.populate("tags")
    ?.then((data: any) => {
      res?.status(200)?.json({
        data,
      });
    });
};

const deleteProduct = expressAsyncHandler(async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await ProductModel.findByIdAndDelete({ _id: id });
  res.json({ message: "Product deleted" });
});

const searchProducts = async (req: any, res: any) => {
  try {
    const data = await ProductModel.aggregate([
      {
        $search: {
          index: "ProductSearch",
          text: {
            query: req?.params.key,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);

    res?.status(200)?.json({
      data,
    });
  } catch (error) {
    res.status(400).json({ message: "Error in search", error: error.message });
  }
};

export {
  createProduct,
  updateProduct,
  getProductById,
  getProducts,
  deleteProduct,
  searchProducts
};
