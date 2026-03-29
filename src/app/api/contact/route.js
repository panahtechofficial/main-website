import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, questionType, message } = body || {};
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    const normalizedName = String(name || "").trim();
    const normalizedEmail = String(email || "").trim();
    const normalizedQuestionType = String(questionType || "").trim();
    const normalizedMessage = String(message || "").trim();

    if (
      !normalizedName ||
      !normalizedEmail ||
      !normalizedQuestionType ||
      !normalizedMessage
    ) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 },
      );
    }

    if (!accessKey) {
      return NextResponse.json(
        { error: "Konfigurasi server belum lengkap. Hubungi admin." },
        { status: 500 },
      );
    }

    let res;
    try {
      res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: normalizedName,
          email: normalizedEmail,
          subject: `PanahTech Contact - ${normalizedQuestionType}`,
          from_name: "PanahTech Contact Form",
          message: `Jenis Pertanyaan: ${normalizedQuestionType}\n\nPesan:\n${normalizedMessage}`,
        }),
      });
    } catch {
      return NextResponse.json(
        {
          error:
            "Layanan email sedang tidak bisa dihubungi. Silakan coba lagi beberapa saat.",
        },
        { status: 502 },
      );
    }

    const rawResponseText = await res.text();
    let data = null;
    try {
      data = JSON.parse(rawResponseText);
    } catch {
      data = null;
    }

    if (
      res.status === 403 &&
      rawResponseText.toLowerCase().includes("just a moment")
    ) {
      return NextResponse.json(
        {
          error:
            "Layanan email sementara memblokir request dari server ini. Coba lagi beberapa saat atau hubungi admin.",
        },
        { status: 502 },
      );
    }

    if (!res.ok || data?.success === false) {
      return NextResponse.json(
        {
          error:
            data?.message ||
            "Gagal mengirim pesan ke email service. Silakan coba lagi.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Pesan berhasil diterima." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses pesan." },
      { status: 500 },
    );
  }
}
