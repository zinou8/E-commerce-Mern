import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number | string;
}

const ProductCard = ({ title, image, price }: ProductCardProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          ${typeof price === 'number' ? price.toFixed(2) : price}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            fullWidth
          >
            Add to Cart
          </Button>
         
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;