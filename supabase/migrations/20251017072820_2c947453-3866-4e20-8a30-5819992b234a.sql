-- Fix public exposure of IP addresses
-- Remove the overly permissive policy that allows anyone to view voter IPs
DROP POLICY IF EXISTS "Anyone can view votes" ON public.snack_votes_ips;

-- Create admin-only policy for viewing IP addresses
CREATE POLICY "Admins only can view vote IPs" ON public.snack_votes_ips
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));