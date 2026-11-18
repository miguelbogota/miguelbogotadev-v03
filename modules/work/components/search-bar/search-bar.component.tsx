import './search-bar.styles.scss';

import { useRef } from 'react';

import { analyticsService } from '@/modules/analytics/services/analytics.service';

/** Props for the SearchBar component. */
export interface SearchBarProps {
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
export function SearchBar(props: SearchBarProps) {
  const {
    id = 'work-search',
    value,
    onChange,
    label = 'Search works',
    placeholder = 'Search projects…',
  } = props;
  const hasTrackedCurrentSearchRef = useRef(false);

  const inputId = `${id}-input`;

  /** Reports search usage once per non-empty entry without exposing the query. */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    if (nextValue && !hasTrackedCurrentSearchRef.current) {
      analyticsService.trackSearchUse();
      hasTrackedCurrentSearchRef.current = true;
    } else if (!nextValue) {
      hasTrackedCurrentSearchRef.current = false;
    }

    onChange(nextValue);
  };

  return (
    <div id={id} className="search-bar">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="search"
        role="searchbox"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
