import React from 'react';

const ReceiptPage = () => {
  const receiptData = {
    buyer: 'siddesh Sonvane',
    propertyName: '3 BHK Apartment in Mumbai',
    location: 'Mumbai, Maharashtra',
    price: '₹1.2 Crore',
    date: '2025-07-17',
    receiptNumber: 'REC-20250717-001',
  };

  const handleDownload = () => {
    alert('Download functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#0B1F3A] mb-4">Payment Receipt</h2>
        <div className="text-sm text-right text-gray-500">Receipt No: {receiptData.receiptNumber}</div>

        <div className="mt-6 space-y-4 text-base text-[#1C2C46]">
          <div className="flex justify-between">
            <span className="font-medium">Buyer:</span>
            <span>{receiptData.buyer}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Property:</span>
            <span>{receiptData.propertyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{receiptData.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span className="font-semibold text-[#702FB1]">{receiptData.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date of Purchase:</span>
            <span>{receiptData.date}</span>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-right">
          <span className="text-sm text-gray-600">Thank you for your purchase!</span>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleDownload}
            className="bg-[#702FB1] hover:bg-[#5e2993] text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
