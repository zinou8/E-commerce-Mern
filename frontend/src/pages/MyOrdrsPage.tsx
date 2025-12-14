import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";

const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();
  useEffect(() => {
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography>My Orders</Typography>
      {myOrders.map(({ address, orderItems, total }) => (
        <Box
          sx={{ border: 1, borderColor: "gray", borderRadius: 2, padding: 1 }}
        >
          <Typography>adress : {address}</Typography>
          <Typography>items : {orderItems.length}</Typography>
          <Typography>total : {total}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default MyOrdersPage;
