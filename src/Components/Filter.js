//React Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Search Component
import { Search } from './Search';

//Reducers
import Reducer from '../Reducers';

//Filter Component - filters the data displayed on the page
export class Filter extends Component {
    constructor(props) {
        super(props);
       
        this.setFilter = this.setFilter.bind(this);

        Reducer.store.subscribe(this.setFilter);
        Reducer.store.subscribe(this.setFilter);
    }
    
    //Sets the filter type based on user input - by name, key or type
    setFilter(event) {
        
        if(event!=null){
        var filterName = event.target.value;
        let dataState = Reducer.store.getState();
        let allDevices = Reducer.getAllDevices(dataState.getDeviceReducer);
        let filterState = Reducer.store.getState();
        let allFilteredData = Reducer.getAllFilteredData(filterState.getFilterReducer);
        ReactDOM.render(<Search filterBy={filterName} allData={allDevices}/>, document.getElementById('search'));
        }
    }

    
    //Render method of Filter Component - renders a form to set the filters
    render() {
        return <form className="form-horizontal">

            <div className="form-group">
                <label className="col-sm-2">Filters</label>
            </div>
            <div className="form-group">
                <div className="row">
                    <label htmlFor="Filter" className="col-sm-4">Choose a filter</label>
                    <div className="col-sm-6">
                        <select onChange={this.setFilter} className="form-control">
                            <option className="form-control">Choose Filter</option>
                            <option value="name" className="form-control">Name</option>
                            <option value="key" className="form-control">Key</option>
                            <option value="type" className="form-control">Type</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2" id="search">

                    </div>
                </div>

            </div>
        </form>
    }
}