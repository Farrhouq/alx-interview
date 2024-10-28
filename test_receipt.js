import React, { useState } from 'react';

const ReceiptPrinter = ({ customerName, amountPaid, savedSale, products }) => {
  const printExactHeightReceipt = async () => {
    const ESC = '\x1B';
    const newLine = '\x0A';
    const cutPaper = ESC + 'm'; // Cut command
    const feedLines = ESC + 'd' + '\x04'; // Feed 4 lines before cutting

    // Constructing receipt content with product details and totals
    const receiptContent = [
      "Brand Name",
      "Dealers in Mobile Phones, Accessories...",
      "Location: Dakpema Roundabout, Tamale-Accra Road",
      "Tel: 0244 885 589 | 0209 252 462",
      "--------------------------------",
      `Cashier: UNIVERSAL MAN`,
      `Customer: ${customerName}`,
      "Product       Qty     Price    Total",
      "--------------------------------",
      ...savedSale.map((item) => {
        const product = products.find((p) => p.name === item.product);
        const price = product ? product.selling_price : 0;
        const total = price * item.quantity;
        return `${item.product}         ${item.quantity}       ₵${price.toFixed(2)}    ₵${total.toFixed(2)}`;
      }),
      "--------------------------------",
      `Total: GH₵ ${savedSale.reduce((acc, item) => {
        const product = products.find((p) => p.name === item.product);
        const price = product ? product.selling_price : 0;
        return acc + price * item.quantity;
      }, 0).toFixed(2)}`,
      `Amount Paid: GH₵ ${Number(amountPaid).toFixed(2)}`,
      `Change: GH₵ ${(amountPaid - savedSale.reduce((acc, item) => {
        const product = products.find((p) => p.name === item.product);
        const price = product ? product.selling_price : 0;
        return acc + price * item.quantity;
      }, 0)).toFixed(2)}`,
      "--------------------------------",
      "Thank you for your patronage!",
      "\n\n" // Extra space to control final height
    ].join(newLine);

    try {
      // Request permission and connect to the USB printer device
      const device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x04b8 }] // Epson's vendor ID
      });

      await device.open();

      // Check and select configuration, then claim interface
      if (device.configuration === null) {
        await device.selectConfiguration(1);
      }
      await device.claimInterface(0);

      // Encode the ESC/POS commands
      const encoder = new TextEncoder();
      const data = encoder.encode(ESC + '@' + receiptContent + feedLines + cutPaper);
      
      // Send the ESC/POS data to the printer
      await device.transferOut(2, data);

      console.log("Receipt printed successfully!");
      await device.close();
    } catch (error) {
      console.error("Failed to connect to the printer:", error);
    }
  };

  return (
    <div>
      <h2>Print Receipt</h2>
      <button onClick={printExactHeightReceipt}>Print Receipt</button>
    </div>
  );
};

export default ReceiptPrinter;
