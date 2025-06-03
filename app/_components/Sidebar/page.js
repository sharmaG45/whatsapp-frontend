"use client";

import React from "react";

const recipients = [
  { phone: "919097989707", name: "Shubham" },
  //   { phone: "918051861367", name: "Honey" },
];

export default function Sidebar({ onSelectUser }) {
  return (
    <div className="w-1/3 bg-white border-r h-screen overflow-y-auto">
      <h2 className="text-xl font-bold p-4 border-b">Contacts</h2>
      <ul>
        {recipients.map((recipients) => (
          <li
            key={recipients.phone}
            onClick={() => onSelectUser(recipients)}
            className="cursor-pointer p-4 hover:bg-gray-100 border-b"
          >
            <p className="font-medium">{recipients.name}</p>
            <p className="text-sm text-gray-500">{recipients.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
