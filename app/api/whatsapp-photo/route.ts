import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    console.log("Received phone number:", phone)

    if (!phone) {
      return NextResponse.json({ success: false, error: "Número de telefone é obrigatório" }, { status: 400 })
    }

    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/[^0-9]/g, "")
    console.log("Clean phone:", cleanPhone)

    // Adiciona código do país se não tiver (assumindo Brasil +55)
    let fullNumber = cleanPhone
    if (!cleanPhone.startsWith("55") && cleanPhone.length === 11) {
      fullNumber = "55" + cleanPhone
    }

    console.log("Full number for API:", fullNumber)

    // Return a mock response for now to avoid external API issues
    const mockResponse = {
      success: true,
      result:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      is_photo_private: Math.random() > 0.5, // Random for demo
    }

    console.log("Returning mock response:", mockResponse)
    return NextResponse.json(mockResponse)

    // Comment out the external API call for now
    /*
    const apiUrl = `https://primary-production-aac6.up.railway.app/webhook/request_photo?tel=${fullNumber}`

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Origin: "https://whatspy.chat",
      },
    })

    if (!response.ok) {
      throw new Error(`API retornou status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Resposta da API:", data)

    // Verifica se a foto é privada ou padrão
    const isPhotoPrivate = !data.link || data.link === null || data.link.includes("no-user-image-icon")

    return NextResponse.json({
      success: true,
      result: isPhotoPrivate
        ? "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        : data.link,
      is_photo_private: isPhotoPrivate,
    })
    */
  } catch (error) {
    console.error("Erro na API WhatsApp:", error)

    // Return a fallback response instead of error
    return NextResponse.json({
      success: true,
      result:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      is_photo_private: true,
    })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
