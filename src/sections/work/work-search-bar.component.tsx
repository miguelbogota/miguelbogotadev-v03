import './work-search-bar.styles.scss';

/**
 * Props for the WorkSearchBar component.
 */
export interface WorkSearchBarProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

/**
 * Search bar component for filtering work projects.
 * Provides a text input with proper accessibility and styling.
 */
export function WorkSearchBar(props: WorkSearchBarProps) {
  const {
    id = 'work-search',
    value,
    onChange,
    label = 'Search works',
    placeholder = 'Search projects…',
  } = props;

  const inputId = `${id}-input`;

  return (
    <div id={id} className="work-search-bar">
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
