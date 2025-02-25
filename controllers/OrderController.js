// // controllers/OrderController.js
// import { getOrdersFromSheet, appendDataToSheet, updateDataFromSheet } from '../utils/googleSheets.js'; // Import updateDataFromSheet
// import { v4 as uuidv4 } from 'uuid';

// export const getUserOrders = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
//     }

//     const userId = String(req.user._id).trim();
//     console.log('Looking for orders for user:', userId);

//     console.log('Fetching orders from Google Sheets...');
//     const allOrders = await getOrdersFromSheet();

//     const userOrders = allOrders.filter(order => {
//       const orderUserId = String(order.userId).trim();
//       return orderUserId === userId;
//     });

//     if (!userOrders.length) {
//       return res.status(200).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };


// export const saveOrderToSheet = async (req, res) => {
//   const { service, speed, link, quantity } = req.body;

//   try {
//     if (!service || !speed || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//     }

//     const orderId = uuidv4();
//     const status = 'Pending';
//     const started = 'Not Started';

//     await appendDataToSheet({
//       orderId,
//       userId: String(req.user._id).trim(),
//       service,
//       speed,
//       link,
//       quantity: parsedQuantity,
//       started,
//       status,
//     });

//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving order:', err.message);
//     res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//   }
// };

// export const cancelOrder = async (req, res) => {
//     const { orderId } = req.params;
//     try {
//         if (!orderId) {
//             return res.status(400).json({ message: "Order ID is required." });
//         }

//         const updated = await updateDataFromSheet(orderId, 'Canceled');

//         if (updated) {
//             return res.status(200).json({ message: "Order canceled successfully." });
//         }
//         return res.status(404).json({ message: "Order not found." });

//     } catch (error) {
//         console.error("Error cancelling order:", error.message);
//         res.status(500).json({ message: "Failed to cancel order. Please try again later." });
//     }
// };







// import { getOrdersFromSheet, appendDataToSheet, updateDataFromSheet } from '../utils/googleSheets.js'; // Import updateDataFromSheet
// import { v4 as uuidv4 } from 'uuid';

// export const getUserOrders = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
//     }

//     const userId = String(req.user._id).trim();
//     console.log('Looking for orders for user:', userId);

//     console.log('Fetching orders from Google Sheets...');
//     const allOrders = await getOrdersFromSheet();

//     const userOrders = allOrders.filter(order => {
//       const orderUserId = String(order.userId).trim();
//       return orderUserId === userId;
//     });

//     if (!userOrders.length) {
//       return res.status(200).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };


// export const saveOrderToSheet = async (req, res) => {
//   const { category, service, link, quantity, comments, calculatedPrice } = req.body; // Include comments

//   try {
//     if (!category || !service || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//     }

//     const orderId = uuidv4();
//     const status = 'Pending';
//     const started = 'Not Started';

//     await appendDataToSheet({
//       orderId,
//       userId: String(req.user._id).trim(),
//       category,
//       service,
//       link,
//       quantity: parsedQuantity,
//       comments, // Save the comments
//       started,
//       status,
//     });

//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving order:', err.message);
//     res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//   }
// };

// export const cancelOrder = async (req, res) => {
//     const { orderId } = req.params;
//     try {
//         if (!orderId) {
//             return res.status(400).json({ message: "Order ID is required." });
//         }

//         const updated = await updateDataFromSheet(orderId, 'Canceled');

//         if (updated) {
//             return res.status(200).json({ message: "Order canceled successfully." });
//         }
//         return res.status(404).json({ message: "Order not found." });

//     } catch (error) {
//         console.error("Error cancelling order:", error.message);
//         res.status(500).json({ message: "Failed to cancel order. Please try again later." });
//     }
// };



// import Order from '../models/Order.js';
// import { v4 as uuidv4 } from 'uuid';

// export const getUserOrders = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
//     }

//     const userId = String(req.user._id).trim();
//     console.log('Looking for orders for user:', userId);

//     const userOrders = await Order.find({ userId }); // Find orders by userId

//     if (!userOrders.length) {
//       return res.status(200).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };

// export const saveOrder = async (req, res) => {  // Change function name for clarity
//   const { category, service, link, quantity, comments, calculatedPrice } = req.body; // Include comments

//   try {
//     if (!category || !service || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//     }

//     const orderId = uuidv4();
//     const status = 'Pending';
//     const started = 'Not Started';

//     const newOrder = new Order({  // Create a new Order document
//       orderId,
//       userId: String(req.user._id).trim(),
//       category,
//       service,
//       link,
//       quantity: parsedQuantity,
//       comments,
//       started,
//       status,
//     });

