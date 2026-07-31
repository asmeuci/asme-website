import { useState } from 'react';

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "b73a9e17-9ddf-4e57-a456-dddf10de45d6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent. Thank you for considering us! We will be in touch shortly.");
        form.reset(); // Clears text fields after sending
      } else {
        setResult("Error submitting form. Please try again.");
      }
    } catch (error) {
      setResult("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
      {/* Honeypot Spam Trap (Hidden from real users, tricks bots) */}
      <input 
        type="checkbox" 
        name="botcheck" 
        className="hidden" 
        style={{ display: "none" }} 
      />

      <input type="text" name="name" required placeholder="Name" className="font-helvetica p-2 border rounded" />
      <input type="email" name="email" required placeholder="Email" className="font-helvetica p-2 border rounded" />
      <textarea name="message" required placeholder="Message" className="font-helvetica p-2 border rounded" rows={4}></textarea>
      
      <button type="submit" className="font-helvetica bg-blue-300 text-black p-2 rounded font-semibold">
        Submit
      </button>

      {result && <p className="text-center text-sm font-medium">{result}</p>}
    </form>
  );
}