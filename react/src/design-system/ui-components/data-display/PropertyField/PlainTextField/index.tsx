import React from 'react';
import { PropertyFieldColumn } from '../shared';

export interface TextFieldProps {
  label: string;
  value: React.ReactNode;
  color?: string;
}

export const PlainTextField: React.FC<TextFieldProps> = ({ 
  label, 
  value, 
  color,
}) => (
  <PropertyFieldColumn {...{ label, content: value, color }} />
); 