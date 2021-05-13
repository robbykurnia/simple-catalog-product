import { useEffect, useState } from 'react';
import Grid from '../components/grid';
import Header from '../components/header';
import cartAPI from '../models/cart';
import ProductAPI from '../models/product';

const Index = ({ query }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(startClock());
  // }, [dispatch]);

  const [products, setProducts] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  useEffect(() => {
    ProductAPI.getProduct(query?.search)
      .then(res => {
        setProducts(res?.data?.products);
        cartAPI.getCart()
          .then(cart => {
            const existProduct = [...res?.data?.products];
            const productsInCart = [...cart?.data?.lines];
            let totalItem = 0;
            for (let i = 0; i < existProduct.length; i += 1) {
              for (let j = 0; j < productsInCart.length; j += 1) {
                totalItem += productsInCart[j].quantity;
                if (existProduct[i].uid === productsInCart[j].product.uid) {
                  existProduct[i].cartQty = productsInCart[j].quantity;
                }
              }
            }

            setTotalQty(totalItem);
            setProducts(existProduct);
          })
          .catch(err => console.log('err cartAPI', err));
      })
      .catch(() => setProducts([]));
  }, [query]);

  const onChangeCart = (type, index) => {
    const existProduct = [...products];
    if (type === '+') {
      existProduct[index].cartQty += 1;
    } else {
      existProduct[index].cartQty -= 1;
    }
    const data = {
      lines: [{
        product: { uid: existProduct[index].uid },
        quantity: existProduct[index].cartQty
      }]
    };
    cartAPI.putCart(data).then(res => {
      let totalItem = 0;
      for (let i = 0; i < res.data.lines.length; i += 1) {
        totalItem += res?.data?.lines[i]?.quantity;
      }
      setTotalQty(totalItem);
    });
    setProducts(existProduct);
  };

  return (
    <div className='shadow-2xl min-h-screen layout mx-auto'>
      <style jsx>
        {`
        .layout{
          width: 100vw;
          max-width:500px;
        }
      `}
      </style>
      <Header totalQty={totalQty} />
      <Grid query={query} currentProducts={products} onChangeCart={onChangeCart} />
    </div>
  );
}
  ;

Index.getInitialProps = async (ctx) => ({ query: ctx.query });

export default Index;
