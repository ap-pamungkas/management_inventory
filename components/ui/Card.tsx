interface CardProps {
  children: React.ReactNode;
  title: string;
  additionalButton?: React.ReactNode;
}

export default function Card({ children, title, additionalButton }: CardProps) {
  return (
    <div className="card  shadow px-4 py-4 gap-2 ">
      <div className="card-header flex items-center justify-between outline-boo">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex gap-2">{additionalButton}</div>
      </div>
      <hr className="mt-4" />
      <div className="card-body mt-4">{children}</div>
    </div>
  );
}
