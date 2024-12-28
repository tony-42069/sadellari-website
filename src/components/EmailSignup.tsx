"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const EmailSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle email signup
      console.log('Email submitted:', email);
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        required
      />
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
        Notify Me
      </Button>
    </form>
  );
};

export default EmailSignup;