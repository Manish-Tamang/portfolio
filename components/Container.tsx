export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-2 py-2">
      {children}
    </div>
  );
}