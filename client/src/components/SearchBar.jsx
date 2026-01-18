import { useRef } from "react";

export default function SearchBar({filterText, inStockOnly, onFilterTextChange, onStockOnlyChange}) {
    const inputRef = useRef();
    function handleSubmit() {
        console.log(inputRef.current.value);
        
    }
    
    return (
        <>
            <form>
                <input type="text" placeholder="Search..." onChange={(e) => {
                    onFilterTextChange(e.target.value);
                    handleSubmit()
                }} ref={inputRef}/>
                <p>
                    <input type="checkbox" checked={inStockOnly} onChange={(e) => {
                        onStockOnlyChange(e.target.checked)
                    }}/> Only show products in stock
                </p>
            </form>
        </>
    )
}