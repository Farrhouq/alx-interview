async function printExactHeightReceipt() {
    const ESC = '\x1B';
    const newLine = '\x0A';
    const cutPaper = ESC + 'm'; // Cut command
    const feedLines = ESC + 'd' + '\x04'; // Feed 4 lines before cutting

    const receiptContent = [
        "Brand Name",
        "Dealers in Mobile Phones, Accessories...",
        "Location: Dakpema Roundabout, Tamale-Accra Road",
        "Tel: 0244 885 589 | 0209 252 462",
        "--------------------------------",
        "Cashier: UNIVERSAL MAN",
        "Customer: John Doe",
        "Product       Qty     Price    Total",
        "--------------------------------",
        "Item1         2       ₵5.00    ₵10.00",
        "Item2         1       ₵3.50    ₵3.50",
        "--------------------------------",
        "Total: GH₵ 13.50",
        "Amount Paid: GH₵ 15.00",
        "Change: GH₵ 1.50",
        "--------------------------------",
        "Thank you for your patronage!",
        "\n\n" // Extra space to control final height
    ].join(newLine);

    // Connect to the printer using WebUSB
    try {
        const device = await navigator.usb.requestDevice({
            filters: [{ vendorId: 0x04b8 }] // Epson's vendor ID
        });
        await device.open();
        await device.selectConfiguration(1);
        await device.claimInterface(0);

        // Encode the receipt content with ESC/POS commands
        const encoder = new TextEncoder();
        const data = encoder.encode(ESC + '@' + receiptContent + feedLines + cutPaper); // '@' initializes/reset printer

        // Send data to the printer
        await device.transferOut(2, data);
        console.log("Receipt printed successfully!");

        await device.close();
    } catch (error) {
        console.error("Failed to connect to the printer:", error);
    }
}

// Run the function to print the receipt with precise length
printExactHeightReceipt();
