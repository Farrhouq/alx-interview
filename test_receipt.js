async function printReceipt() {
    const customerName = "John Doe";
    const amountPaid = 50.00;
    const savedSale = [
        { product: "Product 1", quantity: 2 },
        { product: "Product 2", quantity: 1 },
        { product: "Product 3", quantity: 3 }
    ];
    const products = [
        { name: "Product 1", selling_price: 10.00 },
        { name: "Product 2", selling_price: 15.00 },
        { name: "Product 3", selling_price: 5.00 }
    ];

    // Prepare ESC/POS commands
    const ESC = '\x1B';
    const newLine = '\x0A';
    const cutPaper = ESC + 'm'; // Command to cut paper
    const feedLines = ESC + 'd' + '\x04'; // Feed 4 lines before cutting

    // Construct the receipt content
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
            const product = products.find(p => p.name === item.product);
            const price = product ? product.selling_price : 0;
            const total = price * item.quantity;
            return `${item.product}         ${item.quantity}       ₵${price.toFixed(2)}    ₵${total.toFixed(2)}`;
        }),
        "--------------------------------",
        `Total: GH₵ ${savedSale.reduce((acc, item) => {
            const product = products.find(p => p.name === item.product);
            const price = product ? product.selling_price : 0;
            return acc + price * item.quantity;
        }, 0).toFixed(2)}`,
        `Amount Paid: GH₵ ${amountPaid.toFixed(2)}`,
        `Change: GH₵ ${(amountPaid - savedSale.reduce((acc, item) => {
            const product = products.find(p => p.name === item.product);
            const price = product ? product.selling_price : 0;
            return acc + price * item.quantity;
        }, 0)).toFixed(2)}`,
        "--------------------------------",
        "Thank you for your patronage!",
        "\n\n" // Extra space for a clear finish
    ].join(newLine);

    try {
        // Request permission and connect to the USB printer device
        const device = await navigator.usb.requestDevice({
            filters: [{ vendorId: 0x04b8 }] // Use Epson's vendor ID
        });

        await device.open();
        
        // Select the configuration and claim the interface
        if (device.configuration === null) {
            await device.selectConfiguration(1);
        }
        await device.claimInterface(0);

        // Encode the receipt data
        const encoder = new TextEncoder();
        const data = encoder.encode(ESC + '@' + receiptContent + feedLines + cutPaper);

        // Send the data to the printer
        await device.transferOut(2, data);

        console.log("Receipt printed successfully!");
        await device.close();
    } catch (error) {
        console.error("Failed to connect to the printer:", error);
    }
}

// Execute the function to test printing
printReceipt();
