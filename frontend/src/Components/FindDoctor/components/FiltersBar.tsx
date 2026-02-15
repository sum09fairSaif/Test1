import { insuranceOptions, specialtyOptions } from "../data/options";

type Props = {
  zip: string;
  insurance: string;
  specialty: string;
  onZipChange: (v: string) => void;
  onInsuranceChange: (v: string) => void;
  onSpecialtyChange: (v: string) => void;
  onSearch: () => void;
};

export default function FiltersBar({
  zip,
  insurance,
  specialty,
  onZipChange,
  onInsuranceChange,
  onSpecialtyChange,
  onSearch,
}: Props) {
  return (
    <div className="card pad">
      <input
        placeholder="Search your symptoms..."
        className="fd-input"
        aria-label="Search symptoms"
      />

      <div className="fd-filters-grid">
        <input
          type="text"
          value={zip}
          onChange={(e) => onZipChange(e.target.value)}
          placeholder="Location: Enter ZIP code (e.g., 10001)"
          inputMode="numeric"
          autoComplete="postal-code"
          className="fd-input"
          aria-label="ZIP code"
        />

        <select
          value={insurance}
          onChange={(e) => onInsuranceChange(e.target.value)}
          className="fd-input"
          aria-label="Insurance"
        >
          <option value="">Insurance: Select insurance</option>
          {insuranceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={specialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          className="fd-input"
          aria-label="Specialty"
        >
          <option value="">Specialty: Select specialty</option>
          {specialtyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button onClick={onSearch} className="fd-primary-btn">
          Find a Doctor Nearby -&gt;
        </button>
      </div>
    </div>
  );
}
