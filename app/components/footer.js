import { FaPhone,FaEnvelope  } from "react-icons/fa";

import Link from "next/link";
export default function Footer() {
  return (
<>
<div className=" bg-[rgb(18,150,88)] px-4 py-[30px] w-full mb-0 relative bottom-0">
<div className="  flex flex-wrap  md:justify-around text-white text-[20px] pt-[70px] gap-5 px-5">
  <div className="max-w-[400px]  text-[17px] px-5 text-[rgb(223,209,209)]">
  <div className="flex justify-start items-center gap-2  ">
<img src="/images/logo.png" className="w-[50px] h-[50px] rounded-[20px]"/>
        <h3 className="text-2xl text-white  font-bold">Buy Sahi</h3>


        </div >
<p>Pakistan's premier destination for quality household essentials. From kitchen to bedroom, we bring comfort to your home with Cash on Delivery across Pakistan.</p>

  </div>

  <div>
    <ul className=" text-[17px] text-[rgb(223,209,209)]  px-4">
      <p   className="text-[24px] text-white    ">Quick Links</p>
      <li> <Link href="#">Home</Link> </li>
      <li> <Link href="#">Collection</Link> </li>
      <li> <Link href="#">Shopping Cart</Link> </li>

    </ul>
  </div>

<div className="max-w-[400px] text-[rgb(223,209,209)] w-full px-4 text-[17px]">
    <p className="text-[24px] text-white "> Contact US</p>
    <div className="flex items-center gap-2"> <FaPhone/>  <p className="break-all ">+92 316 6492005 </p></div>
  <div className="flex items-center gap-2">
    <FaEnvelope/>
    <p className="break-all"> buysahi5211@gmail.com</p>

  </div>
    <div className="flex flex-wrap gap-3">
      <p>Rawalpidi</p>
      <p>Lahore</p>
      <p>Karachi</p>
      <p>Multan</p>
      <p>Pakistan</p>

    </div>
  </div>

</div>
<hr className="h-[2px]"></hr>
<div className=" w-full flex flex-col justify-center items-center  py-[20px] text-white">
  <p>© 2026 Buy Sahi. All rights reserved.</p>
  <p>Buy Sahi Made with love in Pakistan</p>
</div>

</div>
</>
    );
}



