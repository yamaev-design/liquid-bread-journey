import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { snackId } = await req.json();
    
    // Get client IP address
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log(`Vote attempt from IP: ${clientIP} for snack: ${snackId}`);

    // Check if this IP has already voted
    const { data: existingVote, error: checkError } = await supabaseClient
      .from('snack_votes_ips')
      .select('*')
      .eq('ip_address', clientIP)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing vote:', checkError);
      throw checkError;
    }

    if (existingVote) {
      return new Response(
        JSON.stringify({ error: 'Вы уже проголосовали' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Record the vote
    const { error: insertError } = await supabaseClient
      .from('snack_votes_ips')
      .insert({ ip_address: clientIP, snack_id: snackId });

    if (insertError) {
      console.error('Error inserting vote:', insertError);
      throw insertError;
    }

    // Increment vote count
    const { error: updateError } = await supabaseClient
      .rpc('increment_snack_vote', { snack_id_param: snackId });

    if (updateError) {
      console.error('Error incrementing vote:', updateError);
      throw updateError;
    }

    // Get updated snack data
    const { data: snacks, error: snacksError } = await supabaseClient
      .from('snacks')
      .select('*')
      .order('id');

    if (snacksError) {
      console.error('Error fetching snacks:', snacksError);
      throw snacksError;
    }

    console.log(`Vote recorded successfully for snack: ${snackId}`);

    return new Response(
      JSON.stringify({ success: true, snacks }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in vote-snack function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
