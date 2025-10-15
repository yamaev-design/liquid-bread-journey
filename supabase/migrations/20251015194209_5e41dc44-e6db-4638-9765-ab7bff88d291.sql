-- Remove old unique constraint on ip_address
ALTER TABLE public.snack_votes_ips DROP CONSTRAINT IF EXISTS snack_votes_ips_ip_address_key;

-- Add new composite unique constraint on (ip_address, snack_id)
-- This allows one vote per IP per snack
ALTER TABLE public.snack_votes_ips 
ADD CONSTRAINT snack_votes_ips_ip_snack_unique UNIQUE (ip_address, snack_id);