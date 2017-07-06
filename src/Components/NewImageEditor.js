import React,{Component} from 'react';

export class NewImageEditor extends Component{
    getFieldValue(){
        return this.refs.newImage.files[0];
    }
    render(){
        return(
            <input type='file' className={this.props.editorClass} ref='newImage' />
        );
    }
}