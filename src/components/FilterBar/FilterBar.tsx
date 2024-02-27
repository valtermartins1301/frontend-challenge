import React, { useState } from 'react';
import { default as S } from './styles.module.css';
import { Typography } from '../Typography/Typography';

interface ButtonProps {
  defaultFilter: string;
  onChange?: (value: string) => void;
  options: string[];
}

export const FilterBar: React.FC<ButtonProps> = ({ onChange, options, defaultFilter }) => {
  const [filterValue, setFilterValue] = useState(defaultFilter);
  const isDisabled = filterValue === defaultFilter;
  const handleChange = (value: string) => {
    setFilterValue(value);
    onChange?.(value);
  };

  return (
    <nav className={S.filterBar}>
      <div className={S.filterContainer}>
        <div className={S.filter}>
          <Typography variant="label" htmlFor="selectOptions">
            Filter By:
          </Typography>
          <select
            className={S.filterSelect}
            id="selectOptions"
            value={filterValue}
            onChange={(event) => handleChange(event.target.value)}
          >
            <option value={defaultFilter}>{defaultFilter}</option>
            {options.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`${S.filterButton} ${isDisabled && S.disabled}`}
          onClick={() => handleChange?.(defaultFilter)}
        >
          CLEAR ALL
        </button>
      </div>
    </nav>
  );
};
