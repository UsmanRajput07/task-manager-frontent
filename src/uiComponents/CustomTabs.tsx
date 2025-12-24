export default function CustomTabs({
  tabs,
  active,
  setActive,
}: {
  tabs: string[];
  active: string;
  setActive: (tab: string) => void;
}) {
  return (
    <ul className="flex items-center gap-10 py-5 px-4 md:text-lg text-base flex-wrap">
      {tabs.map((tab) => (
        <li
          key={tab}
          className={`text-gray-400 font-semibold cursor-pointer ${
            active === tab ? "text-gray-600 border-b-2 border-gray-600" : ""
          }`}
          onClick={() => setActive(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
}
