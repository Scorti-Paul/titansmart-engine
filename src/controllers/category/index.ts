import expressAsyncHandler from "express-async-handler";
import { CategoryModel } from "../../database/schema/category";

const createCategory = async (req: any, res: any) => {
  const { name, slug } = req?.body;

  const category = await CategoryModel.findOne({ name, slug });

  if (category) {
    res?.status(400)?.json({
      message: "Category already exists",
    });
  }
  const newCategory = new CategoryModel({
    ...req?.body,
  });

  await newCategory
    ?.save()
    ?.then((response) => {
      res?.status(201)?.json({
        data: response,
        message: "Category created successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error creating this category",
        // error: handleErrors(err),
      });
    });
};

const updateCategory = (req: any, res: any) => {
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

  CategoryModel?.findOneAndUpdate({ _id: id }, rest, {
    useFindAndModify: false,
    new: true,
  })
    ?.then((response) => {
      res?.status(202)?.json({
        data: response,
        message: "Category updated Successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error updating category",
        // error: handleErrors(errors),
      });
    });
};

/**
 * @description Single Category
 * @route api/categorys/:id
 * @access Private
 */
const getCategoryById = async (model: any, req: any, res: any) => {
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
 * @description Get All Categories
 * @route api/categories
 * @access Private
 */
const getCategories = async (model: any, _: any, res: any) => {
  await model?.find({})?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

const deleteCategory = expressAsyncHandler(async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await CategoryModel.findByIdAndDelete({ _id: id });
  res.json({ message: "Category deleted" });
});

export {
  createCategory,
  updateCategory,
  getCategoryById,
  getCategories,
  deleteCategory,
};
