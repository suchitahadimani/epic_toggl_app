import { NextResponse } from "next/server";

export async function POST() {
  const email = process.env.TOGGL_EMAIL;
  const password = process.env.TOGGL_PASSWORD;
  const auth = Buffer.from(`${email}:${password}`).toString("base64");

  const bodyData = {
    start_date: "2024-03-01",
    end_date: "2024-03-05",
    page_size: 10,
    grouped: false,
  };

  try {
    const response = await fetch( "https://api.track.toggl.com/reports/api/v3/workspace/9283524/projects/summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(bodyData),
      }
    );

    if (!response.ok)
      throw new Error(`Failed to fetch time entries. Status: ${response.status}`);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
