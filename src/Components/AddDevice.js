//React Dependencies
import React, { Component } from 'react';

//Redux Reducer
import Reducer from '../Reducers';

//Add Device Component to add new device to database
export class AddDevice extends Component {
    constructor(props) {
        super(props);
        Reducer.store.subscribe(this.render);
    }

    //Render method of AddDevice used to render a form to get details of the device
    render() {
        return (
            <form className="form-horizontal">

                <div className="form-group">
                    <label htmlFor="DeviceName" className="col-sm-2">Device Name</label>
                    <div className="col-sm-4"><input type="text" required className="form-control" ref={node => { this.name = node }} /></div>
                </div>
                <div className="form-group">
                    <label htmlFor="DeviceKey" className="col-sm-2">Device Key</label>
                    <div className="col-sm-4"><input type="text" required className="form-control" ref={node => { this.key = node }} /></div>
                </div>
                <div className="form-group">
                    <label htmlFor="DeviceType" className="col-sm-2">Device Type</label>
                    <div className="col-sm-4"><input type="text" required className="form-control" ref={node => { this.type = node }} /></div>
                </div>
                <div className="form-group">
                    <label htmlFor="DeviceImage" className="col-sm-2">Upload an Image</label>
                    <div className="col-sm-4"><input type="file" required className="form-control" ref={node => { this.file = node }} /></div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-3" ><input type="button" className="btn btn-primary" onClick={() => {
                        let formData = {

                            "DeviceName": this.name.value,
                            "DeviceKey": this.key.value,
                            "DeviceType": this.type.value
                        };
                        let imgData = {
                            "imgId": this.name.value,
                            "imgFile": this.file.files[0]
                        }
                        Reducer.store.dispatch({
                            type: 'ADD_DEVICE',
                            data: formData
                        });
                       
                        /*Reducer.store.dispatch({
                            type: 'ADD_DEVICE',
                            data: formData
                        });*/
                        Reducer.imageStore.dispatch({
                            type: 'ADD_IMAGE',
                            data: imgData
                        });
                    }} value="ADD" /></div>
                </div>
            </form>
        );
    }
}