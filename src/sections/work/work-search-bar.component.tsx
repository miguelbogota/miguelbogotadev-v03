import './work-search-bar.styles.scss';

export interface WorkSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function WorkSearchBar(props: WorkSearchBarProps) {
  const { value, onChange, label = 'Search works', placeholder = 'Search projects…' } = props;

  const inputId = 'work-search';

  return (
    <div className="work-search-bar" id="work-search-bar">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="search"
        role="searchbox"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
