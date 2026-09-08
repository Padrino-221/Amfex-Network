"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/admin-auth";
import { adminApi, type AdminUser } from "@/lib/admin-api";
import { PageHeader, Button, Loading, Badge } from "@/components/admin/ui";
import { Plus, Pencil, Trash2, RefreshCw, Eye, EyeOff } from "lucide-react";

type FormState = { id?: string; full_name: string; email: string; password: string; role: "admin" | "editor" };

const emptyForm: FormState = { full_name: "", email: "", password: "", role: "editor" };

export default function UsersPage() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      setUsers(await adminApi.listUsers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    Promise.resolve().then(() => load());
  }, [isAdmin, load]);

  if (!isAdmin) {
    return (
      <div>
        <PageHeader title="Users" />
        <p className="text-sm text-charcoal/60">Only admins can manage users.</p>
      </div>
    );
  }

  function startEdit(u: AdminUser) {
    setForm({ id: u.id, full_name: u.full_name, email: u.email, password: "", role: u.role });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (form.id) {
        const body: Record<string, unknown> = { full_name: form.full_name, role: form.role };
        if (form.password) body.password = form.password;
        await adminApi.updateUser(form.id, body);
      } else {
        await adminApi.createUser({ full_name: form.full_name, email: form.email, password: form.password, role: form.role });
      }
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(u: AdminUser) {
    await adminApi.updateUser(u.id, { is_active: !u.is_active });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this user?")) return;
    await adminApi.deleteUser(id);
    await load();
  }

  const inputClass =
    "w-full px-3.5 py-2.5 text-sm text-charcoal bg-white border border-charcoal/20 rounded focus:outline-none focus:border-charcoal focus:ring-2 focus:ring-charcoal/10 placeholder:text-charcoal/75";

  return (
    <div>
      <PageHeader
        title="Users"
        description="Create, edit, activate/deactivate and reset passwords for admin accounts."
        actions={
          <Button variant="secondary" onClick={load}>
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        }
      />

      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">{error}</div>}

      <form onSubmit={submit} className="bg-white border border-charcoal/10 rounded-lg p-5 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-charcoal mb-1.5">Full name</label>
            <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} disabled={!!form.id} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1.5">{form.id ? "New password (leave blank to keep)" : "Password"}</label>
            <div className="relative">
              <input
                type={showFormPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inputClass} pr-10`}
                required={!form.id}
              />
              <button
                type="button"
                onClick={() => setShowFormPassword((v) => !v)}
                aria-label={showFormPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-charcoal/40 hover:text-charcoal"
              >
                {showFormPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1.5">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "admin" | "editor" })} className={inputClass}>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" disabled={busy} className="inline-flex items-center gap-2 bg-charcoal text-cream px-5 py-2.5 text-xs font-bold uppercase tracking-wide rounded hover:bg-charcoal-deep">
            <Plus className="w-3.5 h-3.5" /> {form.id ? "Update user" : "Create user"}
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm(emptyForm)} className="border border-charcoal/10 px-4 py-2.5 text-xs font-medium rounded hover:border-charcoal">
              Cancel
            </button>
          )}
        </div>
      </form>

      {!users && !error && <Loading />}
      {users && (
        <div className="bg-white border border-charcoal/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-charcoal text-cream text-left">
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Name</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Email</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Role</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-cream/60">
                    <td className="px-4 py-3 font-semibold text-charcoal">{u.full_name}</td>
                    <td className="px-4 py-3 text-charcoal/70">{u.email}</td>
                    <td className="px-4 py-3">
                      <Badge tone={u.role === "admin" ? "gold" : "neutral"}>{u.role}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {u.is_active ? <Badge tone="green">Active</Badge> : <Badge tone="red">Disabled</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => toggleActive(u)} className="inline-flex items-center gap-1.5 text-xs border border-charcoal/15 px-2.5 py-1.5 rounded hover:border-charcoal text-charcoal/70 hover:text-charcoal">
                          {u.is_active ? "Disable" : "Enable"}
                        </button>
                        <button onClick={() => startEdit(u)} className="inline-flex items-center gap-1.5 text-xs border border-charcoal/15 px-2.5 py-1.5 rounded hover:border-charcoal text-charcoal/70 hover:text-charcoal">
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => remove(u.id)} className="inline-flex items-center gap-1.5 text-xs text-red border border-red/20 px-2.5 py-1.5 rounded hover:bg-red/5">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
