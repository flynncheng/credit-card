export default function HomeDivider() {
  return (
    <div className="flex relative py-2 items-center">
      <div className="flex-grow border-t border-gray-900/15" />
      <div className="flex-shrink mx-4">
        <div className="h-0.5 w-0.5 rounded-full bg-gray-900/15" />
      </div>
      <div className="flex-grow border-t border-gray-900/15" />
    </div>
  );
}
