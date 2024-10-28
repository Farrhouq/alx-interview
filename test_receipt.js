async function connectToPrinter() {
    try {
        // List all available USB devices
        const devices = await navigator.serial.getPorts();

        // Request to connect to the first available device
        const port = devices[0]; // Make sure there's at least one device

        await port.open({ baudRate: 9600 });

        // Construct ESC/POS commands
        const ESC = '\x1B';
        const receiptContent = "Hello, this is a test print!" + ESC + "m"; // Simple command

        const encoder = new TextEncoder();
        const data = encoder.encode(receiptContent);

        // Write to the printer
        const writer = port.writable.getWriter();
        await writer.write(data);
        writer.releaseLock();

        console.log("Data sent to the printer successfully!");
        await port.close();
    } catch (error) {
        console.error("Failed to connect to the printer:", error);
    }
}

// Call the function to test the connection
connectToPrinter();
