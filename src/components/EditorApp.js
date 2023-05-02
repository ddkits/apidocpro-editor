/**
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://apidocpro.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import Editor from './Editor';
import './style.css';
import ClipLoader from 'react-spinners/ClipLoader';
import 'bootstrap-select/dist/js/bootstrap-select.min.js';
import ErrorBoundary from './core/ErrorBoundary';
import { makeid } from './core/helpers';
import './base.scss';
export default function EditorApp() {
  const [loading, setloading] = useState(true);
  const [files, setfiles] = useState(0);
  const [activeNow, setactiveNow] = useState(0);
  const name = makeid(56);
  const [arrayTabs, setarrayTabs] = useState([]);
  const [editorActive, seteditorActive] = useState(
    <Editor
      style={{ maxHeight: '100% !important' }}
      key={files.toString()}
      className="col-md-12"
      filename={`apidocpro-${files}`}
      activenow={activeNow}
      tabid={activeNow}
      codename={`editorapidocpro-${files}`}
    />
  );
  const [barTabs, setbarTabs] = useState([]);
  useEffect(() => {
    // Mount
    //  setmounted(true)
    // Check storage
    setTimeout(() => {
      localStorage.getItem(`apidocpro-array`)
        ? setarrayTabs(JSON.parse(localStorage.getItem(`apidocpro-array`)))
        : setarrayTabs([`apidocpro-${files}`]);
      localStorage.getItem(`apidocpro-tabs`)
        ? setbarTabs(JSON.parse(localStorage.getItem(`apidocpro-tabs`)))
        : setbarTabs([`apidocpro-${files}`]);
      localStorage.getItem(`apidocpro-files`) &&
        setfiles(parseInt(localStorage.getItem(`apidocpro-files`)));
      localStorage.getItem(`apidocpro-active`) &&
        setactiveNow(parseInt(localStorage.getItem(`apidocpro-active`)));
    }, 500);
    setloading(false);
  }, []);
  const addNewFile = () => {
    setfiles(files + 1);
  };
  const setActiveEditor = useCallback((e) => {
    setactiveNow(e);
    localStorage.setItem(`apidocpro-active`, e);
  });
  const addTabs = useCallback((e) => {
    const count = files;
    setfiles(count + 1);
    const newtab = `apidocpro-${count + 1}`;
    let barNow = barTabs;
    //  add new tab
    barNow[files + 1] = newtab;
    setbarTabs(barNow);
    // new editor
    setarrayTabs(barNow);
    //  Store for user
    localStorage.setItem(`apidocpro-files`, count + 1);
    localStorage.setItem(`apidocpro-array`, JSON.stringify(barNow));
    localStorage.setItem(`apidocpro-tabs`, JSON.stringify(barNow));
    // // set active new the new tab
    setactiveNow(count + 1);
  });

  useEffect(() => {
    setloading(true);
    localStorage.setItem(`apidocpro-active`, activeNow);
    seteditorActive(
      <div key={files.toString()}>
        <Editor
          style={{ maxHeight: '100% !important' }}
          key={`apidocpro-${activeNow}`}
          className="col-md-12"
          filename={`apidocpro-${activeNow}`}
          activenow={activeNow.toString()}
          tabid={activeNow}
          codename={`editorapidocpro-${activeNow}`}
        />
      </div>
    );

    setTimeout(() => {
      setloading(false);
    }, 500);
  }, [activeNow]);

  return (
    <ErrorBoundary>
      <div className="pt-5 mt-3 container-fluid" style={{ minHeight: '80vh', marginBottom: '5vh' }}>
        <div className="editor-screen">
          The most secure place to edit your code, All your codes are private in your browser
          storage.
        </div>
        <section id="filestab" className="d-flex">
          {barTabs.length > 0 &&
            barTabs.map((x, xds) => {
              if (x !== null) {
                return (
                  <button
                    key={`${x}-tab`}
                    className={activeNow === xds ? 'button-30 active col' : 'button-30 col'}
                    onClick={(e) => setActiveEditor(xds)}>
                    Tab {xds}
                  </button>
                );
              }
            })}
          <button key={'newfile'} className="button-30 btn-success " onClick={(e) => addTabs()}>
            +
          </button>
          <button
            key={'clearallfiles'}
            className="button-30 btn-danger mr-auto"
            onClick={(e) => {
              localStorage.clear();
              window.location.reload();
            }}>
            Clear All
          </button>
        </section>
        <section id="editors" className="row">
          {!loading ? (
            editorActive
          ) : (
            <>
              <ClipLoader
                color={'#2e3149'}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </>
          )}
        </section>
      </div>
    </ErrorBoundary>
  );
}
