import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import router from 'next/router';
import Cookies from 'universal-cookie';
import BisnisAPI from '../models/business';
import otpAPI from '../models/otp';
import userAPI from '../models/user';

const cookies = new Cookies();

const Header = ({ totalQty }) => {
  const [logo, setLogo] = useState('');
  const [user, setUser] = useState();
  const [search, setSearch] = useState();
  const [address, setAddress] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [otpCode, setOTPCode] = useState([]);

  useEffect(() => {
    BisnisAPI.getInfo()
      .then(res => setLogo(res?.data?.logo?.image_url))
      .catch(err => console.log('err Bisnis API', err));
    userAPI.getInfo()
      .then(res => setUser(res.data))
      .catch(err => console.log('err userAPI', err));
  }, []);

  const onChangeEmail = (e) => {
    setAddress(e.currentTarget.value);
  };

  const onChangeOTP = (e, index) => {
    const inputOTP = [...otpCode];
    inputOTP[index] = e.currentTarget.value;
    setOTPCode(inputOTP);
  };

  const handleRequestOTP = () => {
    setShowOTPModal(true);
    setLoadingOTP(true);
    const data = {
      address,
      method: "email"
    };
    otpAPI.reqOTP(data).then(res => {
      const otpLength = [];
      for (let i = 0; i < res?.data.length; i += 1) otpLength.push(i);
      setOTPCode(otpLength);
      setLoadingOTP(false);
      setAddress(res?.data?.address || address);
    })
      .catch(err => console.log('err reqOTP', err));
  };

  const handleSentOTP = () => {
    const data = {
      username: address,
      otp_code: otpCode.join("")
    };
    otpAPI.sentOTP(data)
      .then(res => {
        cookies.set('token', res?.data?.token, { path: '/' });
        showOTPModal(false);
        showLoginModal(false);
      })
      .catch(err => console.log('err sentOTP', err));
  };

  const loginComponent = () => (
    <>
      <style jsx>
        {`
        .login-modal{
          background: white;
          z-index: 9999;
          top: 0;
        }
      `}
      </style>
      <div className='fixed flex items-center justify-center w-full h-full login-modal text-base'>
        <div>
          <div>address</div>

          <input onChange={(e) => onChangeEmail(e)} placeholder='Masukkan address Anda' />
          <div className='bg-blue-500 text-white text-center' onClick={() => handleRequestOTP()}>Request OTP</div>
        </div>
      </div>
    </>
  );

  const OTPComponent = () => (
    <>
      <style jsx>
        {`
        .login-modal{
          background: white;
          z-index: 99999;
          top: 0;
        }
      `}
      </style>
      <div className='fixed flex items-center justify-center w-full h-full login-modal text-base'>
        {loadingOTP ? <div>Menunggu Response Request OTP</div> : (
          <div>
            <div>OTP</div>
            {otpCode.map((_, index) => (
              <input key={index} onChange={(e) => onChangeOTP(e, index)} placeholder='Masukkan address Anda' />
            ))}
            <div className='bg-blue-500 text-white text-center' onClick={() => handleSentOTP()}>Sent OTP</div>
          </div>
        )}
      </div>
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`${window.location.origin}?search=${search}`);
  };

  const onChangeSearch = (e) => {
    setSearch(e.currentTarget.value);
  };
  return (
    <>
      <div className='flex items-center p-2 bg-gray-900'>
        {logo && (
          <Image
            alt="Logo"
            src={logo}
            width={64}
            height={30}
          />
        )}
        <div className='flex-grow mx-1'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => onChangeSearch(e)} className='w-full rounded-full p-2 focus:outline-none' placeholder='search' />
          </form>

        </div>
        <div className='p-1 text-pink-50'>
          <div className='text-white absolute h-5 w-5 rounded-full bg-red-600 text-center'>{totalQty}</div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div className='p-1 text-pink-50' onClick={() => setShowLoginModal(!showLoginModal)}>
          {user?.uid ? (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>)}

        </div>
      </div>
      {showLoginModal && loginComponent()}
      {showOTPModal && OTPComponent()}
    </>
  );
};



export default Header;
