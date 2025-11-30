import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiUrl = process.env.E_START_API_URL;
  const apiId = process.env.E_START_API_ID;
  const apiInboundId = process.env.E_START_INBOUND_ID;

  const year = request.nextUrl.searchParams.get("year");
  const country = request.nextUrl.searchParams.get("country");

  if (
    !apiUrl ||
    !apiId ||
    !apiInboundId
  ) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const url = `${apiUrl}?appId=${encodeURIComponent(apiId)}&lang=J&statsDataId=${encodeURIComponent(apiInboundId)}&cdTime=${year}000000&cdArea=${country}&cdTab=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: response.status });
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
