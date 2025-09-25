import { handleErrors } from "../../utils";
import { OrderModel } from "../../database/schema/order";

const createOrder = async (req: any, res: any) => {
  const orderNumber = "ORD-" + Math.floor(Math.random() * 100000000000);

  const trackingNumber = "TRK-" + Math.floor(Math.random() * 100000);

  const order = new OrderModel({
    ...req?.body,
    orderNumber,
    shippingInfo: {
      ...req?.body?.shippingInfo,
      trackingNumber,
    },
    // userID
  });

  order
    ?.save()
    ?.then((response) => {
      res?.status(200).json({
        data: response,
        token: req?.body?.token,
        message: "Order Created Successfully",
      });
    })
    ?.catch((e) => {
      res.status(400)?.json({
        error: handleErrors(e),
        message: "There was an error creating an order",
      });
    });
};

const updateOrder = (req: any, res: any) => {
  if (!req.body) {
    return res.status(400)?.json({
      message: "Data to update cannot be empty",
    });
  }
  const { id, items, ...rest } = req?.body;
  const agreedCost = items?.reduce(
    (acc: number, item: any) =>
      acc + Number(item.agreedPrice) * Number(item.quantity),
    0
  );
  const totalCost = items?.reduce(
    (acc: number, item: any) => acc + Number(item.cost) * Number(item.quantity),
    0
  );

  if (!id) {
    return res?.status(400)?.json({
      message: "id is required to update this data",
    });
  }

  OrderModel?.findOneAndUpdate(
    { _id: id },
    { ...rest, agreedCost, items, totalCost },
    {
      new: true,
    }
  )
    ?.then(() => {
      res?.status(202)?.json({
        message: "Order updated Successfully",
      });
    })
    ?.catch(({ errors }: any) => {
      res?.status(400)?.json({
        message: "There was an error updating order ",
        error: handleErrors(errors),
      });
    });
};

const patchOrder = (req: any, res: any) => {
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

  OrderModel?.updateOne({ _id: id }, { $set: rest })
    ?.then(() => {
      res?.status(202)?.json({
        message: "Order updated Successfully",
      });
    })
    ?.catch(({ errors }: any) => {
      res?.status(400)?.json({
        message: "There was an error updating order ",
        error: handleErrors(errors),
      });
    });
};

/**
 * @description Get All Orders
 * @route api/orders
 * @access Private
 */
const getOrders = async (model: any, _: any, res: any) => {
  await model
    ?.find({})
    ?.populate("user", "fullName firstName lastName email phone role avatar")
    ?.populate(
      "shippingInfo.shipping",
      "region address digitalAddress closestMark description"
    )
    ?.populate("products.product", "productName sku amount images")
    ?.then((data: any) => {
      res?.status(200)?.json({
        data,
      });
    });
};

export { createOrder, updateOrder, patchOrder, getOrders };
