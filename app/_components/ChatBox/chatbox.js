"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const token =
  "EAAo1ZBXLKdLcBOyNYCCCdXSmczXW7RLjo0C8hpwHMAmc59x6E30lIot47TLrXsi81PUYuyQImBPmXpuZCAlFR7a5U8A4ZA12vjG111x4hD93vyuXmzMkAhSkb1Fj7Yo1gbZCSZBJi8Ro0DQlZCo7tGbeEi5p4kOZAH9Nel9cLcEw4ZAQKHKvO7qZCmA58i4qZBJJE2xC4iXKZB3xfwWp1VvnV6jY4IDI2iivvDw4zwZD";
const phoneNumberId = "665951809934531";

const ChatBox = ({ user }) => {
  const [status, setStatus] = useState("");

  console.log("Token:", token);
  console.log("Phone Number ID:", phoneNumberId);

  const handleSendTemplate = async () => {
    setStatus("Sending...");

    const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;
    const phone = user.phone;

    const data = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "hello_world", // Must be approved in WhatsApp
        language: {
          code: "en_US",
        },
      },
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`✅ Template sent to ${phone}`);
      setStatus("Message sent successfully");
    } catch (error) {
      console.error(
        `❌ Failed for ${phone}:`,
        error.response?.data || error.message
      );
      setStatus("Failed to send message");
    }
  };

  // ✅ Run once when user changes
  useEffect(() => {
    if (user) {
      handleSendTemplate();
    }
  }, [user]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>
        <button
          onClick={handleSendTemplate}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Send Template
        </button>
      </div>
      <div className="flex-1 bg-gray-50 p-4">
        <div className="bg-white p-3 rounded shadow w-max">
          👋 Hello from WhatsApp template!
        </div>
        <p className="mt-4 text-sm text-gray-500">{status}</p>
      </div>
    </div>
  );
};

export default ChatBox;
