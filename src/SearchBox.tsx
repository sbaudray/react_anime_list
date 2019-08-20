import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: Props) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
