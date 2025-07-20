import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCardForUser {
  userId: string;
}

export const getActiveCardForUser = async ({
  userId,
}: GetActiveCardForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCardForUser({ userId });

  const existInCart = cart.items.find((p) => p.product.toString() === productId);

  if (existInCart) {
    return { data: "item already exists in cart ", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found !", statusCode: 400 };
  }

  if (product.stock < quantity){
    return{data : "Low stock for item " , statusCode : 400 }
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  // update the totalamount for the cart 

  cart.totalAmount += product.price * quantity


  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};
