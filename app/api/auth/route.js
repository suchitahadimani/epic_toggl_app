import { NextResponse } from "next/server";

export async function GET() {
  const email = process.env.TOGGL_EMAIL;
 
  const password = process.env.TOGGL_PASSWORD;
  const auth = Buffer.from(`${email}:${password}`).toString("base64");

  try {
    const response = await fetch("https://api.track.toggl.com/api/v9/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch data from Toggl");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
