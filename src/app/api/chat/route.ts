import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {
  try {
    const { firstLetter, birthdayMonth } = await request.json();
    if (!firstLetter || !birthdayMonth) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const config = new Configuration({
      organization: process.env.OPENAI_ORG_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openapi = new OpenAIApi(config);
    const response = await openapi.createChatCompletion({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "user",
          content:
            `Can you provide me a minecraft block that is best represented by the following information:` +
            `The first letter of my name is ${firstLetter}.` +
            `My birthday month is ${birthdayMonth}.` +
            `Output the response in the following format, "You are a <blockname>!, <2 bullets explaining why>.` +
            `Each sentence should be 1 sentence long.` +
            `The audience is older teenages that are into memes and like to joke around.`,
        },
      ],
    });
    return new NextResponse(
      JSON.stringify({ value: response.data.choices[0].message?.content }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
// export const dynamic = "force-static";
