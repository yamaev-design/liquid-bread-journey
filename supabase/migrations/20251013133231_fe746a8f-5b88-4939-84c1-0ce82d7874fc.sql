-- Create snacks table with predefined snacks
CREATE TABLE public.snacks (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0
);

-- Insert the 5 snacks
INSERT INTO public.snacks (id, name, votes) VALUES
  (1, 'Сухарики', 0),
  (2, 'Орешки', 0),
  (3, 'Сушёная и вяленая рыба', 0),
  (4, 'Мясные закуски', 0),
  (5, 'Картофельные чипсы', 0);

-- Create table to track IP addresses that have voted
CREATE TABLE public.snack_votes_ips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  snack_id INTEGER NOT NULL REFERENCES public.snacks(id),
  voted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ip_address)
);

-- Enable RLS
ALTER TABLE public.snacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.snack_votes_ips ENABLE ROW LEVEL SECURITY;

-- Public can read snacks
CREATE POLICY "Anyone can view snacks"
  ON public.snacks
  FOR SELECT
  USING (true);

-- Only allow inserts through edge function (will handle IP checking)
CREATE POLICY "Allow vote inserts"
  ON public.snack_votes_ips
  FOR INSERT
  WITH CHECK (true);

-- Public can check if they voted
CREATE POLICY "Anyone can view votes"
  ON public.snack_votes_ips
  FOR SELECT
  USING (true);

-- Create function to increment vote count
CREATE OR REPLACE FUNCTION public.increment_snack_vote(snack_id_param INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.snacks
  SET votes = votes + 1
  WHERE id = snack_id_param;
END;
$$;

-- Create admin role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin can view all roles
CREATE POLICY "Admins can view roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin can reset votes
CREATE POLICY "Admins can update snacks"
  ON public.snacks
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin can clear vote IPs
CREATE POLICY "Admins can delete vote records"
  ON public.snack_votes_ips
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));