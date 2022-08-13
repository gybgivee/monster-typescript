import { ChangeEventHandler } from "react";
import "./search-box.styles.css";
//placeholder?: string; => this is telling the type could string or null
//another way : onSearchChangeHandler :(event:changeEvent<HTMLInputElement>)=>void;
type SearchBoxProps ={
    className: string;
    placeholder?: string;
    onSearchChangeHandler:ChangeEventHandler<HTMLInputElement>;

}
const SearchBox = ({className,placeholder,onSearchChangeHandler}:SearchBoxProps)=>{
    return(
        <input 
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onSearchChangeHandler}/>
        )
}

export default SearchBox;