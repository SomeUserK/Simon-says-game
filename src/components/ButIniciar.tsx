export default function ButIniciar({ onClick }: { onClick: () => void }) {
  return (
    <div className="butIniciarBg">
      <button className="butIniciar" onClick={onClick}>
        <span>Iniciar</span>
      </button>
    </div>
  );
}
