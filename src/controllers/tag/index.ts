import expressAsyncHandler from "express-async-handler";
import { TagModel } from "../../database/schema/tag";

const createTag = async (req: any, res: any) => {
  const { name, slug } = req?.body;

  const tag = await TagModel.findOne({ name, slug });

  if (tag) {
    res?.status(400)?.json({
      message: "Tag already exists",
    });
  }
  const newTag = new TagModel({
    ...req?.body,
  });

  await newTag
    ?.save()
    ?.then((response) => {
      res?.status(201)?.json({
        data: response,
        message: "Tag created successfully",
      });
    })
    ?.catch((err) => {
      console.error(err);
      res?.status(400)?.json({
        message: "There was an error creating this tag",
      });
    });
};

const updateTag = (req: any, res: any) => {
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

  TagModel?.findOneAndUpdate({ _id: id }, rest, {
    useFindAndModify: false,
    new: true,
  })
    ?.then((response) => {
      res?.status(202)?.json({
        data: response,
        message: "Tag updated Successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error updating tag",
        // error: handleErrors(errors),
      });
    });
};

/**
 * @description Single Tag
 * @route api/tags/:id
 * @access Private
 */
const getTagById = async (model: any, req: any, res: any) => {
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
 * @description Get All Tags
 * @route api/tags
 * @access Private
 */
const getTags = async (model: any, _: any, res: any) => {
  await model?.find({})?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

const deleteTag = expressAsyncHandler(async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await TagModel.findByIdAndDelete({ _id: id });
  res.json({ message: "Tag deleted" });
});

export { createTag, updateTag, getTagById, getTags, deleteTag };
