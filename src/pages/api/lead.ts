import type { APIRoute } from 'astro';

export const prerender = false;

// Tipos
interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  origin?: string;
}

// Validação
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(s: string, max = 2000): string {
  return s.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, max);
}

// Envia para Google Sheets via Apps Script Web App
async function saveToSheets(lead: LeadPayload): Promise<void> {
  const url = import.meta.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn('SHEETS_WEBHOOK_URL não configurada');
    return;
  }

  const row = {
    timestamp: new Date().toISOString(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? '',
    service: lead.service ?? '',
    budget: lead.budget ?? '',
    message: lead.message,
    origin: lead.origin ?? '',
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    throw new Error(`Sheets falhou: ${res.status}`);
  }
}

// Envia notificação no WhatsApp via CallMeBot (gratuito) ou WhatsApp Business API
async function notifyWhatsApp(lead: LeadPayload): Promise<void> {
  const apiKey = import.meta.env.CALLMEBOT_API_KEY;
  const phone = import.meta.env.CALLMEBOT_PHONE;

  if (!apiKey || !phone) {
    console.warn('CallMeBot não configurado — pulando notificação WhatsApp');
    return;
  }

  const text = [
    `🚨 *Novo lead em abraaolira.work*`,
    ``,
    `*Nome:* ${lead.name}`,
    `*Email:* ${lead.email}`,
    lead.phone ? `*Tel:* ${lead.phone}` : null,
    lead.service ? `*Serviço:* ${lead.service}` : null,
    lead.budget ? `*Orçamento:* ${lead.budget}` : null,
    ``,
    `*Mensagem:*`,
    lead.message,
  ]
    .filter(Boolean)
    .join('\n');

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(
    text
  )}&apikey=${apiKey}`;

  await fetch(url, { method: 'GET' });
}

export const POST: APIRoute = async ({ request }) => {
  // Rate limit simples por IP (em memória — Vercel reseta entre invocações, mas reduz abuso)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Sanitização + validação
  const lead: LeadPayload = {
    name: sanitize(body.name ?? '', 120),
    email: sanitize(body.email ?? '', 200).toLowerCase(),
    phone: sanitize(body.phone ?? '', 40),
    service: sanitize(body.service ?? '', 40),
    budget: sanitize(body.budget ?? '', 40),
    message: sanitize(body.message ?? '', 3000),
    origin: sanitize(body.origin ?? '', 300),
  };

  if (!lead.name || !lead.email || !lead.message) {
    return new Response(
      JSON.stringify({ error: 'Nome, email e mensagem são obrigatórios.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!isValidEmail(lead.email)) {
    return new Response(JSON.stringify({ error: 'Email inválido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Honeypot: se mensagem contém URLs e for muito curta, provavelmente é spam
  const urlCount = (lead.message.match(/https?:\/\//g) ?? []).length;
  if (urlCount > 2 && lead.message.length < 200) {
    // finge sucesso pra não dar feedback pro bot
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Executa as duas integrações em paralelo. Se uma falhar, a outra ainda roda.
  const results = await Promise.allSettled([saveToSheets(lead), notifyWhatsApp(lead)]);

  const allFailed = results.every((r) => r.status === 'rejected');
  if (allFailed) {
    console.error('Todas as integrações falharam', results);
    return new Response(
      JSON.stringify({
        error: 'Não consegui registrar agora. Chama no WhatsApp, por favor.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.log(`Lead recebido de ${lead.email} (IP: ${ip})`);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
