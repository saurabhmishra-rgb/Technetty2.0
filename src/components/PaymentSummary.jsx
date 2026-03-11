import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './PaymentSummary.css';

// Helper function to load Razorpay script dynamically
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentSummary = ({ formData, onNext, onBack }) => {
  const PLAN_PRICES = { basic: 1499, pro: 2999, advance: 4999 };

  // Safety checks
  const safePlan = typeof formData?.plan === 'string' ? formData.plan : 'basic';
  const safeAddOns = Array.isArray(formData?.addOns) ? formData.addOns : [];

  // Calculations (Used for UI display only. Backend calculates the real price)
  const basePrice = PLAN_PRICES[safePlan] || 1499;
  const addOnsTotal = safeAddOns.reduce((total, addon) => total + (addon.price || 0), 0);
  const totalAmount = basePrice + addOnsTotal;
  const advancePayment = totalAmount / 2; // 50% advance

  const displayPlanName = safePlan.charAt(0).toUpperCase() + safePlan.slice(1) + " Reel";

  // Refs for Animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const summaryRef = useRef(null);
  const totalRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(summaryRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(totalRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")
        .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- REAL RAZORPAY INTEGRATION ---
  const handleCheckout = async () => {
    // 1. Load the Razorpay SDK
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    try {
      // 2. Fetch secure Order ID from Node.js Backend
      // Make sure your Node.js server is running on port 5000!
      const orderResponse = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: safePlan,
          addOns: safeAddOns
        })
      });

      const orderData = await orderResponse.json();

      if (!orderData || !orderData.id) {
        alert('Failed to initialize payment. Please try again.');
        return;
      }

      // 3. Setup Razorpay Options
      const options = {
        key: "rzp_test_YOUR_TEST_KEY_HERE", // ⚠️ Replace with your actual Test Key!
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Brand Name",
        description: "50% Advance for Video Editing",
        order_id: orderData.id, // The secure ID from your backend
        handler: async function (response) {
          
          // 4. VERIFY payment on the backend to ensure it wasn't hacked
          try {
            const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyResult = await verifyResponse.json();

            if (verifyResult.success) {
              console.log("Payment Verified Successfully!");
              
              // Add the payment details to your form data
              const finalData = {
                ...formData,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              };

              // Move to Step 10 (Success Screen)
              onNext(finalData);
            } else {
              alert("Payment verification failed! " + verifyResult.message);
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("Error verifying payment. Please contact support.");
          }
        },
        prefill: {
          name: formData?.contact?.name || "",
          email: formData?.contact?.email || "",
          contact: formData?.contact?.whatsapp || ""
        },
        theme: {
          color: "#28a745" // Green UI button
        }
      };

      // 5. Open the Razorpay Window
      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response) {
        alert(`Payment failed! Reason: ${response.error.description}`);
      });

      paymentObject.open();

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong connecting to the backend server.");
    }
  };

  return (
    <div className="pay-wrapper">
      <div className="pay-container" ref={containerRef}>
        
        <h2 className="pay-heading" ref={titleRef}>
          Step 9: Payment Summary
          <span className="pay-subheading">Review your order and checkout</span>
        </h2>

        {/* Order Breakdown Box */}
        <div className="pay-summary-box" ref={summaryRef}>
          <h3 className="pay-summary-title">Order Details</h3>
          
          <div className="pay-line-item">
            <span className="pay-item-name">{displayPlanName}</span>
            <span className="pay-item-price">₹{basePrice.toLocaleString()}</span>
          </div>

          {safeAddOns.length > 0 && (
            <div className="pay-addons-section">
              <p className="pay-addons-title">Add-ons:</p>
              {safeAddOns.map((addon, index) => (
                <div key={addon.id || index} className="pay-line-item pay-addon-item">
                  <span className="pay-item-name">+ {addon.label}</span>
                  <span className="pay-item-price">₹{addon.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          <hr className="pay-divider" />

          <div className="pay-line-item pay-total-line">
            <span className="pay-total-label">Total Amount</span>
            <span className="pay-total-price">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* 50% Advance Highlight */}
        <div className="pay-advance-box" ref={totalRef}>
          <div className="pay-advance-text">
            <strong>Amount to pay now (50%)</strong>
            <span>Remaining 50% payable after preview approval.</span>
          </div>
          <div className="pay-advance-amount">
            ₹{advancePayment.toLocaleString()}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pay-btn-container" ref={btnRef}>
          <button className="back-btn" onClick={onBack}>
            &larr; Back
          </button>

          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
          >
            Pay ₹{advancePayment.toLocaleString()} Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentSummary;