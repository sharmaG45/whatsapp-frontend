"use client";

import React, { useState, useEffect, useRef } from "react";

const HomePage = () => {
  const [phone, setPhone] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const sendMessage = () => {
    console.log("Send message");
  };

  const showProfileSettings = () => {
    console.log("Show profile settings");
  };

  const hideProfileSettings = () => {
    console.log("Hide profile settings");
  };

  const showChatList = () => {
    console.log("Show chat list");
  };

  const handleSendTemplate = async () => {
    if (!phone) {
      alert("Please enter a phone number");
      return;
    }

    try {
      const response = await fetch(
        "https://6f1d4ecf-f0fa-4d0b-92fe-efcb690973b5-00-1xkxrzrpqksie.sisko.replit.dev/webhook/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone }),
        }
      );

      const result = await response.json();

      console.log("response", result);

      if (!response.ok) {
        throw new Error(result.error?.message || JSON.stringify(result));
      }

      // Add sent message to state
      setSentMessages((prev) => [
        ...prev,
        {
          phone,
          message: result.sentMessage || "Template sent", // fallback if missing
          timestamp: new Date().toLocaleString(),
          status: "sent",
        },
      ]);

      console.log("hhiiiiiiii-", sentMessages);

      alert("✅ Template sent!");
      console.log("Success:", result);
    } catch (error) {
      console.error("❌ Failed to send template:", error.message);
      alert(`❌ Failed to send message: ${error.message}`);
    }
  };

  const [receivedMessages, setReceivedMessages] = useState([]);

  const fetchReceivedMessages = async () => {
    try {
      const res = await fetch(
        "https://6f1d4ecf-f0fa-4d0b-92fe-efcb690973b5-00-1xkxrzrpqksie.sisko.replit.dev/webhook/messages"
      );
      const data = await res.json();
      setReceivedMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  useEffect(() => {
    fetchReceivedMessages();
  }, []);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessages, sentMessages]);

  const allMessages = [...receivedMessages, ...sentMessages]
    .filter((msg) => msg.type !== "status") // exclude status updates
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="container-fluid" id="main-container">
      <div className="row h-100">
        {/* Chat List Area (Left) */}
        <div
          className="col-12 col-sm-5 col-md-3 d-flex flex-column"
          id="chat-list-area"
          style={{ position: "relative" }}
        >
          {/* Navbar */}
          <div
            className="row d-flex flex-row align-items-center p-2"
            id="navbar"
          >
            <img
              alt="Profile Photo"
              className="img-fluid rounded-circle mr-2"
              style={{ height: 50, cursor: "pointer" }}
              onClick={showProfileSettings}
              id="display-pic"
            />
            <div className="text-white font-weight-bold" id="username" />
            <div className="nav-item dropdown ml-auto">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v text-white" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  New Group
                </a>
                <a className="dropdown-item" href="#">
                  Archived
                </a>
                <a className="dropdown-item" href="#">
                  Starred
                </a>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
                <a className="dropdown-item" href="#">
                  Log Out
                </a>
              </div>
            </div>
          </div>

          {/* Chat List */}
          <div className="row" id="chat-list" style={{ overflow: "auto" }} />

          {/* Profile Settings */}
          <div className="d-flex flex-column w-100 h-100" id="profile-settings">
            <div
              className="row d-flex flex-row align-items-center p-2 m-0"
              style={{ background: "#009688", minHeight: 65 }}
            >
              <i
                className="fas fa-arrow-left p-2 mx-3 my-1 text-white"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={hideProfileSettings}
              />
              <div className="text-white font-weight-bold">Profile</div>
            </div>
            <div className="d-flex flex-column" style={{ overflow: "auto" }}>
              <img
                alt="Profile Photo"
                className="img-fluid rounded-circle my-5 justify-self-center mx-auto"
                id="profile-pic"
              />
              <input type="file" id="profile-pic-input" className="d-none" />
              <div className="bg-white px-3 py-2">
                <div className="text-muted mb-2">
                  <label htmlFor="input-name">Your Name</label>
                </div>
                <input
                  type="text"
                  name="name"
                  id="input-name"
                  className="w-100 border-0 py-2 profile-input"
                />
              </div>
              <div className="text-muted p-3 small">
                This is not your username or pin. This name will be visible to
                your WhatsApp contacts.
              </div>
              <div className="bg-white px-3 py-2">
                <div className="text-muted mb-2">
                  <label htmlFor="input-about">About</label>
                </div>
                <input
                  type="text"
                  name="about"
                  id="input-about"
                  defaultValue=""
                  className="w-100 border-0 py-2 profile-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Message Area (Middle) */}
        <div
          className="d-none d-sm-flex flex-column col-12 col-sm-7 col-md-6 p-0 h-100"
          id="message-area"
        >
          {/* Navbar */}
          <div
            className="row d-flex flex-row align-items-center p-2 m-0 w-100"
            id="navbar"
          >
            <div className="d-block d-sm-none">
              <i
                className="fas fa-arrow-left p-2 mr-2 text-white"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={showChatList}
              />
            </div>
            <a href="#">
              <img
                src="https://via.placeholder.com/400x400"
                alt="Profile Photo"
                className="img-fluid rounded-circle mr-2"
                style={{ height: 50 }}
                id="pic"
              />
            </a>
            <div className="d-flex flex-column">
              <div className="text-white font-weight-bold" id="name" />
              <div className="text-white small" id="details" />
            </div>
            <div className="d-flex flex-row align-items-center ml-auto">
              <a href="#">
                <i className="fas fa-search mx-3 text-white d-none d-md-block" />
              </a>
              <a href="#">
                <i className="fas fa-paperclip mx-3 text-white d-none d-md-block" />
              </a>
              <a href="#">
                <i className="fas fa-ellipsis-v mr-2 mx-sm-3 text-white" />
              </a>
            </div>
          </div>

          {/* Messages */}
          <div
            className="d-flex flex-column"
            id="messages"
            style={{ maxHeight: "400px", overflowY: "auto", padding: "1rem" }}
          >
            {allMessages.map((msg, idx) => {
              const isSent = msg.from === "server" || msg.status === "sent";

              return (
                <div
                  key={idx}
                  className={`p-2 my-1 rounded shadow-sm ${
                    isSent
                      ? "bg-success text-white align-self-end"
                      : "bg-white text-dark align-self-start border"
                  }`}
                  style={{ maxWidth: "75%", position: "relative" }}
                >
                  <div>{msg.message}</div>
                  <small
                    className="text-muted d-flex justify-content-end align-items-center gap-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isSent && (
                      <span style={{ fontSize: "1rem", marginLeft: "5px" }}>
                        ✔{/* or ✔✔ for double tick */}
                      </span>
                    )}
                  </small>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="d-none justify-self-end align-items-center flex-row"
            id="input-area"
          >
            <a href="#">
              <i
                className="far fa-smile text-muted px-3"
                style={{ fontSize: "1.5rem" }}
              />
            </a>
            <input
              type="text"
              name="message"
              id="input"
              placeholder="Type a message"
              className="flex-grow-1 border-0 px-3 py-2 my-3 rounded shadow-sm"
            />
            <i
              className="fas fa-paper-plane text-muted px-3"
              style={{ cursor: "pointer" }}
              onClick={sendMessage}
            />
          </div>
        </div>

        {/* Template Sender (Right) */}
        <div className="d-none d-md-flex flex-column col-md-3 p-3 border-start bg-light">
          <h5>Send Template</h5>
          <input
            type="text"
            placeholder="Enter phone number"
            className="form-control mb-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleSendTemplate}>
            Send Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
