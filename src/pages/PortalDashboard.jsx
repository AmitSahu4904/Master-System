import React from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Shield,
  Phone,
  CheckCircle2,
  XCircle,
  Sparkles,
  Settings,
  Lock,
  Utensils,
  Clock
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function PortalDashboard() {
  const { currentUser, isAdmin, canAccessSystem, getModuleRole } = useAuth()

  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  // Check module permissions
  const hasPms = canAccessSystem('pms')
  const pmsRole = getModuleRole('pms')
  const pmsPageCount = isAdmin() || currentUser?.page_access?.pms?.full_access ? 24 : (currentUser?.page_access?.pms?.pages || []).length

  const hasIms = canAccessSystem('ims')
  const imsRole = getModuleRole('ims')
  const imsPageCount = isAdmin() || currentUser?.page_access?.ims?.full_access ? 4 : (currentUser?.page_access?.ims?.pages || []).length

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-in fade-in duration-200 w-full min-w-0 max-w-full overflow-hidden">
      {/* Welcome Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full min-w-0">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug break-words">
            Welcome back, {currentUser?.full_name || currentUser?.username}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1 font-medium">
            H3 Operations Management Portal & Unified System Hub
          </p>
        </div>

        {isAdmin() && (
          <Link
            to="/global-settings"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-violet-200 transition-all w-full sm:w-auto shrink-0"
          >
            <Settings className="w-4 h-4" />
            <span>Manage System Users</span>
          </Link>
        )}
      </div>

      {/* User Profile Overview Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden w-full min-w-0">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-amber-100/40 via-violet-100/50 to-fuchsia-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col gap-4 sm:gap-5 w-full min-w-0">
          {/* Top Row: Avatar + Info */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full min-w-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-extrabold text-base sm:text-2xl lg:text-3xl flex items-center justify-center shadow-md shadow-violet-200 shrink-0">
              {getInitials(currentUser?.full_name || currentUser?.username)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full min-w-0">
                <h2 className="text-sm sm:text-xl lg:text-2xl font-extrabold text-slate-900 leading-tight truncate block">
                  {currentUser?.full_name || currentUser?.username}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shrink-0 ${
                    isAdmin()
                      ? 'bg-violet-100 text-violet-700 border border-violet-200'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  {currentUser?.role || 'user'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1 sm:mt-1.5 font-medium">
                <span className="truncate">@{currentUser?.username}</span>
                {currentUser?.mobile_number && (
                  <span className="flex items-center gap-1 text-slate-600 truncate">
                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                    {currentUser.mobile_number}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Module Access Summary Pills */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full min-w-0">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Authorized Systems:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
              <span
                className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-bold ${
                  hasPms
                    ? 'bg-amber-50 text-amber-800 border border-amber-200/80'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {hasPms ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" /> : <XCircle className="w-3.5 h-3.5 shrink-0" />}
                Order Rail PMS
              </span>

              <span
                className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-bold ${
                  hasIms
                    ? 'bg-violet-50 text-violet-700 border border-violet-200/80'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {hasIms ? <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 shrink-0" /> : <XCircle className="w-3.5 h-3.5 shrink-0" />}
                Crockery IMS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Modules Grid Section */}
      <div className="w-full min-w-0">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">System Modules</h3>
            <p className="text-xs text-slate-500">Core operational systems in H3 Epicura</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 w-full min-w-0">
          {/* Order Rail PMS */}
          <div
            className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-6 flex flex-col justify-between transition-all w-full min-w-0 ${
              hasPms
                ? 'bg-white border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-slate-50/80 border-slate-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shrink-0 ${
                    hasPms ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {hasPms ? 'Accessible' : 'Restricted'}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900">Order Rail PMS (H3MS)</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Active booking pipeline, 17 department task execution, Menu Finalize, AI Chatbot, Delay Alerts & WhatsApp hub.
              </p>

              <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Assigned Role:</span>
                  <span className="font-bold text-slate-900 uppercase">{hasPms ? pmsRole : 'None'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Page Access:</span>
                  <span className="font-bold text-slate-900">{hasPms ? `${pmsPageCount} / 24 Pages` : '0 Pages'}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100">
              {hasPms ? (
                <Link
                  to="/pms/dashboard"
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-200 group"
                >
                  <span>Launch Order Rail PMS</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform shrink-0" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all bg-slate-100 text-slate-400 cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>No Access</span>
                </button>
              )}
            </div>
          </div>

          {/* Crockery & Cutlery IMS */}
          <div
            className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-6 flex flex-col justify-between transition-all w-full min-w-0 ${
              hasIms
                ? 'bg-white border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-slate-50/80 border-slate-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-violet-500/10 text-violet-600 flex items-center justify-center font-bold shrink-0">
                  <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shrink-0 ${
                    hasIms ? 'bg-violet-100 text-violet-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {hasIms ? 'Accessible' : 'Restricted'}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900">Crockery & Cutlery IMS</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Stock tracking, purchase logs, party issue workflows, return reconciliations & inventory catalogue.
              </p>

              <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Assigned Role:</span>
                  <span className="font-bold text-slate-900 uppercase">{hasIms ? imsRole : 'None'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Page Access:</span>
                  <span className="font-bold text-slate-900">{hasIms ? `${imsPageCount} / 4 Pages` : '0 Pages'}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100">
              {hasIms ? (
                <Link
                  to="/crockery/dashboard"
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-200 group"
                >
                  <span>Launch Crockery IMS</span>
                  <Sparkles className="w-3.5 h-3.5 text-violet-200 group-hover:rotate-12 transition-transform shrink-0" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all bg-slate-100 text-slate-400 cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>No Access</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortalDashboard
