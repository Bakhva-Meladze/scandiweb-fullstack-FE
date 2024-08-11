import React from "react";
import LoadingGif from "./images/Loading.gif";

class Loading extends React.Component {

    render() {
        return(
            <div className="loading">
            <img src={LoadingGif} alt={''}/>
        </div>)
    }
}

export default Loading