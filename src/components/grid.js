import React, { useEffect, useState } from 'react';

const Grid = ({ currentProducts, onChangeCart }) => {
  const [products, setProducts] = useState(currentProducts);
  useEffect(() => {
    setProducts(currentProducts);
  }, [currentProducts]);

  return (
    <div className='flex flex-wrap'>
      <style jsx>
        {`
          .product-tile{
            width: 50%;
            max-width: 250px;
            padding: 8px;
            position: relative;
          }
        `}
      </style>
      {products && products.map((item, index) => (
        <div key={`product-${index}`} className='product-tile'>
          <div className='shadow-xl rounded-md'>
            <img src={item?.primary_image_url} alt='' />
            <div className='p-1'>
              <div className='text-sm'>{item?.name}</div>
              <div className='flex text-xs'>
                <div className='text-red-500'>{Math.ceil(((item?.original_price?.base_price.split('.')[0] - item?.original_price?.price.split('.')[0]) / item?.original_price?.base_price.split('.')[0]) * 100)}%</div>
                <div className='text-gray-500 ml-1 line-through'>{item?.original_price?.base_price.split('.')[0]}</div>
              </div>
              <div className='text-base text-red-500'>{item?.original_price?.price.split('.')[0]}</div>
              <div className='flex items-center justify-center'>
                <div onClick={() => onChangeCart('-', index)}>-</div>
                <div className='mx-4'>
                  {item.cartQty > 0 ? (
                    <div className='h-6 w-6 text-center'>{item.cartQty}</div>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                </div>
                <div onClick={() => onChangeCart('+', index)}>+</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export default Grid;
