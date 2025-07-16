import { cartModel } from "../models/cartModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId , totalAmount : 0});
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
