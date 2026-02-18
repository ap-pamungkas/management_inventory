interface TableProps {
    children: React.ReactNode;
}


export default function Table({ children }: TableProps) {
    return (
        <div className="table-responsive overflow-x-auto ">
            <table className="table border-collapse w-full table-bordered">
                {children}
            </table>
          </div>
    );
}
