import '@/styles/contact-form.css';
import { useState, useRef } from 'react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

interface Props {
  whatsapp: string;
}

export default function ContactForm({ whatsapp }: Props) {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name')?.toString().trim() ?? '',
      email: formData.get('email')?.toString().trim() ?? '',
      phone: formData.get('phone')?.toString().trim() ?? '',
      service: formData.get('service')?.toString() ?? '',
      budget: formData.get('budget')?.toString() ?? '',
      message: formData.get('message')?.toString().trim() ?? '',
      origin: typeof window !== 'undefined' ? window.location.href : '',
    };

    // Validação simples no client
    if (!payload.name || !payload.email || !payload.message) {
      setState('error');
      setErrorMsg('Preencha nome, email e mensagem.');
      return;
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Erro ao enviar. Tenta de novo.');
      }

      setState('success');
      formRef.current?.reset();
    } catch (err: any) {
      setState('error');
      setErrorMsg(err.message ?? 'Falha de rede. Tenta de novo ou chama no WhatsApp.');
    }
  };

  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    'Oi Abraão, vi seu site e quero conversar sobre um projeto.'
  )}`;

  if (state === 'success') {
    return (
      <div className="cf-success" role="status">
        <div className="cf-success__mark" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M14 24L21 31L34 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              fill="none"
            />
          </svg>
        </div>
        <h3 className="cf-success__title">Mensagem registrada.</h3>
        <p className="cf-success__body">
          Recebi tudo direitinho. Vou responder no email e no WhatsApp em até 3h úteis. Quer adiantar?
        </p>
        <a className="cf-success__cta" href={waUrl} target="_blank" rel="noopener">
          Abrir conversa no WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} className="cf-form" onSubmit={handleSubmit}>
      <div className="cf-grid">
        <label className="cf-field">
          <span className="cf-label">Nome</span>
          <input
            type="text"
            name="name"
            placeholder="Como prefere ser chamado(a)"
            required
            autoComplete="name"
          />
        </label>

        <label className="cf-field">
          <span className="cf-label">Email</span>
          <input
            type="email"
            name="email"
            placeholder="seu@email.com"
            required
            autoComplete="email"
          />
        </label>

        <label className="cf-field">
          <span className="cf-label">WhatsApp</span>
          <input
            type="tel"
            name="phone"
            placeholder="(47) 99999-9999"
            autoComplete="tel"
          />
        </label>

        <label className="cf-field">
          <span className="cf-label">Tipo de projeto</span>
          <select name="service" defaultValue="">
            <option value="" disabled>Selecione…</option>
            <option value="site">Site institucional</option>
            <option value="landing">Landing page</option>
            <option value="saas">SaaS / Web app</option>
            <option value="automacao">Automação / IA</option>
            <option value="outro">Não tenho certeza</option>
          </select>
        </label>

        <label className="cf-field cf-field--span">
          <span className="cf-label">Investimento estimado</span>
          <select name="budget" defaultValue="">
            <option value="" disabled>Selecione uma faixa…</option>
            <option value="ate-2k">Até R$ 2.000</option>
            <option value="2k-5k">R$ 2.000 – R$ 5.000</option>
            <option value="5k-10k">R$ 5.000 – R$ 10.000</option>
            <option value="acima-10k">Acima de R$ 10.000</option>
            <option value="discutir">Quero conversar antes</option>
          </select>
        </label>

        <label className="cf-field cf-field--span">
          <span className="cf-label">Conta um pouco do projeto</span>
          <textarea
            name="message"
            rows={5}
            placeholder="O que você faz, o que precisa, prazo desejado, referências…"
            required
          />
        </label>
      </div>

      {state === 'error' && (
        <p className="cf-error" role="alert">
          {errorMsg}
        </p>
      )}

      <div className="cf-actions">
        <button type="submit" className="btn cf-submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
          {state !== 'sending' && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          )}
        </button>
        <span className="cf-or">ou</span>
        <a className="link-underline cf-wa" href={waUrl} target="_blank" rel="noopener">
          chamar direto no WhatsApp
        </a>
      </div>


    </form>
  );
}
