import expressAsyncHandler from "express-async-handler";
import { CartModel } from "../../database/schema/cart";

const addToCart = async (req: any, res: any) => {
  const { user, cartItem, quantity } = req?.body;

  try {
    const cart = await CartModel.findOne({ user });

    if (cart) {
      const existingProducts = cart.products.find(
        (product) => product.cartItem?.toString() === cartItem
      );

      if (existingProducts) {
        existingProducts.quantity += 1;
      } else {
        cart.products.push({ cartItem, quantity });
      }

      await cart.save();
      res.send(200).json("Product added to cart");
    } else {
      const newCart = new CartModel({
        user,
        products: [
          {
            cartItem,
            quantity: quantity,
          },
        ],
      });

      await newCart.save();
      res.send(200).json("Product added to cart");
    }
  } catch (error) {
    res?.status(500)?.json({
      message: "Error occurred while adding item to Cart",
    });
  }
};

/**
 * @description Single Notification
 * @route api/notifications/:id
 * @access Private
 */
const getCart = async (req: any, res: any) => {
  const { id } = req?.params;

  try {
    const cart = await CartModel.find({ user: id }).populate(
      "products.cartItem",
      "_id title amount sku images[0]"
    );

    res.send(200).json(cart);
  } catch (error) {
    res.send(500).json("Add product to cart error");
  }

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await CartModel?.findById(id)?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

/**
 * @description Get All Notifications
 * @route api/notifications
 * @access Private
 */
const decrementCartItem = async (_: any, res: any) => {
  await CartModel?.find({})?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

const deleteCartItem = expressAsyncHandler(async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await CartModel.findByIdAndDelete({ _id: id });
  res.json({ message: "Notification deleted" });
});

export { addToCart, getCart, deleteCartItem, decrementCartItem };
