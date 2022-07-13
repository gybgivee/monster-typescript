import "./search-box.styles.css";
const SearchBox = (props)=>{
    const {className,placeholder,onSearchChangeHandler} = props;
    return(
        <input 
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onSearchChangeHandler}/>
        )
}

export default SearchBox;