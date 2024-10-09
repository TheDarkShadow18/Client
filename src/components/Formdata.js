import React from 'react';
import { MdClose } from 'react-icons/md';
import "../App.css"

function Formdata({handleSubmit,handleChange,handleclose,rest}) {
    return (
            <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={handleclose}><MdClose /></div>
              <label htmlFor="name">Name :</label>
              <input id="name" type="text" name="name" onChange={handleChange} value={rest.name}  />

              <label htmlFor="email">Email :</label>
              <input id="email" type="email" name="email" onChange={handleChange} value={rest.email} />

              <label htmlFor="mobile">Mobile :</label>
              <input id="mobile" type="tel" name="mobile" onChange={handleChange} value={rest.mobile} />

              <button className="btn">Submit</button>
            </form>
          </div>
    );
}

export default Formdata;