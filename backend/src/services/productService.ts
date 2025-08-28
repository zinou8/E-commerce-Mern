import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell laptop",
        image:
          "https://images-cdn.ubuy.co.in/635188ad8d2e224aff12d5c3-dell-inspiron-15-5570-15-6-laptop.jpg",
        price: 10666,
        stock: 10,
      },
      {
        title: "Asus laptop",
        image:
          "https://dlcdnwebimgs.asus.com/gain/ba3d1966-0081-4ee2-ad23-1236a3bff982/w800",
        price: 25000,
        stock: 10,
      },
      {
        title: "HP laptop",
        image:
          "https://i5.walmartimages.com/seo/HP-Stream-14-Laptop-Intel-Celeron-N4000-4GB-SDRAM-32GB-eMMC-Office-365-1-yr-Royal-Blue_4f941fe6-0cf3-42af-a06c-7532138492fc_2.cb8e85270e731cb1ef85d431e49f0bf2.jpeg",
        price: 40000,
        stock: 10,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("canot see database", err);
  }
};
