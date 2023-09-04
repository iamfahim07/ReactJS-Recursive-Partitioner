export default function Button({ handleClick, children }) {
  return (
    <button
      // className="p-1 bg-gray-300 border border-gray-600"
      className="font-bold bg-gray-300 border border-gray-600 py-0 px-0.5"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
