import expressAsyncHandler from "express-async-handler";
import { PaymentModel } from "../../database/schema/payment";
import { handleErrors } from "../../utils";

const createPayment = async (req: any, res: any) => {
  const newPayment = new PaymentModel({
    ...req?.body,
  });

  await newPayment
    ?.save()
    ?.then((response) => {
      res?.status(201)?.json({
        data: response,
        message: "Payment created successfully",
      });
    })
    ?.catch((e) => {
      res?.status(400)?.json({
        message: "There was an error creating this payment",
        error: handleErrors(e),
      });
    });
};

const updatePayment = (req: any, res: any) => {
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

  PaymentModel?.findOneAndUpdate({ _id: id }, rest, {
    useFindAndModify: false,
    new: true,
  })
    ?.then((response) => {
      res?.status(202)?.json({
        data: response,
        message: "Payment updated Successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error updating payment",
        // error: handleErrors(errors),
      });
    });
};

/**
 * @description Single Payment
 * @route api/payments/:id
 * @access Private
 */
const getPaymentById = async (model: any, req: any, res: any) => {
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
 * @description Get All Payments
 * @route api/payments
 * @access Private
 */
const getPayments = async (model: any, _: any, res: any) => {
  await model?.find({})?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

const deletePayment = expressAsyncHandler(async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await PaymentModel.findByIdAndDelete({ _id: id });
  res.json({ message: "Payment deleted" });
});

export {
  createPayment,
  updatePayment,
  getPaymentById,
  getPayments,
  deletePayment,
};
