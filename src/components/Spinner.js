/**
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://apidocpro.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import React from 'react';
import loading from '../asset/loading1.gif';

const Spinner = () => {
  return (
    <div className="text-center my-3">
      <img className="img" height="100" src={loading} alt=".." />
    </div>
  );
};

export default Spinner;
