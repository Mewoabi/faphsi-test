import { Product, useProducts } from '../contexts/ProductsContext';
import { Card, CardContent, Typography, Grid,CardActions, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import myAxios from '../utils/axios-instance';
import { useUser } from '../contexts/UserContext';

const HomePage = () => {
  const products = useProducts();
  const { user } = useUser()

  //   data = {
  //     "amount": Integer ,
  //     "email": String,
  //     "userId": String,
  //     "externalId": String,
  //     "redirectUrl": String,
  //     "message": String
  // }

  console.log(`${import.meta.env.VITE_BASEURL}/order-success`)
 

  const handlePay = async (product: Product) => {
    console.log(product)
    try {
      // const res = await myAxios.post(`/payments`, { productId: product.id, amount:product.price })
      const res = await myAxios.post(`/payments/initiate`, {
        amount: product.price,
        email: user?.email,
        redirectUrl: `${import.meta.env.VITE_BASEURL}/order-success`
      })
      console.log(res.data)
      localStorage.setItem('transId', res.data.transId)
      window.location.href = res.data.link;
      // navigate(res.data.link)
    } catch (error) {
      console.log(error)
      alert("something went wrong, couldn't process payments")
    }
  }

  return (
    <>
      <Navbar />
      <Grid container spacing={2} mt={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handlePay(product)}>pay now</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
