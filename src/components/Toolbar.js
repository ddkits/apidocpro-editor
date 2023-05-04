/**
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://apidocpro.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import $ from 'jquery';

export default function Toolbar(props) {
  const [mounted, setmounted] = useState(false);
  const [templateNow, setTemplateNow] = useState('none');
  const [language, setLanguage] = useState('json');
  const activeNow = props.activenow;
  const [openMenu, setOpenMenu] = useState(false);
  const [menuId, setmenuId] = useState('');
  const [getOpenApi, setgetOpenApi] = useState(false);
  // const [swaggerparser, setswaggerparser] = useState(props.swaggerparser || false)
  useEffect(() => {
    setmounted(true);
    setLanguage(props?.language ? props?.language : 'json');
    setgetOpenApi(props?.apidocproui || localStorage.getItem('getOpenapi') || false);
  }, [props]);

  const showMenu = useCallback((e) => {
    setmenuId(e.target.getAttribute('openid'));
    setOpenMenu(true);
  });
  const closeMenu = useCallback(() => {
    setmenuId('');
    setOpenMenu(false);
  });

  const apidocprouiCallback = () => {
    props?.apidocproCallback(!getOpenApi);
    setgetOpenApi(!getOpenApi);
  };
  const languageCallback = useCallback(async (e) => {
    let lang = e.target.value;
    if (lang === 'YAML') {
      //  $('button#run').show();
      lang = 'yaml';
    } else if (lang === 'OpenAPI JSON Specification') {
      //  $('button#run').show();
      lang = 'OpenAPI JSON Specification';
    } else if (lang === 'OpenAPI YAML Specification') {
      //  $('button#run').show();
      lang = 'OpenAPI YAML Specification';
    }
    if (lang === 'AsyncAPI JSON Specification') {
      //  $('button#run').show();
      lang = 'AsyncAPI JSON Specification';
    } else if (lang === 'AsyncAPI YAML Specification') {
      //  $('button#run').show();
      lang = 'AsyncAPI YAML Specification';
    } else if (lang === 'JavaScript' || lang === 'JSON') {
      // $('button#run').show();
      lang = 'javascript';
    } else if (lang === 'CSS') {
      //  $('button#run').hide();
      lang = 'css';
    } else if (lang === 'text/html') {
      lang = 'text/html';
      // $('button#run').hide();
    } else if (lang === 'yaml') {
      lang = 'yaml';
      // $('button#run').hide();
    } else if (lang === 'XML') {
      lang = 'xml';
      // $('button#run').hide();
    } else {
      // $('button#run').hide();
    }
    setLanguage(lang);
    props.languageCallback(lang, activeNow);
  });
  const templateNowCallback = useCallback(async (e) => {
    let lang = e.target.value;
    setTemplateNow(lang);
    props.templateNowCallback(lang);
  });
  function handleFilesSelect(obj) {}
  function doDL() {
    const content = JSON.parse(localStorage.getItem(`editorapidocpro-${activeNow}`));
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `apidocpro-free-download-${activeNow}.${language}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    element.remove();
  }

  function postman() {
    var self;
    var customname = $('#editor-area.active #filename').val();
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    var filename = '';
    if (customname === '') {
      filename = csrfToken;
    } else {
      filename = customname;
    }
    var tab = Number($('#editor-area.active').attr('getid')) + 1;
    $('.tab-pane.active').each(function () {
      self = $(this);
    });
    var s = self[0].editor.getValue();
    var pom = document.createElement('a');
    var postmanresults, fn;
    $.ajax({
      url: '{{ route("public.editor.postman.create") }}',
      type: 'POST',
      dataType: 'json',
      data: {
        input: s,
        _token: '{{ csrf_token() }}',
        token: '{{ csrf_token() }}',
        filename: filename,
        tab: tab
      },
      success: function (response) {
        //console.log("request:  "+editorCode);
        // console.log("postman:  "+response.postman);
        pom.setAttribute('href', '{{ env("APP_URL") }}' + response.postman);
        pom.setAttribute('download', response.filename);
        pom.setAttribute('target', '_blank');
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
      },
      error: function (error) {
        return console.error(error);
      }
    });
  }

  function getFile() {}
  function sub(obj) {
    obj.preventDefault();
    handleFilesSelect(obj);
  }

  function subfolder(obj) {
    obj.preventDefault();
    handleFilesSelect(obj);
  }
  // {{--  reading file  --}}
  function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
        }
      }
    };
    rawFile.send(rawFile.responseText);
    return rawFile.responseText;
  }

  return (
    <>
      <section
        id="toolbar"
        key={`toolbar-${activeNow}`}
        className="row justify-content-center topbar text-white">
        <div>
          <input id="fileinput" type="file" onChange={(e) => sub(e)} />
        </div>
        <div>
          <input
            id="folderinput"
            type="file"
            onChange={(e) => subfolder(e)}
            name="files[]"
            multiple
            directory=""
            webkitdirectory=""
            moxdirectory=""
          />
        </div>
        <button
          openid="files"
          className="col button-30 btn margin-right menu-link-btn btn-function"
          onClick={(e) => showMenu(e)}>
          Files
        </button>
        {/* <button openid="edit" className="btn margin-right menu-link-btn btn-function" onClick={e => showMenu(e)} >Edit</button> */}

        {/* <button openid="tools" className="btn margin-right menu-link-btn btn-function" onClick={e => showMenu(e)} >Tools</button> */}
        <div className="col  d-flex">
          <label>Renders: </label>
          <select
            name="lang"
            className="pull-right btn margin-right btn-function"
            id="lang"
            value={language}
            onChange={(e) => languageCallback(e)}>
            <option value={language}>{language}</option>
            <option value="OpenAPI JSON Specification">OpenAPI Specification</option>
            <option value="AsyncAPI JSON Specification">AsyncAPI Specification</option>
          </select>
        </div>
        <div className="col  d-flex">
          <label>Lang: </label>
          <select
            name="lang"
            className="pull-right btn margin-right btn-function"
            id="lang"
            value={language}
            onChange={(e) => languageCallback(e)}>
            <option value="OpenAPI YAML Specification">OpenAPI YAML Specification</option>
            <option value="OpenAPI JSON Specification">OpenAPI JSON Specification</option>
            <option value="AsyncAPI YAML Specification">AsyncAPI YAML Specification</option>
            <option value="AsyncAPI JSON Specification">AsyncAPI JSON Specification</option>
            {langNames.length > 0 &&
              langNames.sort().map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
          </select>
        </div>
        <div className="col  d-flex">
          <label>Examples: </label>
          <select
            name="generate"
            className="btn margin-right btn-function"
            id="generate"
            value={templateNow}
            onChange={(e) => templateNowCallback(e)}>
            <option value="none">Template</option>
            <option value="AsyncAPIyaml">AsyncAPI YAML</option>
            <option value="AsyncAPIjson">AsyncAPI JSON</option>
            <option value="OpenAPIyaml">OpenAPI YAML</option>
            <option value="OpenAPIjson">OpenAPI JSON</option>
            <option value="Swaggeryaml">Swagger YAML</option>
            <option value="Swaggerjson">Swagger JSON</option>
            <option value="javascript">JavaScript</option>
            <option value="yaml">YAML</option>
            <option value="xml">XML</option>
            <option value="PHP">PHP</option>
            <option value="markdown">markdown</option>
            <option value="text/html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>
        <div className="col d-flex">
          <button
            onClick={() => apidocprouiCallback()}
            className={
              getOpenApi
                ? 'btn margin-right menu-link-btn btn-success bg-success'
                : 'button-30 btn margin-right menu-link-btn btn-function bg-danger'
            }>
            ApiDocPro UI Render{' '}
            {getOpenApi ? (
              <i className="fa fa-new"> Enabled</i>
            ) : (
              <i className="fa fa-new"> Disabled</i>
            )}
          </button>
        </div>
        <div className="col d-flex">
          <button className="btn" onClick={() => props?.setGetContent()}>
            Yaml To Json
          </button>
        </div>

        {/* <button className=" margin-right btn btn-function" onClick={postman} id="postman" style={{ }}>Convert to Postman Collection</button>
    <div id="embed-code" className="embed-code border bg-gray p-2 m-2" style={{ }}>Must run the code to see the embed iframe here.</div>
    <div id="share-now" className="embed-code border bg-gray p-2 m-2" style={{ }}>Must run the code to see the embed iframe here.</div> */}

        {menuId === 'edit' && openMenu && (
          <section
            id="edit"
            className="p-2 toolbar bordered"
            style={{
              position: 'relative',
              display: 'block'
            }}>
            <button onClick={closeMenu} className="pull-right close text-white">
              X
            </button>
            <div>
              {/* {{-- <button className="button-30 btn btn-function" id="folder-import" onclick="getFiles()">Folder Import</button> --}} */}
              <button className="button-30 btn btn-function" id="clear">
                Clear
              </button>
            </div>
            <div>
              <button className="button-30 btn btn-function" id="refresh">
                Refresh
              </button>
            </div>
            <div>
              <button className="button-30 btn btn-function" id="run">
                Run
              </button>
            </div>
            <div>
              {/* <button className="button-30 btn btn-function" id="show-embed" >Embed Results</button> */}
            </div>
            <div>
              <button
                className="button-30 button-30 btn btn-function"
                id="share-now-btn"
                aria-describedby="Share now and start working with your team on the same file">
                Share with Team
              </button>
            </div>
            <div>
              <button className="button-30 button-30 btn btn-function" id="preview-btn">
                Preview
              </button>
            </div>
          </section>
        )}
        {menuId === 'files' && openMenu && (
          <section
            id="files"
            className="p-2 toolbar bordered"
            style={{
              position: 'relative',
              width: '100%',
              display: 'block'
            }}>
            <button onClick={closeMenu} className="button-30 pull-right close text-white">
              X
            </button>
            {/* <div>
         <button className="button-30 btn btn-function" id="file-import" onClick={getFile} >File Import</button>
        </div> */}
            <div>
              <button className="button-30 button-30 btn btn-function" onClick={doDL} type="submit">
                Download
              </button>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
