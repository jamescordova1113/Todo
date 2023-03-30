import { Filter } from "../../types";

interface IFilters {
  filters: Filter;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Filters = ({ filters, handleFilterChange }: IFilters) => {
  const { description, priority } = filters;
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleFilterChange}
        />
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <label>Priority:</label>
        <input
          type="number"
          name="priority"
          value={priority}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};
