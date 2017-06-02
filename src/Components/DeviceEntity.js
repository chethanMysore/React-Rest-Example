//React Dependencies
import React, { Component } from 'react';
import Redux from 'redux';

//DeviceEntity Component - used to render a single record
export class DeviceEntity extends Component {
    constructor(props) {
        super(props);
    }

    //Render method of DeviceEntity - renders a single record
    render() {
        return (
            <div className="row" key={this.props.device.deviceId}>
                <div className="col-sm-1">{this.props.device.DeviceId}</div>
                <div className="col-sm-2">{this.props.device.DeviceName}</div>
                <div className="col-sm-2">{this.props.device.DeviceType}</div>
                <div className="col-sm-1">{this.props.device.DeviceKey}</div>
            </div>
        );
    }
}