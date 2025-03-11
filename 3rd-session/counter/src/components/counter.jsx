export function Counter({ setLevel, level }) {
  return (
    <div className="counter">
      <button
        className="button decrement"
        disabled={level == 0}
        onClick={() => {
          setLevel((level) => level - 10);
        }}
      >
        -10%
      </button>
      <button
        className="button increment"
        disabled={level == 100}
        onClick={() => {
          setLevel((level) => level + 10);
        }}
      >
        +10%
      </button>
    </div>
  );
}
