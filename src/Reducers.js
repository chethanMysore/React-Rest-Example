//React Dependencies
import React from 'react';
import { combineReducers, createStore } from 'redux';

//calls the POST api to add a new device
const postDevice = (postData) => {
    console.log(postData);
    fetch('http://localhost:3050', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(postData)
    }).then(res => {
        return res.json();
    }).then(data => {
        alert(data);
    });
}

//calls the POST api to add a new device image
const postImage = (imgData) => {
    console.log(imgData);
    let formData = new FormData();
    formData.append('file', imgData.imgFile.files[0]);
    fetch('http://localhost:3050/api/upload/' + imgData.imgId, {
        method: 'POST',
        body: formData
    }).then(res => {
        return res.json();
    }).then(data => {
        alert(data.data);
    })
}

//helper to Device Reducer - performs device related tasks
const deviceReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL_DEVICES':
            return ({
                DeviceId: action.data.DeviceId,
                DeviceName: action.data.DeviceName,
                DeviceType: action.data.DeviceType,
                DeviceKey: action.data.DeviceKey
            });
        case 'ADD_DEVICE':
            {
                postDevice(action.data);
                return state;
            }
    }
}

//helper to Image Reducer - performs image related tasks
const imageReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL_IMAGES':
            return ({
                imgId: action.data.imgId,
                imgUrl: action.data.imgUrl
            });
        case 'ADD_IMAGE':
            {
                postImage(action.data);
                return state;
            }
    }
}

//helper to Filter Reducer - performs filter related tasks
const filterReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILTER_DATA':
            return ({
                DeviceId: state.DeviceId,
                DeviceName: state.DeviceName,
                DeviceKey: state.DeviceKey,
                DeviceType: state.DeviceType
            });   
    }
}

//Device Reducer - handles action calls to data store and delegates device related tasks
const getDeviceReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_DEVICES':
            {
                state = action.data;
                return state;
            }
    
        default:
            return state;
    }
}

//Image Reducer - handles action calls to image store and delegates device related tasks
const getImageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_IMAGES':
            return [
                ...state,
                imageReducer(null, action)
            ];
        case 'ADD_IMAGE':
            return imageReducer(null, action);
        default:
            return state;
    }
}

//Filter Reducer - handles action calls to filter store and delegates device related tasks
const getFilterReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FILTER_DATA':
            {
                state=[];
                action.data.map(data=>{
                    state.push(filterReducer(data,action));
                });
                return state;
            }  
        default:
            return state;
    }
}

//Combination of reducers
const deviceApp = combineReducers({ getDeviceReducer });
const imageReducerApp = combineReducers({ getImageReducer });
const filterApp = combineReducers({ getFilterReducer });

//A Module that contains methods to invoke reducers and members to access stores
const Reducer = {
    getAllDevices: (devReducer) => {
        return devReducer;
    },
    getAllImages: (imgReducer) => {
        return imgReducer;
    },
    getAllFilteredData: (filtrReducer)=>{
        return filtrReducer;
    },
    store: createStore(deviceApp),
    imageStore: createStore(imageReducerApp),
    filter: createStore(filterApp)
};

//Exporting reducer module
module.exports = Reducer;