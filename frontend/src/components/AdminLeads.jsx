import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LockKey,
  SignOut,
  ArrowClockwise,
  DownloadSimple,
  Phone,
  WhatsappLogo,
  CaretDown,
  ShieldCheck,
} from "@phosphor-icons/react";
import {
  adminLogin,
  verifyAdmin,
  fetchLeads,
  updateLeadStatus,
  downloadLeadsCsv,
  getAdminToken,
  clearAdminToken,
  apiError,
} from "@/lib/api";

const STATUSES = ["new", "contacted", "booked", "closed"];
const statusStyle = {
  new: "bg-[#C87560] text-white",
  contacted: "bg-[#E8DCC8] text-[#124340]",
  booked: "bg-[#1E6F5C] text-white",
  closed: "bg-white/10 text-white/60",
};
const bandStyle = {
  high: "text-[#FF9E8E]",
  moderate: "text-[#E8B27A]",
  low: "text-[#8FD2BE]",
};

const Gate = ({ onDone }) => {
  const [passcode, setPasscode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await adminLogin(passcode);
      onDone();
    } catch (e2) {
      setErr(apiError(e2));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-5 bg-[#0A2523]">
      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={submit}
        className="w-full max-w-sm rounded-[1.75rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8"
        data-testid="admin-gate"
      >
        <span className="grid place-items-center h-12 w-12 rounded-full bg-[#C87560] text-white">
          <LockKey size={22} weight="fill" />
        </span>
        <h1 className="mt-5 font-serif text-3xl text-[#F5F3EC] leading-tight">Leads dashboard</h1>
        <p className="mt-2 text-sm text-[#F5F3EC]/55">
          Dr. Aditya Soni Clinic — team access only.
        </p>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Enter clinic passcode"
          autoFocus
          className="mt-6 w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3.5 text-[#F5F3EC] placeholder:text-[#F5F3EC]/35 outline-none focus:border-[#C87560] transition-colors"
          data-testid="admin-passcode-input"
        />
        {err && (
          <p className="mt-3 text-[13px] text-[#FF9E8E]" data-testid="admin-login-error">
            {err}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-full bg-[#F5F3EC] text-[#0A2523] py-3.5 font-medium hover:bg-[#E8DCC8] transition-colors disabled:opacity-60"
          data-testid="admin-login-btn"
        >
          {busy ? "Checking…" : "Unlock"}
        </button>
        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-[#F5F3EC]/40">
          <ShieldCheck size={13} /> Patient data — handle confidentially.
        </p>
      </motion.form>
    </div>
  );
};

const LeadCard = ({ lead, onStatus }) => {
  const [open, setOpen] = useState(false);
  const when = new Date(lead.created_at).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
      data-testid={`lead-card-${lead.id}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[#F5F3EC] font-medium text-lg leading-tight">{lead.name}</p>
          <p className="text-[13px] text-[#F5F3EC]/50 mt-0.5">
            {when} · {lead.source === "self_check" ? "Self-check" : "Booking form"} ·{" "}
            {lead.language === "hi" ? "Hinglish" : "English"}
          </p>
        </div>
        <div className="relative">
          <select
            value={lead.status || "new"}
            onChange={(e) => onStatus(lead.id, e.target.value)}
            className={`appearance-none rounded-full pl-4 pr-8 py-1.5 text-[12px] uppercase tracking-wide font-medium outline-none cursor-pointer ${
              statusStyle[lead.status || "new"]
            }`}
            data-testid={`lead-status-${lead.id}`}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="text-[#0A2523]">
                {s}
              </option>
            ))}
          </select>
          <CaretDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a
          href={`tel:+91${lead.phone.replace(/\D/g, "").slice(-10)}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F3EC] text-[#0A2523] px-4 py-2 text-[13px] font-medium"
          data-testid={`lead-call-${lead.id}`}
        >
          <Phone size={14} weight="fill" /> {lead.phone}
        </a>
        <a
          href={`https://wa.me/91${lead.phone.replace(/\D/g, "").slice(-10)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#1E6F5C] text-white px-4 py-2 text-[13px] font-medium"
          data-testid={`lead-wa-${lead.id}`}
        >
          <WhatsappLogo size={14} weight="fill" /> WhatsApp
        </a>
      </div>

      <div className="mt-4 grid gap-1.5 text-[13px] text-[#F5F3EC]/70">
        {lead.track_label && (
          <p>
            <span className="text-[#F5F3EC]/40">Track: </span>
            {lead.track_label}
          </p>
        )}
        {lead.score !== null && lead.score !== undefined && (
          <p>
            <span className="text-[#F5F3EC]/40">Score: </span>
            {lead.score}/{lead.max_score}{" "}
            {lead.risk_band && (
              <span className={`uppercase text-[11px] tracking-wide ${bandStyle[lead.risk_band]}`}>
                · {lead.risk_band} concern
              </span>
            )}
          </p>
        )}
        {lead.concern && (
          <p>
            <span className="text-[#F5F3EC]/40">Concern: </span>
            {lead.concern}
          </p>
        )}
        {lead.preferred_time && (
          <p>
            <span className="text-[#F5F3EC]/40">Best time: </span>
            {lead.preferred_time}
          </p>
        )}
      </div>

      {lead.answers?.length > 0 && (
        <>
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-3 text-[12px] uppercase tracking-[0.15em] text-[#C87560] hover:text-[#E8B27A] transition-colors"
            data-testid={`lead-answers-toggle-${lead.id}`}
          >
            {open ? "Hide answers" : `View ${lead.answers.length} answers`}
          </button>
          {open && (
            <div className="mt-3 grid gap-2 rounded-xl bg-black/20 p-4" data-testid={`lead-answers-${lead.id}`}>
              {lead.answers.map((a, i) => (
                <div key={i} className="flex justify-between gap-4 text-[12.5px]">
                  <span className="text-[#F5F3EC]/75">{a.question}</span>
                  <span className="text-[#E8B27A] shrink-0">{a.answer}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function AdminLeads() {
  const [authed, setAuthed] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [exporting, setExporting] = useState(false);

  const onExport = async () => {
    setExporting(true);
    setErr("");
    try {
      await downloadLeadsCsv();
    } catch (e) {
      setErr(apiError(e));
    } finally {
      setExporting(false);
    }
  };

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      setLeads(await fetchLeads());
      setAuthed(true);
    } catch (e) {
      if (e?.response?.status === 401) {
        clearAdminToken();
        setAuthed(false);
      } else setErr(apiError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getAdminToken()) {
      setAuthed(false);
      return;
    }
    verifyAdmin()
      .then(() => load())
      .catch(() => {
        clearAdminToken();
        setAuthed(false);
      });
  }, [load]);

  const onStatus = async (id, status) => {
    const prev = leads.find((l) => l.id === id)?.status || "new";
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await updateLeadStatus(id, status);
    } catch (e) {
      setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status: prev } : l)));
      setErr(apiError(e));
    }
  };

  const counts = useMemo(() => {
    const c = { all: leads.length, new: 0, contacted: 0, booked: 0, closed: 0 };
    leads.forEach((l) => (c[l.status || "new"] += 1));
    return c;
  }, [leads]);

  const shown = filter === "all" ? leads : leads.filter((l) => (l.status || "new") === filter);

  if (authed === null) {
    return <div className="min-h-screen bg-[#0A2523] grid place-items-center text-[#F5F3EC]/60">Loading…</div>;
  }
  if (!authed) return <Gate onDone={load} />;

  return (
    <div className="min-h-screen bg-[#0A2523] pb-20" data-testid="admin-leads-page">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0A2523]/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#C87560]">Dr. Aditya Soni Clinic</p>
            <h1 className="font-serif text-2xl text-[#F5F3EC] leading-tight">Leads</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onExport}
              disabled={exporting}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#C87560] text-white px-4 h-10 text-[13px] font-medium hover:brightness-105 transition-[filter] disabled:opacity-60"
              data-testid="admin-export-csv-btn"
            >
              <DownloadSimple size={15} weight="bold" /> {exporting ? "Preparing…" : "Export CSV"}
            </button>
            <button
              onClick={load}
              className="grid place-items-center h-10 w-10 rounded-full border border-white/12 text-[#F5F3EC]/80 hover:bg-white/5 transition-colors"
              aria-label="Refresh"
              data-testid="admin-refresh-btn"
            >
              <ArrowClockwise size={17} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => {
                clearAdminToken();
                setAuthed(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-4 h-10 text-[13px] text-[#F5F3EC]/80 hover:bg-white/5 transition-colors"
              data-testid="admin-logout-btn"
            >
              <SignOut size={15} /> Lock
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 pt-7">
        <div className="flex flex-wrap gap-2" data-testid="admin-filters">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-2 text-[12.5px] uppercase tracking-wide transition-colors ${
                filter === s
                  ? "bg-[#F5F3EC] text-[#0A2523] font-medium"
                  : "border border-white/12 text-[#F5F3EC]/60 hover:bg-white/5"
              }`}
              data-testid={`admin-filter-${s}`}
            >
              {s} · {counts[s] ?? 0}
            </button>
          ))}
        </div>

        {err && (
          <p className="mt-5 text-[13px] text-[#FF9E8E]" data-testid="admin-error">
            {err}
          </p>
        )}

        <div className="mt-6 grid gap-4" data-testid="admin-leads-list">
          {shown.length === 0 ? (
            <p className="text-[#F5F3EC]/45 py-16 text-center" data-testid="admin-empty">
              No leads here yet.
            </p>
          ) : (
            shown.map((l) => <LeadCard key={l.id} lead={l} onStatus={onStatus} />)
          )}
        </div>
      </div>
    </div>
  );
}
