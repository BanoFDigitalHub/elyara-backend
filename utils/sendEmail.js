const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmation = async (order) => {
  if (!order.customer?.email) return;

  const itemsHTML = order.items
    .map(item => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #f0e6d3">${item.name}</td>
        <td style="padding:10px;border-bottom:1px solid #f0e6d3;text-align:center">${item.quantity}</td>
        <td style="padding:10px;border-bottom:1px solid #f0e6d3;text-align:right">${order.currency} ${item.price}</td>
      </tr>`)
    .join('');

  const mailOptions = {
    from: `"Elyra" <${process.env.EMAIL_USER}>`,
    to: order.customer.email,
    subject: `✨ Order Confirmed — #${order._id.toString().slice(-6).toUpperCase()}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:auto;padding:30px;background:#fff;color:#333">
        
        <div style="text-align:center;margin-bottom:30px">
          <h1 style="font-size:28px;letter-spacing:4px;color:#b8955a;margin:0">ELYRA</h1>
          <p style="color:#999;font-size:12px;letter-spacing:2px;margin:4px 0">LUXURY DELIVERED</p>
        </div>

        <h2 style="font-size:18px;font-weight:normal;color:#333">
          Shukriya, ${order.customer.name}! 🎉
        </h2>
        <p style="color:#666;line-height:1.6">
          Tumhara order successfully place ho gaya hai. Hum jald hi process karenge aur update denge.
        </p>

        <div style="background:#faf7f2;padding:20px;border-radius:8px;margin:25px 0">
          <p style="margin:0 0 5px 0;font-size:12px;color:#999;letter-spacing:1px">ORDER ID</p>
          <p style="margin:0;font-size:20px;color:#b8955a;font-weight:bold">
            #${order._id.toString().slice(-6).toUpperCase()}
          </p>
        </div>

        <h3 style="font-size:14px;letter-spacing:2px;color:#999;font-weight:normal">ORDER ITEMS</h3>
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#faf7f2">
              <th style="padding:10px;text-align:left;font-weight:normal;color:#999;font-size:12px">ITEM</th>
              <th style="padding:10px;text-align:center;font-weight:normal;color:#999;font-size:12px">QTY</th>
              <th style="padding:10px;text-align:right;font-weight:normal;color:#999;font-size:12px">PRICE</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <div style="margin-top:20px;text-align:right;border-top:1px solid #f0e6d3;padding-top:15px">
          <p style="margin:5px 0;color:#666">Subtotal: <strong>${order.currency} ${order.subtotal}</strong></p>
          <p style="margin:5px 0;color:#666">Shipping: <strong>${order.currency} ${order.shipping}</strong></p>
          <p style="margin:10px 0;font-size:18px;color:#333">
            Total: <strong style="color:#b8955a">${order.currency} ${order.total}</strong>
          </p>
        </div>

        <div style="background:#faf7f2;padding:20px;border-radius:8px;margin-top:25px">
          <h3 style="font-size:14px;letter-spacing:2px;color:#999;font-weight:normal;margin-top:0">DELIVERY INFO</h3>
          <p style="margin:5px 0;color:#666"><strong>Phone:</strong> ${order.customer.phone}</p>
          <p style="margin:5px 0;color:#666"><strong>Address:</strong> ${order.customer.address || 'N/A'}</p>
          <p style="margin:5px 0;color:#666"><strong>Payment:</strong> ${order.paymentMethod}</p>
        </div>

        <p style="color:#999;font-size:12px;text-align:center;margin-top:40px;letter-spacing:1px">
          Koi sawal ho tou reply karo is email pe.<br><br>
          — Elyra Team ✨
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmation };