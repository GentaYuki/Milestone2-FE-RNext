import React from "react";
import { useField } from "formik";

interface InputFieldProperty {
    label : string;
    name : string;
    type? : string;
    option? : {label: string ; value: string}[];
    placeholder? : string;
}

const InputField: React.FC<InputFieldProperty> = ({ label, option,...props }) => {
    const [field, meta] = useField(props.name);
  
    return (
      <div className="mb-4">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>

        {option && option.length > 0 ?(
          <select
            {...field}
            id={props.name}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              meta.touched && meta.error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            >
              <option value="">Select{label.toLowerCase()}</option>
              {option.map((option) => (
              <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
            </select>
        ) : (
        <input
          {...field}
          {...props}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            meta.touched && meta.error
              ? 'border-red-500 focus:ring-red-300'
              : 'border-gray-300 focus:ring-blue-300'
          }`}
        />
        )}
        
        {meta.touched && meta.error && (
          <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        )}
      </div>
    );
  };

  export default InputField;