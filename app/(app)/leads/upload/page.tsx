"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadMobileNumbersPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [numbers, setNumbers] = useState<string[]>([]);
  const [rawText, setRawText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ created: number; total: number } | null>(null);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }

  function parseNumbers(text: string): string[] {
    return text.split(/[\n,;\s]+/).map(s => s.replace(/\D/g, "").trim()).filter(s => s.length >= 10);
  }

  function handleTextChange(text: string) {
    setRawText(text);
    setNumbers(parseNumbers(text));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setRawText(text);
      setNumbers(parseNumbers(text));
    };
    reader.readAsText(file);
  }

  async function handleUpload() {
    if (numbers.length === 0) { showToast("err", "No valid numbers found"); return; }
    setUploading(true);
    try {
      const res = await fetch("/api/leads/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numbers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResult(data);
      showToast("ok", `${data.created} leads created successfully`);
    } catch (e: any) { showToast("err", e.message); }
    finally { setUploading(false); }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <div className={`fixed right-4 top-4 z-[200] flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {toast.text}
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#1a3a6b]">📤 Upload Mobile Numbers</h1>
          <div className="flex gap-2">
            <Link href="/leads/add" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">📋 Fill Form</Link>
            <Link href="/leads/walkin" className="bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium">🚶 Walk-in Customer</Link>
            <Link href="/leads/upload" className="bg-amber-500 text-white px-4 py-2 rounded text-sm font-medium">📤 Upload Mobile Numbers</Link>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="font-semibold text-slate-700 mb-2">Method 1: Upload CSV / Text File</h2>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition" onClick={() => fileRef.current?.click()}>
              <p className="text-slate-500 text-sm">Click to select a CSV or TXT file</p>
              <p className="text-xs text-slate-400 mt-1">Each row or comma-separated value should be a mobile number</p>
              <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleFile} />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <h2 className="font-semibold text-slate-700 mb-2">Method 2: Paste Numbers</h2>
            <textarea
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm h-32 font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder={"Paste mobile numbers here, one per line or comma separated:\n9876543210\n9876543211, 9876543212\n..."}
              value={rawText}
              onChange={e => handleTextChange(e.target.value)}
            />
          </div>

          {numbers.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-sm text-blue-700 font-medium">
                ✅ {numbers.length} valid mobile numbers detected
              </p>
              <div className="mt-2 max-h-32 overflow-y-auto">
                <p className="text-xs text-blue-600 font-mono">{numbers.slice(0, 20).join(", ")}{numbers.length > 20 ? ` ... and ${numbers.length - 20} more` : ""}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="bg-emerald-50 border border-emerald-200 rounded p-4">
              <p className="text-sm text-emerald-700 font-semibold">Upload Complete!</p>
              <p className="text-sm text-emerald-600 mt-1">{result.created} of {result.total} numbers added as leads (duplicates skipped)</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={handleUpload} disabled={uploading || numbers.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2">
              {uploading ? "Uploading..." : `📤 Upload ${numbers.length > 0 ? `(${numbers.length} numbers)` : ""}`}
            </button>
            {result && (
              <button onClick={() => router.push("/leads")} className="border border-slate-300 text-slate-600 hover:bg-slate-50 px-6 py-2.5 rounded-lg text-sm font-medium">
                ← View Leads
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}