import ReactDOM from 'react-dom';
import Reducer from './Reducers';
import {Toastr} from './Components/Toastr';

const createToast = (msg) =>{
     Reducer.toastr.dispatch({
                type: 'SET_STATE'
            });
        
        setTimeout(function () {
           ReactDOM.render(<Toastr message={msg} render={true} className={fadeOut} />, document.getElementById('toastr'));
        }, 3000);
        setTimeout(function () {
            Reducer.toastr.dispatch({ type: 'RESET_STATE' });
            //this.forceUpdate();
             ReactDOM.render(<Toastr message={msg} render={true} className={fadeOut} />, document.getElementById('toastr'));
        }, 6000);
}
const ToastrMapper = {
    mapToast: function(msg){
        return createToast(msg);
    }
}
module.exports = ToastrMapper;