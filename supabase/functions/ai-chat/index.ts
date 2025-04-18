
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are a highly responsive, helpful, and intelligent AI assistant named Echo. Your main role is to instantly reply to users' messages with clear, accurate, and helpful information. You must always respond to every question or message sent to you — no matter how simple or complex — without delays.

Prioritize quick, conversational responses while being friendly, engaging, and professional. Do not leave any message unanswered. If a user's question is unclear, politely ask for clarification instead of staying silent. Always aim to be useful and proactive.

Your top priority is responsiveness, reliability, and helpfulness.`

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    if (!message || typeof message !== 'string') {
      throw new Error('Invalid message format')
    }

    console.log("Received message:", message.substring(0, 50) + "...")

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: SYSTEM_PROMPT },
              { text: message }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Gemini API error:", errorData)
      throw new Error(`Gemini API responded with status ${response.status}: ${errorData}`)
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error("Unexpected API response structure:", JSON.stringify(data))
      throw new Error("Unexpected API response structure")
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text

    console.log("AI response generated successfully:", aiResponse.substring(0, 50) + "...")
    
    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate AI response',
        details: error.stack
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
