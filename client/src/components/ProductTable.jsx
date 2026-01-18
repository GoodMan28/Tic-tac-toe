function ProductRow({product}) {
    const name = product.stocked ? product.name : <span style={{color: "red"}}>{product.name}</span>;
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

function ProductCategoryRow({category}) {
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    )
}

export default function ProductTable({products, filterText, inStockOnly}) {
    const rows = [];
    let lastRow = null;
    products.forEach((product) => {
        if(inStockOnly && !product.stocked) {
            return;
        }   
        if(product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            console.log(`not found ${product.name.toLowerCase().indexOf(filterText.toLowerCase())}`);
            return;
        }
        console.log(`found ${product.name.toLowerCase().indexOf(filterText.toLowerCase())}`);
        if(product.category !== lastRow) {
            rows.push(<ProductCategoryRow category={product.category}/>)
        }
        rows.push(<ProductRow product={product}/>)
        lastRow = product.category;
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    )
}