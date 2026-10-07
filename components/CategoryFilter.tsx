import type { EventCategory } from "@/types/event";

interface Props {
  categories: EventCategory[];
  selected: EventCategory | "All";
  onSelect: (category: EventCategory | "All") => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect
}: Props) {
  return (
    <div className="category-row">
      <button
        className={`category-pill ${selected === "All" ? "selected" : ""}`}
        onClick={() => onSelect("All")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={`category-pill ${
            selected === category ? "selected" : ""
          }`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
