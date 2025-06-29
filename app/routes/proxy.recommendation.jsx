import { json } from "@remix-run/node";

export async function loader({ request }) {
  try {
    // Use a working mock API
    const response = await fetch("https://mocki.io/v1/578e21f3-56b4-4677-aca5-6a610b4f5a92");

    if (!response.ok) {
      throw new Error("Failed to fetch external API");
    }

    const data = await response.json();

    return json(data, {
      headers: {
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return json({ error: "Failed to fetch recommendation." }, { status: 500 });
  }
}
