//React Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Device Entity Component
import { DeviceEntity } from './DeviceEntity';

//Reducers
import Reducer from '../Reducers';

//Bootstrap Dependencies
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

//DeviceList Component
export class DeviceList extends Component {
    constructor(props) {
        super(props);
        Reducer.store.subscribe(this.render);
        Reducer.imageStore.subscribe(this.render);
        Reducer.filter.subscribe(this.render);
        this.imageFormatter = this.imageFormatter.bind(this);
    }

    //Event which is called when the component mounts on the page - GET Devices is called here
    componentDidMount() {
        fetch('http://localhost:3050')
            .then(response => {
                return response.json();
            }).then(data => {
                Reducer.store.dispatch({
                        type: 'SET_ALL_DEVICES',
                        data: data
                    });
                data.map(device => {
                    fetch('http://localhost:3050/api/download/' + device.DeviceName, { headers: { 'response-type': 'blob' } })
                        .then(res => {
                            return res.blob();
                        }).then(data => {

                            let imgData = {
                                imgId: device.DeviceName,
                                imgUrl: window.URL.createObjectURL(data)
                            };

                            Reducer.imageStore.dispatch({
                                type: 'SET_ALL_IMAGES',
                                data: imgData
                            })
                        });
                    
                });
            });
    }

    //A Formatter for bootstrap table cell - for displaying images
    imageFormatter(cell, row) {
        return (<pre><img src={cell} alt='No Preview Available' width='80' height='60' /><img src='../public/download.ico' alt='download' height='25' width='25' onClick={() => this.saveAs(cell, row.DeviceName)} /></pre>);
    }

    //Creates a download link for the image
    saveAs(dataURL, fileName) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        let url = dataURL;
        a.href = url;
        a.download = fileName + '.jpg';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    //Render method of DeviceList - renders the table of devices
    render() {
        let state = Reducer.store.getState();
        let imgState = Reducer.imageStore.getState();
        let filterState = Reducer.filter.getState();
        var allFilteredData = Reducer.getAllFilteredData(filterState.getFilterReducer);
        var deviceData = [];
       
        var allDevices = Reducer.getAllDevices(state.getDeviceReducer);
        var allImages = Reducer.getAllImages(imgState.getImageReducer);
        if (allFilteredData != null && allFilteredData.length != 0) {        
            allFilteredData.map(device => {
                let devImg = allImages.filter(img => img.imgId == device.DeviceName);
                deviceData.push({
                    DeviceId: device.DeviceId,
                    DeviceName: device.DeviceName,
                    DeviceKey: device.DeviceKey,
                    DeviceType: device.DeviceType,
                    DeviceImage: devImg[0] != null ? devImg[0].imgUrl : ""
                });
            });
        }
        else {
            if (allDevices != null && allDevices.length != 0) {
                allDevices.map(device => {
                    let devImg = allImages.filter(img => img.imgId == device.DeviceName);
                    deviceData.push({
                        DeviceId: device.DeviceId,
                        DeviceName: device.DeviceName,
                        DeviceKey: device.DeviceKey,
                        DeviceType: device.DeviceType,
                        DeviceImage: devImg[0] != null ? devImg[0].imgUrl : ""
                    });
                });
            }
        }
        const options = {
            page: 1,//default page to display
            sizePerPageList: [{//dropdown for selecting the page size
                text: '3', value: 3
            },
            {
                text: '6', value: 6
            },
            {
                text: '10', value: 10
            },
            {
                text: 'ALL', value: deviceData.length
            }],
            sizePerPage: 3,//initial page size
            pageStartIndex: 1,//starting index of a page
            paginationSize: 3,//number of records displayed in each page
            prePage: 'Prev',//Alias for previous page
            nextPage: 'Next',//Alias for next page
            firstPage: 'First',//Alias for first page
            lastPage: 'Last',//Alias for last page
            paginationPosition: 'bottom',//position of page navigation menu
            noDataText: 'No Record Found'//default text to be displayed when no data available
        } 
        return (      
            <div>
                <BootstrapTable data={deviceData} options={options} pagination tableStyle={{ border: '#0c68fc 1px solid', backgroundColor: '#61d6f9' }}>
                    <TableHeaderColumn isKey dataField='DeviceId' headerAlign='left' width='90' height='50' dataAlign='center' dataSort display='block'>Device Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='DeviceName' headerAlign='left' width='115' height='50' dataAlign='center' dataSort display='block' filter={{ type: 'TextFilter', delay: 1000 }}>Device Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='DeviceKey' headerAlign='left' width='110' height='50' dataAlign='center' display='block'>Device Key</TableHeaderColumn>
                    <TableHeaderColumn dataField='DeviceType' headerAlign='left' width='110' height='50' dataAlign='center' dataSort display='block'>Device Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='DeviceImage' headerAlign='left' width='140' height='50' dataFormat={this.imageFormatter} display='block'>Device Image</TableHeaderColumn>
                </BootstrapTable></div>);
    }
}