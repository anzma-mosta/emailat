export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/80 dark:bg-[#0f1123]/80 backdrop-blur-sm">
      <div className="relative">
        <div className="absolute -inset-6 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <div
          className="h-16 w-16 rounded-full animate-spin"
          style={{
            background: 'conic-gradient(#000c7c, #4563a1, #93c5fd, #000c7c)',
          }}
        />
        <div className="absolute inset-2 rounded-full bg-white/80 dark:bg-[#0f1123]/80" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary animate-pulse" />
      </div>
    </div>
  );
}
