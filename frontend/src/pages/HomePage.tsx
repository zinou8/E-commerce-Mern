import { Box, Container, Grid as Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <Box>Somthing went wrong , please try again</Box>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard
              id={product._id}
              title={product.title}
              image={product.image}
              price={product.price}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
