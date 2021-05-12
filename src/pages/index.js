// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import Grid from '../components/grid';
import Header from '../components/header';
// import { startClock } from '../redux/actions';

const Index = () =>
// const dispatch = useDispatch();
// useEffect(() => {
//   dispatch(startClock());
// }, [dispatch]);

(
  <div className='shadow-2xl min-h-screen layout mx-auto'>
    <style jsx>
      {`
        .layout{
          width: 100vw;
          max-width:500px;
        }
      `}
    </style>
    <Header />
    <Grid />
      Hallo
  </div>
)
  ;

export default Index;
