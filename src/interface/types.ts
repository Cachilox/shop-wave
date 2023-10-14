import { ChangeEvent } from "react";

export interface InputComponentProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectComponentProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; label: string }[] | undefined;
}

export interface FormData {
  [key: string]: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
  _id: string;
}
