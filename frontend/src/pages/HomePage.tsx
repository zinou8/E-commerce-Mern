import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import type { Product } from "../types/product"; // Fixed: Capital P in Product

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/product").then(async (response) => {
      const data = await response.json();
      setProducts(data);
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={2}>
        {products.map(({_id, title, image, price}) => (
          <Grid item md={4} key={_id}> {/* Fixed: Added key prop */}
            <ProductCard id={_id} title={title} image={image} price={price}/>
          </Grid>
        ))}
      </Grid>
    </Container>  
  );
};

export default HomePage;