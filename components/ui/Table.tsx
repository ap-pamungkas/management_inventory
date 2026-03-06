interface TableProps {
  children: React.ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <div className="table-responsive bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}