//     await newOrder.save(); // Save the new order to MongoDB

//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving order:', err.message);
//     res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//   }
// };

// export const cancelOrder = async (req, res) => {
//   const { orderId } = req.params;
//   try {
//     if (!orderId) {
//       return res.status(400).json({ message: "Order ID is required." });
//     }

//     const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }
//         order.status = 'Canceled';
//         await order.save();

//         return res.status(200).json({ message: "Order canceled successfully." });
//   } catch (error) {
//     console.error("Error cancelling order:", error.message);
//     res.status(500).json({ message: "Failed to cancel order. Please try again later." });
//   }
// };







// import Order from '../models/Order.js';
// import { v4 as uuidv4 } from 'uuid';

// export const getUserOrders = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
//     }

//     const userId = String(req.user._id).trim();
//     console.log('Looking for orders for user:', userId);

//     const userOrders = await Order.find({ userId }); // Find orders by userId

//     if (!userOrders.length) {
//       return res.status(200).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };

// export const saveOrder = async (req, res) => {  // Change function name for clarity
//   const { category, service, link, quantity, comments, calculatedPrice } = req.body; // Include comments and calculatedPrice

//   try {
//     if (!category || !service || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//     }

//     const orderId = uuidv4();
//     const status = 'Pending';
//     const started = 'Not Started';

//     const newOrder = new Order({  // Create a new Order document
//       orderId,
//       userId: String(req.user._id).trim(),
//       category,
//       service,
//       link,
//       quantity: parsedQuantity,
//       comments,
//       started,
//       status,
//       calculatedPrice // Include calculatedPrice here
//     });

//     await newOrder.save(); // Save the new order to MongoDB

//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving order:', err.message);
//     res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//   }
// };

// export const cancelOrder = async (req, res) => {
//   const { orderId } = req.params;
//   try {
//     if (!orderId) {
//       return res.status(400).json({ message: "Order ID is required." });
//     }

//     const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }
//         order.status = 'Canceled';
//         await order.save();

//         return res.status(200).json({ message: "Order canceled successfully." });
//   } catch (error) {
//     console.error("Error cancelling order:", error.message);
//     res.status(500).json({ message: "Failed to cancel order. Please try again later." });
//   }
// };












// import Order from '../models/Order.js';
// import { v4 as uuidv4 } from 'uuid';

// export const getUserOrders = async (req, res) => {
//     try {
//         if (!req.user || !req.user._id) {
//             return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
//         }

//         const userId = String(req.user._id).trim();
//         console.log('Looking for orders for user:', userId);

//         const userOrders = await Order.find({ userId }); // Find orders by userId

//         if (!userOrders.length) {
//             return res.status(200).json({ message: 'No orders found for this user.' });
//         }

//         res.status(200).json(userOrders);
//     } catch (err) {
//         console.error('Error fetching user orders:', err.message);
//         res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//     }
// };

// export const saveOrder = async (req, res) => {
//     const { category, service, link, quantity, comments, calculatedPrice } = req.body;

//     try {
//         if (!category || !service || !link || !quantity) {
//             return res.status(400).json({ message: 'All fields are required.' });
//         }

//         const parsedQuantity = parseInt(quantity, 10);
//         if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//             return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//         }

//         const orderId = uuidv4();
//         const status = 'Pending';
//         const started = 'Not Started';

//         const newOrder = new Order({
//             orderId,
//             userId: String(req.user._id).trim(),
//             category,
//             service,
//             link,
//             quantity: parsedQuantity,
//             comments,
//             started,
//             status,
//             calculatedPrice
//         });

//         await newOrder.save();

//         res.status(200).json({ message: 'Order submitted successfully!' });
//     } catch (err) {
//         console.error('Error while saving order:', err.message);
//         res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//     }
// };

// export const cancelOrder = async (req, res) => {
//     const { orderId } = req.params;

//     try {
//         if (!orderId) {
//             return res.status(400).json({ message: "Order ID is required." });
//         }

//         const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         if (order.status === 'Canceled') {
//             return res.status(400).json({ message: "Order is already canceled." });  // Prevent double cancellation
//         }

//         order.status = 'Canceled';
//         await order.save();

//         return res.status(200).json({ message: "Order canceled successfully." });

//     } catch (error) {
//         console.error("Error cancelling order:", error.message);
//         res.status(500).json({ message: "Failed to cancel order. Please try again later." });
//     }
// };



