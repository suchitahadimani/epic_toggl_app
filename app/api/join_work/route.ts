import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const email = process.env.TOGGL_EMAIL;
  const password = process.env.TOGGL_PASSWORD;
  const auth = Buffer.from(`${email}:${password}`).toString("base64");

  try {
    const invitedEmail = await request.json(); 
    console.log(invitedEmail)


    if (!invitedEmail) {
      return NextResponse.json(
        { error: "Missing required email" },
        { status: 400 }
      );
    }

    //needed to find organization + workspace id in url
    const body = {
      emails: [invitedEmail], 
      workspaces: [
        { workspace_id: 9283524, admin: false }, 
      ],
    };

    const response = await fetch(`https://api.track.toggl.com/api/v9/organizations/9285063/invitations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`Failed to send invitation. Status: ${response.status}`);

    const data = await response.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    const typedError = error as Error;
    return NextResponse.json({ error: typedError.message }, { status: 500 });
  }
}
