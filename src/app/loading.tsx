const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-sand-50 px-6">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="size-12 animate-spin rounded-full border-4 border-sand-200 border-t-brand-500" />
      <p className="text-sm font-semibold text-sand-700">Đang tải...</p>
    </div>
  </div>
);

export default Loading;
