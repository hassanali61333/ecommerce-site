
import { FaSync,FaClock,FaBus,FaShieldAlt ,FaMoneyBillWave, FaUndo  } from "react-icons/fa";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
function Returnpolicy() {
  return ( 
    <>

<Navbar/>
    <section className="bg-[rgb(245,243,245)]  px-[30px] sm:px-[70px] py-[30px] flex flex-col items-center">
         {/* icon and heading */}
<div className="flex justify-center flex-col items-center gap-[20px] py-[90px]">
<div style={{fontSize:"40px"}}>
  <FaSync   />
</div>

<div className="flex flex-col justify-center items-center">

  <p className="text-[35px] flex justify-center text-center font-bold">7-Day Easy Return Policy</p>
  <p className="text-center">Shop with confidence! We offer hassle-free returns within 7 days of delivery.</p>
</div>

</div>

{/* three icons */}

<div className="grid grid-cols-1  md:grid-cols-3 gap-6 py-6 place-items-center">
   {/* box1 */}
 <div className="rounded-[20px]  p-2 bg-white text-black flex justify-center flex-col items-center px-6 text-center gap-[10px] w-full  ">
<FaClock  className="text-[40px] rounded-[20px] " />
<p> 7 Days Window</p>
<p>Return your order within 7 days of delivery for a full refund or exchange.</p>
</div>

{/* box2 */}
  <div className=" rounded-[20px]  p-2 bg-white text-black flex justify-center flex-col items-center px-6 text-center gap-[10px] w-full ">
<FaBus  className="text-[40px] rounded-[20px]" />
<p> Free Shipping</p>
<p>Free shipping on all orders across Pakistan. No hidden charges!</p>
</div>


{/* box3 */}
  <div className=" rounded-[20px]  p-2 bg-white text-black flex justify-center flex-col items-center px-6 text-center gap-[10px]  w-full ">
<FaShieldAlt className="text-[40px] rounded-[20px]"  />
<p> Quality Guarantee</p>
<p>All products are quality checked before shipping to ensure your satisfaction.</p>
</div>

</div>

{/* Return Policy Details */}


<div className=" px-[30px] bg-white  gap-[20px] flex flex-col py-[40px] rounded-[15px] w-full ">

  <h3 className="text-[25px] font-bold">Return Policy Details</h3>
  <div>
  <h5 className="flex items-center text-[23px]  gap-3"> <div className="text-[rgb(0,153,94)] border-1 p-1 text-[14px] rounded-[7px]">  <FaClock/></div>  Eligible for Return</h5>
  <ul className="pl-[50px] list-disc flex flex-col gap-2">
    <li>Product received in damaged condition</li>
    <li>Wrong product delivered</li>
    <li>Product not as described</li>
    <li>Missing items in order</li>
    <li>Manufacturing defects</li>
  </ul>
  </div>


  <div>
  <h5 className="flex items-center text-[23px] gap-3 "> <div className="text-[rgb(0,153,94)]  text-[14px] border-1 p-1 rounded-[7px]"> <FaMoneyBillWave/></div>  Return Conditions</h5>

  <ul className="pl-[50px] list-disc  flex flex-col gap-2">
    <li>Product must be unused and in original packaging</li>
    <li>All tags and labels must be intact</li>
    <li>Original receipt or order confirmation required</li>
    <li>Return request must be initiated within 7 days of delivery</li>

  </ul>

  </div>

  <div>
  <h5 className="flex items-center text-[23px] gap-3 "> <div className="text-[rgb(0,153,94)] text-[14px] border-1 p-1 rounded-[7px]">  <FaUndo/> </div>How to Return</h5>
  <ul className="pl-[50px] list-disc flex flex-col gap-2">
    <li>Contact us via WhatsApp or email with your order number</li>
    <li>Explain the reason for return with photos if applicable</li>
    <li>Wait for our team to approve the return request</li>
    <li>Ship the product back or arrange for pickup</li>
    <li>Receive your refund or exchange within 3-5 business days</li>

  </ul>

  </div>
  
</div>

{/* Non-Returnable section */}
<div className="bg-[rgb(228,220,220)] rounded-[15px] mt-4 py-6 px-4 w-full">
  <h3 className="text-[30px]">Non-Returnable Items </h3>
  <p>The following items cannot be returned for hygiene and safety reasons</p>

<ul className="pl-[50px] list-disc flex flex-col gap-2">

  <li>Underwear and intimate apparel</li>
  <li>Personal care and beauty products (opened)</li>
  <li>Customized or personalized items</li>
  <li>Products damaged due to customer misuse</li>
  <li>Items marked as "Final Sale" or "Non-Returnable"</li>

</ul>
</div>

<div className="flex justify-center flex-col items-center gap-5 my-[40px]">
<p>Have questions about our return policy? We're here to help!</p>
<button className="bg-[rgb(50,206,58)] max-w-[220px] px-4 py-3 rounded-[10px] hover:bg-[rgb(103,192,75)]  hover:cursor-pointer" >Contact Us on WhatsApp</button>
</div>
 </section>
 

<Footer/>
    
    </>
   );
}

export default Returnpolicy