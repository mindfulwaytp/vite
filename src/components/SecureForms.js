import React, { useState } from 'react';

export default function SecureForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-xl font-bold mb-4">Secure Intake Form</h2>
      {submitted ? <p className="text-green-600">Submitted!</p> : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" required />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className="border p-2 w-full" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      )}
    </div>
  );
}
