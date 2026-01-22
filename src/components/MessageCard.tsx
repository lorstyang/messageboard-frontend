export function MessageCard({ sender, content }: any) {
  return (
    <div className="group rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 p-5 backdrop-blur-sm hover:border-slate-600/50 hover:from-slate-800/60 hover:to-slate-900/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-mono font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
          {sender}
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="text-slate-200 leading-relaxed text-base break-words">
        {content}
      </div>
    </div>
  )
}
