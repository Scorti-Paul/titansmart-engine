import expressAsyncHandler from "express-async-handler";
import { ProductModel } from "../../database/schema/product";

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

const updateProduct = (req: any, res: any) => {
  if (!req.body) {
    return res.status(400)?.json({
      message: "Data to update cannot be empty",
    });
  }
  const { id, ...rest } = req?.body;

  if (!id) {
    return res?.status(400)?.json({
      message: "id is required to update this data",
    });
  }

  ProductModel?.findOneAndUpdate({ _id: id }, rest, {
    useFindAndModify: false,
    new: true,
  })
    ?.then((response) => {
      res?.status(202)?.json({
        data: response,
        message: "Product updated Successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error updating product",
        // error: handleErrors(errors),
      });
    });
};

/**
 * @description Single Product
 * @route api/products/:id
 * @access Private
 */
const getProductById = async (model: any, req: any, res: any) => {
  const { id } = req?.query;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await model?.findById(id)?.then((data: any) => {
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
const getProducts = async (model: any, _: any, res: any) => {
  await model?.find({})?.populate("categoryID")?.then((data: any) => {
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

export {
  createProduct,
  updateProduct,
  getProductById,
  getProducts,
  deleteProduct,
};
