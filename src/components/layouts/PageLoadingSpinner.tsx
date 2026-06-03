type PageLoadingSpinnerProps = {
  className?: string;
};

const PageLoadingSpinner = ({ className }: PageLoadingSpinnerProps) => (
  <div
    className={`flex items-center justify-center px-6 ${
      className ?? 'min-h-screen bg-sand-50'
    }`}
    role="status"
    aria-live="polite"
    aria-label="Đang tải trang"
  >
    <div className="size-14 animate-spin rounded-full border-4 border-sand-200 border-t-brand-500" />
  </div>
);

export { PageLoadingSpinner };
