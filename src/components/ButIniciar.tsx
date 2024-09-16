export default function ButIniciar({ onClick }: { onClick: () => void }) {
  return (
    <button className="butIniciar" onClick={onClick}>
      Iniciar
    </button>
  );
}
