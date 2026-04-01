import { NextResponse } from "next/server";
import { servicesData } from "@/data/services";
import { portofolio } from "@/data/portofolio";

const MODEL = "gemini-3.1-flash-lite-preview";
const WA_NUMBER = "6287824575622";

const SERVICES_CONTEXT = servicesData
  .map((service, index) => {
    return `${index + 1}. ${service.title}: ${service.description}`;
  })
  .join("\n");

const PORTFOLIO_CONTEXT = portofolio
  .map((item, index) => {
    const linkText = item.link ? item.link : "No public link";
    return `${index + 1}. ${item.title} | ${item.description} | ${linkText}`;
  })
  .join("\n");

const SYSTEM_PROMPT = `You are PanahTech AI assistant.

Rules:
- Reply in the same language as the user's latest message.
- If the user's latest message is Indonesian, reply in Indonesian.
- If the user's latest message is English, reply in English.
- If the user is not using Indonesian or English, reply in the same language the user is using.
- Be concise, helpful, and professional.
- Keep context from the full conversation provided.
- Format response text neatly with clear paragraphs and optional bullet/numbered lists when helpful.
- If user asks about PanahTech services, prioritize these offerings:
  1) Company Profile Website
  2) Online Catalogue
  3) School Website
  4) AI ChatBot
  5) VR Development
  6) IoT Solutions
- If user asks for price/time estimate without enough data, ask focused follow-up questions.
- Avoid making false claims about portfolio details not present in context.
- If user requirements are already clear/fixed, mark ready_for_whatsapp as true and provide a concise whatsapp_draft.

PanahTech Services Context:
${SERVICES_CONTEXT}

PanahTech Portfolio Context:
${PORTFOLIO_CONTEXT}

- When ready_for_whatsapp is true, whatsapp_draft should include a short greeting and a concise summary of requested website/system details from user.

Output MUST be valid JSON only with this schema:
{
  "reply": "string",
  "ready_for_whatsapp": boolean,
  "whatsapp_draft": "string"
}
`;

export const runtime = "nodejs";

const toGeminiRole = (role) => (role === "assistant" ? "model" : "user");

const extractJsonObject = (text) => {
  if (!text) return null;

  const direct = text.trim();
  try {
    return JSON.parse(direct);
  } catch {}

  const fenced = direct
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  try {
    return JSON.parse(fenced);
  } catch {}

  const firstBrace = direct.indexOf("{");
  const lastBrace = direct.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const sliced = direct.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(sliced);
    } catch {}
  }

  return null;
};

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing on server environment." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const normalized = messages
      .filter(
        (item) => item && (item.role === "user" || item.role === "assistant"),
      )
      .map((item) => ({
        role: toGeminiRole(item.role),
        parts: [{ text: String(item.content || "") }],
      }))
      .filter((item) => item.parts[0].text.trim().length > 0)
      .slice(-24);

    if (normalized.length === 0) {
      return NextResponse.json(
        { error: "At least one user message is required." },
        { status: 400 },
      );
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: normalized,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 600,
        },
      }),
    });

    const result = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return NextResponse.json(
        {
          error: result?.error?.message || "Gemini request failed.",
        },
        { status: geminiResponse.status },
      );
    }

    const rawReply = result?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text || "")
      .join("\n")
      .trim();

    if (!rawReply) {
      return NextResponse.json(
        { error: "Gemini returned empty response." },
        { status: 502 },
      );
    }

    const parsed = extractJsonObject(rawReply);

    const fallbackReply =
      "Thanks for your message. Could you share more project details so we can provide a precise estimate?";
    const reply =
      typeof parsed?.reply === "string" && parsed.reply.trim()
        ? parsed.reply.trim()
        : rawReply;

    const readyForWhatsapp = Boolean(parsed?.ready_for_whatsapp);
    const whatsappDraft =
      typeof parsed?.whatsapp_draft === "string"
        ? parsed.whatsapp_draft.trim()
        : "";

    let whatsappLink = null;
    if (readyForWhatsapp) {
      const waText =
        whatsappDraft ||
        `Halo PanahTech, saya ingin lanjut konsultasi project. Berikut detail kebutuhan saya: ${reply}`;
      whatsappLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;
    }

    return NextResponse.json({
      reply: reply || fallbackReply,
      readyForWhatsapp,
      whatsappLink,
      whatsappText: whatsappDraft,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while processing chat request." },
      { status: 500 },
    );
  }
}
