import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    console.log("Fetching from backend...")

    // Parse incoming JSON request
    const requestData = await req.json()

    // Convert all values to numbers
    const numericData = Object.fromEntries(Object.entries(requestData).map(([key, value]) => [key, Number(value)]))

    console.log("Sending data to backend:", numericData)

    // Send POST request to FastAPI
    const fetchResponse = await fetch("http://backend:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(numericData),
    })

    console.log("Status:", fetchResponse.status)
    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! Status: ${fetchResponse.status}`)
    }

    const response = await fetchResponse.json()
    console.log("Response from backend:", response)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "Failed to fetch data from the API" }, { status: 500 })
  }
}

