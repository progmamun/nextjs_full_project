"use client";
import { useState } from "react";

export default function RegisterForm({ onRegistered }: { onRegistered: (email: string) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dept: "",
    session: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      onRegistered(formData.email);
    } else {
      setMessage("Registration failed. You may already be registered.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {["name", "email", "phone", "dept", "session"].map((field) => (
        <input key={field} type="text" name={field} placeholder={field} onChange={handleChange} required />
      ))}
      <button type="submit" className="bg-blue-500 text-white">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}
