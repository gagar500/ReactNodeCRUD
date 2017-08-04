import React,{Component} from 'react';
import {Table} from 'semantic-ui-react';

class ProductView extends Component{

    render(){
        let products = this.props.products;
        products =products.map((product)=>
            <Table.Row key={product._id}>
               <Table.Cell>{product.productName}</Table.Cell>
               <Table.Cell>{product.cost}</Table.Cell>
               <Table.Cell>{product.currency}</Table.Cell>
               <Table.Cell>{product.details}</Table.Cell>
            </Table.Row> 
        );

        products = [...products].reverse();

        return(<Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ProductName</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Currency</Table.HeaderCell>
            <Table.HeaderCell>Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products}
        </Table.Body>
      </Table>);
    }
}

export default ProductView;