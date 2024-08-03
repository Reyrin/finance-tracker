import { FC, forwardRef } from "react";

interface Props {
  title: string;
  colorOptions: {
    value: number | string;
    option: string;
    colorClass: string;
  }[];
}

export const Select: FC<Props> = forwardRef<HTMLSelectElement, Props>(
  ({ title, colorOptions, ...props }, ref) => {
    return (
      <label className="mb-2 block font-medium">
        {title}
        <select
          {...props}
          ref={ref}
          className="block w-full rounded-lg bg-gray-700  p-2.5 text-sm text-white placeholder-gray-400"
        >
          {colorOptions.map(({ value, option, colorClass }) => (
            <option value={value} key={option} className={colorClass}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  },
);
