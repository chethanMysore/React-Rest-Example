//React Dependencies
import React, { Component } from 'react';
import Reducer from '../Reducers';

//ImageEditor component
export class ImageEditor extends Component {
    constructor(props) {
        super(props);
        this.updateImage = this.updateImage.bind(this);
        this.close = this.close.bind(this);
        this.focus = this.focus.bind(this);

        this.state = {
            open: true
        }
    }

    //dispatches an action to call the put api call for updating the image
    updateImage() {
        var file = this.refs.inputRef.files[0];
        if (file) {
            let data = {
                imgId: this.props.row.DeviceName,
                imgFile: file
            };
            Reducer.imageStore.dispatch({
                type: 'UPDATE_IMAGE',
                data: data
            });
        }
        this.setState({ open: false });
        location.reload();
    }
    componentDidMount() {
        console.log('editor mounted');
    }
    focus() {

        this.refs.inputRef.focus();
    }
    close() {
        this.setState({ open: false });
        location.reload();
    }
    render() {
        const fadeIn = this.state.open ? 'in' : '';
        const display = this.state.open ? 'block' : 'none';

        return (
            <div className={`modal fade ${fadeIn}`} id='myModal' role='dialog' style={{ display }}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <input
                                ref='inputRef'
                                className={(this.props.editorClass || '') + ' form-control editor edit-text'}
                                style={{ display: 'inline', width: '50%' }}
                                type='file' />
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' onClick={() => this.updateImage()}>Save</button>
                            <button type='button' className='btn btn-default' onClick={() => this.close()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}