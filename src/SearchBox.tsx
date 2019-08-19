import React from "react";

interface Props {
  onChange: (value: string) => void;
}

export function SearchBox({ onChange }: Props) {
  const [value, setValue] = React.useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;

    setValue(value);
    onChange(value);
  }

  return <input value={value} onChange={handleChange} />;
}
