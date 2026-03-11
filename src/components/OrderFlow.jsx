import React, { useState } from 'react';
// Import your components as you build them
import ReelSelection from './Choose_Plan'; 
import ContentAvailability from './ContentAvailability';
import UploadContent from './UploadContent'; 
import BrandStyle from './BrandStyle';
import MessageInput from './MessageInput'; 
import ReferenceReel from './ReferenceReel'; 
import AddOns from './AddOns';
import ContactDetails from './ContactDetails';
import PaymentSummary from './PaymentSummary';

const OrderFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // The ultimate source of truth for the user's order
  const [formData, setFormData] = useState({
    plan: 'basic',      // From Step 1
    contentType: '',    // From Step 2
    files: [],          // From Step 3
    brandStyle: null,   // From Step 4
    message: '',        // From Step 5
    referenceLink: '',  // From Step 6
    addOns: [],         // From Step 7
    contact: {          // From Step 8
      name: '',
      email: '',
      whatsapp: ''
    }
  });

  // --- NAVIGATION HANDLERS ---

  const goNext = (stepData, stepName) => {
    // Dynamically update form data based on the step we are completing
    setFormData(prev => ({ ...prev, [stepName]: stepData }));
    setCurrentStep(prev => prev + 1);
  };

  const goBack = () => {
    // Smart logic: If we are on Step 4 and skipped Step 3 (stock footage), go back to Step 2
    if (currentStep === 4 && formData.contentType === 'stock') {
      setCurrentStep(2);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Step 2 needs special branching logic
  const handleContentSelect = (selectedType) => {
    setFormData(prev => ({ ...prev, contentType: selectedType }));
    if (selectedType === 'stock') {
      setCurrentStep(4); // Skip upload
    } else {
      setCurrentStep(3); // Go to upload
    }
  };

  return (
    <div className="order-flow-wrapper">
      
      {currentStep === 1 && (
        <ReelSelection onNext={(data) => goNext(data, 'plan')} />
      )}

      {currentStep === 2 && (
        <ContentAvailability onNext={handleContentSelect} onBack={goBack} />
      )}

      {currentStep === 3 && (
        <UploadContent onNext={(data) => goNext(data, 'files')} onBack={goBack} />
      )}

      {currentStep === 4 && (
        <BrandStyle onNext={(data) => goNext(data, 'brandStyle')} onBack={goBack} />
      )}

      {currentStep === 5 && (
        <MessageInput 
          planType={formData.plan} 
          onNext={(data) => goNext(data, 'message')} 
          onBack={goBack} 
        />
      )}

      {/* Step 6 is now perfectly active without extra braces! */}
      {currentStep === 6 && (
        <ReferenceReel onNext={(data) => goNext(data, 'referenceLink')} onBack={goBack} />
      )}

    
      {currentStep === 7 && <AddOns onNext={(data) => goNext(data, 'addOns')} onBack={goBack} />}
        {currentStep === 8 && <ContactDetails onNext={(data) => goNext(data, 'contact')} onBack={goBack} />}
        {currentStep === 9 && <PaymentSummary formData={formData} onBack={goBack} />}
     

    </div>
  );
};

export default OrderFlow;