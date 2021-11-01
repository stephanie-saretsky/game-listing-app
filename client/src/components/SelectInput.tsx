import React from 'react';
import Select from 'react-select';

interface SelectWithTagsProps {
    name: string;
    inputValue: any;
    onChange: any;
    options: any;
}

const SelectWithTags: React.FC<SelectWithTagsProps> = (props) => {
    const { inputValue, options, name } = props;

    const tagOptions = Array.isArray(inputValue)
        ? inputValue
        : typeof inputValue === 'string'
            ? inputValue.split(',')
            : [];

    const filterValue = tagOptions.map((v) => {
        return { label: v, value: v };
    });

    const onChange = (filter: any) => {
        const newInputValue = filter ? filter.map((f) => f.value) : [];

        return props.onChange(name, newInputValue);
    };

    return <Select
        className="multi-dropdown w-5/6"
        isMulti={true}
        options={options}
        onChange={onChange}
        value={filterValue}
    />;
};

export default SelectWithTags;
