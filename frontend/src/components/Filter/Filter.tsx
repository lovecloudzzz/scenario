import React from 'react';
import {FilterAcceptButton} from "./FilterAcceptButton/FilterAcceptButton";
import {FilterYears} from "./FilterYears/FilterYears";
import {FilterTagsArray} from "./FilterTags/FilterTagsArray";

const Filter = () => {
    return (
        <div>
            <FilterAcceptButton/>
            <FilterYears/>
            <FilterTagsArray/>
        </div>
    );
};

export default Filter;