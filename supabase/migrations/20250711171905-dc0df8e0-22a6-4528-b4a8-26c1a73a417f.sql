-- Create a table to store contact form submissions
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_status BOOLEAN NOT NULL DEFAULT false
);

-- Add indexes for better performance
CREATE INDEX idx_contact_inquiries_created_at ON public.contact_inquiries (created_at DESC);
CREATE INDEX idx_contact_inquiries_read_status ON public.contact_inquiries (read_status);

------------------------------------------------------------------
-- ROW LEVEL SECURITY POLICIES (FIXED & SECURED)
------------------------------------------------------------------

-- 1. Enable Row Level Security on the table
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 2. POLICY: Allow anyone to submit a message via the contact form
-- This policy applies to the 'public' role, which covers anonymous visitors.
CREATE POLICY "Allow public insert access to contact messages"
  ON public.contact_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 3. POLICY: Allow ONLY authenticated users to read messages
-- This protects your data from being viewed by the public.
-- Assumes you have a role like 'authenticated'.
CREATE POLICY "Allow authenticated read access to contact messages"
  ON public.contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- 4. POLICY: Allow ONLY authenticated users to update messages (e.g., mark as read)
CREATE POLICY "Allow authenticated update access to contact messages"
  ON public.contact_inquiries
  FOR UPDATE
  TO authenticated
  USING (true);

-- 5. POLICY: Allow ONLY authenticated users to delete messages
CREATE POLICY "Allow authenticated delete access to contact messages"
  ON public.contact_inquiries
  FOR DELETE
  TO authenticated
  USING (true);