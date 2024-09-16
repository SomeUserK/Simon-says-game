export default function Simon({
  color,
  onClick,
  isActive
}: {
  color: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <>
      <button
        className={`simon bg-${color} ${isActive ? 'simon_active' : ''}`}
        onClick={onClick}
      ></button>
    </>
  );
}
