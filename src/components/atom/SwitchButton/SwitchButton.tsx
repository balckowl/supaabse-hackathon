type Props = {
  isChecked?: boolean;
  handleToggle: () => void;
};

export default function SwitchButton({ isChecked = false, handleToggle }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={`relative h-7 w-14 rounded-full p-1 transition-colors duration-200 ${isChecked ? "bg-black" : "bg-black"}
      `}
    >
      <span
        className={`block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${isChecked ? "translate-x-7" : "translate-x-0"}
        `}
      />
    </button>
  );
};
