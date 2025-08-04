import productModel from "../models/productModel";

export const getAllProducts = async ()=>{
  return await productModel.find()
}

export const seedInitialProducts = async ()=>{
  try {
    const products = [
    {title: "Dell laptop", image : "image.png" , price : 10666, stock :10 }
  ]

  const existingProducts = await getAllProducts();

  if (existingProducts.length === 0 ){
    await productModel.insertMany(products)
  }
    
  } catch (err) {
    console.error("canot see database" , err)
    
  }
 
  


}