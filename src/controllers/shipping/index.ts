import expressAsyncHandler from "express-async-handler";
import { ShippingModel } from "../../database/schema/shipping";

const createShipping = async (req: any, res: any) => {
  const newShipping = new ShippingModel({
    ...req?.body,
  });

  await newShipping
    ?.save()
    ?.then((response) => {
      res?.status(201)?.json({
        data: response,
        message: "Shipping created successfully",
      });
    })
    ?.catch((err) => {
      res?.status(400)?.json({
        message: `There was an error creating this shipping ${err.message}`,
        // error: handleErrors(err),
      });
    });
};

const updateShipping = (req: any, res: any) => {
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

  ShippingModel?.findOneAndUpdate({ _id: id }, rest, {
    useFindAndModify: false,
    new: true,
  })
    ?.then((response) => {
      res?.status(202)?.json({
        data: response,
        message: "Shipping updated Successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error updating shipping",
        // error: handleErrors(errors),
      });
    });
};

/**
 * @description Single Shipping
 * @route api/shippings/:id
 * @access Private
 */
const getShippingById = async (model: any, req: any, res: any) => {
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
 * @description Get All Shippings
 * @route api/shippings
 * @access Private
 */
const getShippings = async (model: any, _: any, res: any) => {
  await model?.find({})?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

const deleteShipping = expressAsyncHandler(async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await ShippingModel.findByIdAndDelete({ _id: id });
  res.json({ message: "Shipping deleted" });
});

export {
  createShipping,
  updateShipping,
  getShippingById,
  getShippings,
  deleteShipping,
};
