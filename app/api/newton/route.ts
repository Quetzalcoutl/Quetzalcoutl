import { NextRequest, NextResponse } from "next/server"
import newtonConfig from "@/lib/newton-config.json"

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface ModelConfig {
  id: string
  name: string
  priority: number
  contextTokens: number
}

async function tryModel(
  model: ModelConfig,
  messages: Message[],
  apiKey: string
): Promise<{ success: boolean; content?: string; error?: string; rateLimited?: boolean }> {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://amazoniasat.com.br",
        "X-Title": "AmazoniaSat - Newton AI",
      },
      body: JSON.stringify({
        model: model.id,
        messages: [
          { role: "system", content: newtonConfig.systemPrompt },
          ...messages,
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    })

    if (response.status === 429) {
      return { success: false, error: "Rate limited", rateLimited: true }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const isRateLimited = errorData.error?.code === 429 || 
                           errorData.error?.message?.includes('rate-limit')
      return { 
        success: false, 
        error: `${response.status}`,
        rateLimited: isRateLimited
      }
    }

    const data = await response.json()
    
    if (data.choices && data.choices[0]?.message?.content) {
      return { success: true, content: data.choices[0].message.content }
    }

    return { success: false, error: "No content" }
  } catch (error) {
    return { success: false, error: "Network error" }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        content: newtonConfig.fallbackMessage,
        model: "fallback",
      })
    }

    // Sort models by priority
    const sortedModels = [...newtonConfig.models].sort(
      (a, b) => a.priority - b.priority
    )

    // Try each model in order until one succeeds
    for (const model of sortedModels) {
      const result = await tryModel(model, messages, apiKey)
      
      if (result.success && result.content) {
        return NextResponse.json({
          content: result.content,
          model: model.name,
        })
      }
      
      // If rate limited, immediately try next model
      if (result.rateLimited) continue
    }

    // All models failed
    return NextResponse.json({
      content: newtonConfig.fallbackMessage,
      model: "fallback",
    })

  } catch (error) {
    return NextResponse.json({
      content: newtonConfig.fallbackMessage,
      model: "fallback",
    })
  }
}

export async function GET() {
  return NextResponse.json({
    name: newtonConfig.agent.name,
    avatar: newtonConfig.agent.avatar,
    greeting: newtonConfig.agent.greeting,
    available: true,
  })
}
