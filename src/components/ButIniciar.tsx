export default function ButReintentar({ onClick }: { onClick: () => void }) {
  return (
    <div className="butIniciarBg">
      <button className="butIniciar" onClick={onClick}>
        <span>Reintentar</span>
      </button>
    </div>
  );
}
