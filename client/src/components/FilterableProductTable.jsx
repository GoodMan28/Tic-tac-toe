import { useState } from "react";
import ProductTable from "./ProductTable"
import SearchBar from "./SearchBar"
export default function FilterableProductTable({products}) {
    let [filterText, setFilterText] = useState("");
    let [inStockOnly, setInStockOnly] = useState(false);
    
    return (
        <>
            <div> <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onStockOnlyChange={setInStockOnly}/> </div>
            <div> <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/> </div>
        </>
    )
}