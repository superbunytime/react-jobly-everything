import React from "react";
import "./Loading.css"
import loading from "../../images/loading.gif"

function Loading() {
  return (
    <div className="col-lg-12">
      <div className="Loading">
          <h3>Loading...</h3>
          <div>
              <img src={loading}  alt="loading" style={{width:'70px',height:'70px'}}/>
          </div>
      </div>
    </div>
    
  );
}

export default Loading;
