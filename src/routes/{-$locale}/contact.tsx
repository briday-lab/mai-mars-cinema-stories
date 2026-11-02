import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav, Footer } from "@/components/SiteChrome";
import { alternateLinks, CONTACT_EMAIL, dict, langFromParam, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/{-$locale}/contact")({
  head: ({ params }) => {
    const t = dict[langFromParam(params.locale)];
    return {
      meta: [
        { title: t.contact.title },
        { name: "description", content: t.contact.description },
        { property: "og:title", content: t.contact.title },
        { property: "og:description", content: t.contact.description },
      ],
      links: alternateLinks("/contact"),
    };
  },
  component: Contact,
});

// Netlify Forms registers this form from public/__forms.html; field names must match it.
const FORM_NAME = "contact";

type Status = "idle" | "sending" | "sent" | "error";

function Contact() {
  const t = useT().contact;
  const lang = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      // SSR pages can't receive form posts, so submit to the static skeleton file.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          new FormData(form) as unknown as Record<string, string>,
        ).toString(),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const field =
    "mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary";
  const label = "eyebrow text-muted-foreground";

  return (
    <div className="bg-background">
      <Nav />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 pt-40 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-primary">{t.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-foreground md:text-7xl">
            {t.heading}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{t.intro}</p>
          <p className="eyebrow mt-12 text-muted-foreground">{t.orEmail}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-block break-all font-display text-2xl text-primary hover:text-foreground"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {status === "sent" ? (
            <div role="status" className="border border-border p-10">
              <p className="font-display text-3xl leading-snug text-foreground">{t.sent}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="eyebrow mt-8 text-primary hover:text-foreground"
              >
                {t.sendAnother}
              </button>
            </div>
          ) : (
            <form
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <input type="hidden" name="subject" value={t.subject} />
              <input type="hidden" name="language" value={lang} />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <label className="block">
                <span className={label}>{t.name}</span>
                <input name="name" type="text" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>{t.email}</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="block">
                <span className={label}>{t.organization}</span>
                <input
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  className={field}
                />
              </label>
              <label className="block">
                <span className={label}>{t.message}</span>
                <textarea name="message" required rows={6} className={`${field} resize-y`} />
              </label>
              {status === "error" && (
                <p role="alert" className="text-sm text-destructive">
                  {t.failed}{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="eyebrow border border-primary px-8 py-4 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
              >
                {status === "sending" ? t.sending : t.send}
              </button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