// backend/controllers/OrderController.js
import Order from '../models/Order.js';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Ensure .env variables are loaded

// Create Nodemailer transporter (moved to top level for re-use)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {  // Add this to bypass certificate issues in some environments
        rejectUnauthorized: false,
    }
});

// Helper function to format order details for emails
const formatOrderDetails = (order) => {
    const truncatedOrderId = order.orderId.slice(-4);
    const truncatedUserId = order.userId.slice(-4);

    return `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 5px;">Order Details:</h2>
        <p><strong>Order ID:</strong> ...${truncatedOrderId}</p>
        <p><strong>Category:</strong> ${order.category}</p>
        <p><strong>Service:</strong> ${order.service}</p>
        <p><strong>Link:</strong> ${order.link}</p>
        <p><strong>Quantity:</strong> ${order.quantity}</p>
        <p><strong>Comments:</strong> ${order.comments || 'N/A'}</p>
        <p><strong>Calculated Price:</strong> $${order.calculatedPrice.toFixed(2)}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Started:</strong> ${order.started}</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
    </div>
    `;
};

export const saveOrder = async (req, res) => {
    const { category, service, link, quantity, comments, calculatedPrice } = req.body;

    try {
        if (!category || !service || !link || !quantity) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
            return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
        }

        const orderId = uuidv4();
        const status = 'Pending';
        const started = 'Not Started';

        const newOrder = new Order({
            orderId,
            userId: String(req.user._id).trim(),
            category,
            service,
            link,
            quantity: parsedQuantity,
            comments,
            started,
            status,
            calculatedPrice
        });

        await newOrder.save();

        // Send email to user
        try {
            const user = req.user;
            const userMailOptions = {
                to: user.email,
                from: process.env.EMAIL_USER,
                subject: '🎉 New Order Confirmation - BuyUpvotes',
                html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #007bff; text-align: center;">Thank You for Your Order!</h1>
                    <p style="font-size: 16px;">Dear ${user.firstName} ${user.lastName},</p>
                    <p style="font-size: 16px;">We've received your order and it's being processed. Here are the details:</p>
                    ${formatOrderDetails(newOrder)}
                    <p style="font-size: 16px; margin-top: 20px;">
                        If you have any questions, please don't hesitate to contact our support team.
                    </p>
                    <p style="font-size: 14px; color: #777; text-align: center;">
                        Thank you for choosing BuyUpvotes!
                    </p>
                </div>
              `,
            };

            await transporter.sendMail(userMailOptions);
            console.log('User confirmation email sent.');
        } catch (error) {
            console.error('Error sending user confirmation email:', error);
        }

        // Send email to admin
        try {
            const truncatedUserId = String(req.user._id).trim().slice(-4);
            const adminMailOptions = {
                to: process.env.ADMIN_EMAIL,
                from: process.env.EMAIL_USER,
                subject: '🚨 New Order Received - BuyUpvotes',
                html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #dc3545; text-align: center;">New Order Alert!</h1>
                    <p style="font-size: 16px;">A new order has been placed by user ID: ...${truncatedUserId}</p>
                    ${formatOrderDetails(newOrder)}
                    <p style="font-size: 16px; margin-top: 20px;">
                        Please review the order and take necessary actions.
                    </p>
                    <p style="font-size: 14px; color: #777; text-align: center;">
                        BuyUpvotes Admin Notification
                    </p>
                </div>
              `,
            };

            await transporter.sendMail(adminMailOptions);
            console.log('Admin notification email sent.');

        } catch (error) {
            console.error('Error sending admin notification email:', error);
        }

        res.status(200).json({ message: 'Order submitted successfully!' });
    } catch (err) {
        console.error('Error while saving order:', err.message);
        res.status(500).json({ message: 'Failed to save order. Please try again later.' });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
        }

        const userId = String(req.user._id).trim();
        console.log('Looking for orders for user:', userId);

        const userOrders = await Order.find({ userId }); // Find orders by userId

        if (!userOrders.length) {
            return res.status(200).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json(userOrders);
    } catch (err) {
        console.error('Error fetching user orders:', err.message);
        res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
    }
};

export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required." });
        }

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        if (order.status === 'Canceled') {
            return res.status(400).json({ message: "Order is already canceled." });  // Prevent double cancellation
        }

        order.status = 'Canceled';
        await order.save();

        return res.status(200).json({ message: "Order canceled successfully." });

    } catch (error) {
        console.error("Error cancelling order:", error.message);
        res.status(500).json({ message: "Failed to cancel order. Please try again later." });
    }
};