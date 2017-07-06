//React Dependencies
import React from 'react';
import { combineReducers, createStore } from 'redux';
//import ToastrMapper from './ToastrMapper';
//calls the POST api to add a new device
const postDevice = (postData) => {

    fetch('http://localhost:3050', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(postData)
    }).then(res => {
        return res.json();
    }).then(data => {
        //alert(data);
        //ToastrMapper.mapToast(data);
        Reducer.message.dispatch({ type: 'ADD_MESSAGE', message: data });
    });
}

const updateDevice = (updateData) => {
    fetch(`http://localhost:3050/${updateData.DeviceId}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(updateData)
    }).then(res => {
        return res.json();
    }).then(data => {
        alert(data);
    })
}

const deleteDevice = (devId) => {
    fetch('http://localhost:3050/del/' + devId, {
        method: 'POST'
    }).then(res => {
        return res.json();
    }).then(data => {
        alert(data);
    })
}
//calls the POST api to add a new device image
const postImage = (imgData) => {

    let formData = new FormData();
    formData.append('file', imgData.imgFile);
    fetch('http://localhost:3050/api/upload/' + imgData.imgId, {
        method: 'POST',
        body: formData
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.error_code == 0) {
            alert("Image uploaded successfully");
        }
        else {
            alert("Image upload failed!");
        }
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
                var res = postDevice(action.data);
                return state;
            }
        case 'UPDATE_DEVICE':
            {
                var data = {
                    DeviceId: action.data.DeviceId,
                    DeviceName: action.data.DeviceName,
                    DeviceType: action.data.DeviceType,
                    DeviceKey: action.data.DeviceKey
                }
                updateDevice(data);
                return state;
            }
        case 'DELETE_DEVICE':
            {
                deleteDevice(action.data);
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
        case 'UPDATE_IMAGE':
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

const toastrReducer = (state, action) => {
    switch (action.type) {
        case 'GET_STATE':
            return state;
        case 'SET_STATE':
            return ({ render: true });
        case 'RESET_STATE':
            return ({ render: false });
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
        case 'ADD_DEVICE':
            {
                return deviceReducer(null, action);
            }
        case 'UPDATE_DEVICE':
            {
                return deviceReducer(state, action);
            }
        case 'DELETE_DEVICE':
            {
                return deviceReducer(state, action);
            }
        default:
            return state;
    }
}

//Image Reducer - handles action calls to image store and delegates device related tasks
const getImageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_IMAGES':
            {
                if (state != null) {
                    return [
                        ...state,
                        imageReducer(null, action)
                    ];
                }
                else{
                    state=[];
                    return [
                        ...state,
                        imageReducer(null, action)
                    ];
                }
            }
        case 'ADD_IMAGE':
            return imageReducer(null, action);
        case 'UPDATE_IMAGE':
            return imageReducer(state, action);
        default:
            return state;
    }
}

//Filter Reducer - handles action calls to filter store and delegates device related tasks
const getFilterReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FILTER_DATA':
            {
                state = [];
                action.data.map(data => {
                    state.push(filterReducer(data, action));
                });
                return state;
            }
        default:
            return state;
    }
}

const getToastrReducer = (state = { render: false }, action) => {
    switch (action.type) {
        case 'GET_STATE':
            return toastrReducer(state, action);
        case 'SET_STATE':
            return toastrReducer(state, action);
        case 'RESET_STATE':
            return toastrReducer(state, action);
        default:
            return state;
    }
}

const getMessageReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_MESSAGES':
            return state;
        case 'ADD_MESSAGE':
            {
                state.push(action.message);
                return state;
            }
        case 'REMOVE_MESSAGE':
            {
                state.pop();
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
const toastrApp = combineReducers({ getToastrReducer });
const msgApp = combineReducers({ getMessageReducer });

//A Module that contains methods to invoke reducers and members to access stores
const Reducer = {
    getAllDevices: (devReducer) => {
        return devReducer;
    },
    getAllImages: (imgReducer) => {
        return imgReducer;
    },
    getAllFilteredData: (filtrReducer) => {
        return filtrReducer;
    },
    getToastrState: (toastrReducer) => {
        return toastrReducer;
    },
    getMessages: (msgReducer) => {
        return msgReducer;
    },
    store: createStore(deviceApp),
    imageStore: createStore(imageReducerApp),
    filter: createStore(filterApp),
    toastr: createStore(toastrApp),
    message: createStore(msgApp)
};

//Exporting reducer module
module.exports = Reducer;