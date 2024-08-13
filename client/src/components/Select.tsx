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
      <label className="mb-2 block font-semibold">
        {title}
        <select
          {...props}
          ref={ref}
          className="input block w-full cursor-pointer rounded-lg border-none p-2.5 text-sm"
        >
          {colorOptions.map(({ value, option, colorClass }) => (
            <option
              value={value}
              key={option}
              className={`bg-gray-300 font-medium ${colorClass}`}
            >
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  },
);
