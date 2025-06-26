export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Dynamic Island simulation */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-3">
        <div className="dynamic-island">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        </div>
      </div>
      {children}
    </>
  );
}