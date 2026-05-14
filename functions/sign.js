/**
 * Cloudflare Pages Function: POST /sign
 * Calcula la firma de integridad requerida por Wompi.
 * Fórmula: SHA256(reference + amount_in_cents + currency + WOMPI_INTEGRITY_SECRET)
 *
 * Variable de entorno requerida en Cloudflare Pages:
 *   WOMPI_INTEGRITY_SECRET  → tu secreto de integridad (pestaña Desarrolladores en Wompi)
 */
export async function onRequestPost(context) {
  try {
    const { reference, amount, currency } = await context.request.json();

    if (!reference || !amount || !currency) {
      return new Response(JSON.stringify({ error: "Faltan parámetros" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const secret = context.env.WOMPI_INTEGRITY_SECRET;
    if (!secret) {
      return new Response(JSON.stringify({ error: "Secreto no configurado" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = reference + amount + currency + secret;
    const encoded = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
    const signature = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return new Response(JSON.stringify({ signature }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
