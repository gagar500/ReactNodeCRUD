import React,{Component} from 'react';
import {Button,Modal} from 'semantic-ui-react';


import FormProduct from '../FormProduct/FormProduct';
class ModelProduct extends Component{

    render(){
retun(

         <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormProduct
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            productID={this.props.productID}
          />
        </Modal.Content>
      </Modal>

);
    }
}

export default ModelProduct;