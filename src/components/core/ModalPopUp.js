/**
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://apidocpro.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable react/prop-types */
import React from 'react';

export default function ModalPopUp(props) {
  const { id, content } = props;

  return (
    <>
      {/* Modals */}
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={id + 'Label'}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="form">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title"> </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid card">{content}</div>
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  );
}
