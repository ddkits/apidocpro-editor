/**
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://apidocpro.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect } from 'react';
import Toolbar from './Toolbar';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { languages } from '@codemirror/language-data';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import AsyncApiComponent from '@asyncapi/react-component/browser';
import '@asyncapi/react-component/styles/default.min.css';
import './themes/3.x/theme-outline.css';
import { ApiDocPro, yamlToJson } from 'openapi-asyncapi-ui-render';
import * as THEME from 'openapi-asyncapi-ui-render/dist/components/theme/green/green';
import ReactMarkdown from 'react-markdown';

const targets = ['node_unirest', 'c'];
// import './custom.css'
// import CodePreview from '@uiw/react-code-preview';
export const tags = t;
export default function Editor(props) {
  const [mounted, setmounted] = useState(false);
  const apiDocTheme = createTheme({
    theme: 'light',
    settings: {
      background: '#2e3149',
      foreground: '#f8f9fa',
      color: '#f8f9fa',
      caret: '#f8f9fa',
      selection: '#f51f5126',
      selectionMatch: '#d54d5426',
      lineHighlight: '#0000001a',
      gutterBackground: '#2e3149',
      gutterForeground: '##f8f9fa66',
      comment: '#787b8099',
      number: '#f51f51'
    },
    styles: [
      { tag: t.comment, color: '#787b8099' },
      { tag: t.variableName, color: '#0080ff' },
      { tag: [t.string, t.special(t.brace)], color: '#fff' },
      { tag: t.number, color: '#f51f51' },
      { tag: t.bool, color: '#f61f61' },
      { tag: t.null, color: '#5c6166' },
      { tag: t.keyword, color: '#f11f11' },
      { tag: t.operator, color: '#f65f65' },
      { tag: t.className, color: '#f01f01' },
      { tag: t.definition(t.typeName), color: '#f31f31' },
      { tag: t.typeName, color: '#f45f45' },
      { tag: t.angleBracket, color: '#fff' },
      { tag: t.tagName, color: '#f87f87' },
      { tag: t.attributeName, color: '#f90f90' }
    ]
  });
  const [loading, setLoading] = useState(true);
  const codeEditorRef = useRef();
  // const stateFields = { history: historyField };
  const [extensions, setextensions] = useState([apiDocTheme]);
  const [get, setGet] = useState('');
  const [getOpenApi, setGetOpenApi] = useState(false);
  const [swaggerparser, setswaggerparser] = useState(false);
  const activeNow = props.activenow || 0;
  const tabName = props.codename;
  const filename = props.filename;
  const tabid = props.tabid;
  const [language, setLanguage] = useState('json');
  const setAPI = (type) => {
    localStorage.setItem(`editorapidocpro-${activeNow}-api`, type);
  };
  const languageCallback = async (e, active) => {
    setLoading(true);
    // custom api set
    if (e === 'OpenAPI JSON Specification') {
      setAPI('openapi');
      setGetOpenApiCallback(true);
      setextensions([
        apiDocTheme,
        loadLanguage('json'),
        javascript({ typescript: true, js: true, jsx: true })
      ]);
      setLanguage('json');
      localStorage.setItem(`editorapidocpro-${activeNow}-language`, 'json');
    } else if (e === 'OpenAPI YAML Specification') {
      setGetOpenApiCallback(true);
      setAPI('openapi');
      setextensions([
        apiDocTheme,
        loadLanguage('yaml'),
        javascript({ typescript: true, js: true, jsx: true })
      ]);
      setLanguage('yaml');
      localStorage.setItem(`editorapidocpro-${activeNow}-language`, 'yaml');
    } else if (e === 'AsyncAPI JSON Specification') {
      setGetOpenApiCallback(true);
      setAPI('async');
      setextensions([
        apiDocTheme,
        loadLanguage('json'),
        javascript({ typescript: true, js: true, jsx: true })
      ]);
      setLanguage('json');
      localStorage.setItem(`editorapidocpro-${activeNow}-language`, 'json');
    } else if (e === 'AsyncAPI YAML Specification') {
      setGetOpenApiCallback(true);
      setAPI('async');
      setextensions([
        apiDocTheme,
        loadLanguage('yaml'),
        javascript({ typescript: true, js: true, jsx: true })
      ]);
      setLanguage('yaml');
      localStorage.setItem(`editorapidocpro-${activeNow}-language`, 'yaml');
    } else {
      localStorage.removeItem(`editorapidocpro-${activeNow}-api`);
      setextensions([
        apiDocTheme,
        loadLanguage(e),
        javascript({ typescript: true, js: true, jsx: true })
      ]);
      setLanguage(e);
      localStorage.setItem(`editorapidocpro-${activeNow}-language`, e);
    }
    setLoading(false);
  };
  const [templateNow, settemplateNow] = useState('template');
  const templateNowCallback = (e) => {
    settemplateNow(e);
  };

  useEffect(() => {
    // fetchFile(language)
    setmounted(true);
    setGetOpenApi(localStorage.getItem('getOpenapi') || false);
    //   Change language
    localStorage.getItem(tabName + '-language')
      ? setLanguage(localStorage.getItem(`editorapidocpro-${activeNow}-language`))
      : localStorage.setItem(`editorapidocpro-${activeNow}-language`, language);
    localStorage.getItem(`editorapidocpro-${activeNow}`)
      ? setGet(JSON.parse(localStorage.getItem(`editorapidocpro-${activeNow}`)))
      : setGet('{\n\n}');
    // localStorage.getItem(`editorapidocpro-theme`) ? settheme(JSON.parse(localStorage.getItem(`editorapidocpro-theme`))): settheme(apiDocTheme);
    setLoading(false);
    // console.clear();
  }, []);
  useEffect(() => {
    fetchFile(templateNow);
  }, [templateNow]);

  // Fetch File
  const fetchFile = async (lang) => {
    const files = [
      { key: 'xml', url: '/examples/nice.xml' },
      { key: 'yaml', url: '/examples/petstore-open.yaml' },
      { key: 'PHP', url: '/examples/nice.php' },
      { key: 'markdown', url: '/examples/nice.md' },
      { key: 'AsyncAPIyaml', url: '/examples/streetlights-api.yaml' },
      { key: 'AsyncAPIjson', url: '/examples/streetlights-api.json' },
      { key: 'Swaggeryaml', url: '/examples/petstore.yaml' },
      { key: 'Swaggerjson', url: '/examples/petstore.json' },
      { key: 'OpenAPIjson', url: '/examples/petstore-open.json' },
      { key: 'OpenAPIyaml', url: '/examples/petstore-open.yaml' },
      { key: 'javascript', url: '/examples/nice.js' },
      { key: 'text/html', url: '/examples/nice.html' },
      { key: 'css', url: '/examples/nice.css' }
    ];
    const index = files.findIndex((x) => x.key === lang);
    if (index > -1) {
      await fetch(files[index].url)
        .then((r) => r.text())
        .then((x) => {
          localStorage.setItem(tabName, JSON.stringify(x));
          setGet(x);
        });
    }
    return;
  };
  //     new EditorView({
  //     doc: get,
  //     extensions: [keymap.of(defaultKeymap)],
  //     parent: document.getElementById(tabName+'pre')
  //   })
  useEffect(() => {
    setLoading(true);
    //   Change language
    localStorage.setItem(tabName + '-language', language);
    if (language === 'javascript') {
      setextensions([apiDocTheme, javascript({ codeLanguages: languages })]);
    } else if (language === 'css') {
      setextensions([apiDocTheme, css({ codeLanguages: languages })]);
    } else {
      setextensions([apiDocTheme, loadLanguage(language)]);
    }
    setLoading(false);
    if (codeEditorRef.current) {
      codeEditorRef?.current?.view?.dispatch();
    }
    // fetchFile(language)
    console.clear();
  }, [language, templateNow]);
  useEffect(() => {
    if (codeEditorRef?.current?.id !== tabName) {
      codeEditorRef.current = null;
    }
    console.clear();
  }, [codeEditorRef.current]);
  useEffect(() => {
    setLoading(true);
    //   Change language
    localStorage.setItem(tabName + '-language', language);
    if (language === 'javascript') {
      setextensions([apiDocTheme, javascript({ codeLanguages: languages })]);
    } else if (language === 'css') {
      setextensions([apiDocTheme, css({ codeLanguages: languages })]);
    } else {
      setextensions([apiDocTheme, loadLanguage(language)]);
    }
    setLoading(false);
    if (codeEditorRef.current) {
      codeEditorRef?.current?.view?.dispatch();
    }
    fetchFile(language);
    console.clear();
  }, []);

  const onChange = useCallback((value) => {
    setGet(value);
    localStorage.setItem(tabName, JSON.stringify(value));
  });
  const setGetOpenApiCallback = (e) => {
    setGetOpenApi(e);
    localStorage.setItem('getOpenApi', e);
  };
  const setGetContent = (e) => {
    setGetOpenApi(e);
    const vlue = JSON.stringify(yamlToJson(get), null, 2);
    setGet(vlue);
    localStorage.setItem(tabName, JSON.stringify(vlue));
  };

  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
    <html>
        <head>
        <title>API Doc Pro Editor Preview</title>
        <style>html, body { width: 100% !important; height: 500px !important; overflow: auto;}</style>
        </head>
        <body>
        ${get}
        </body>
    </html>
    `;
  if (!mounted) {
    return <>Loading...</>;
  }
  return (
    <>
      <section key={`${tabName}-${activeNow}`} className="editor-screen">
        <Toolbar
          key={`editorapidocpro-${activeNow}-${language}`}
          activenow={activeNow}
          setGetContent={setGetContent}
          languageCallback={languageCallback}
          templateNowCallback={templateNowCallback}
          // themeCallback={themeCallback}
          language={language}
          tabname={tabName}
          redocRenderCallback={(e) => {
            return setswaggerparser(false);
          }}
          swaggerparser={(e) => {
            setswaggerparser(e);
          }}
          apidocproCallback={(e) => setGetOpenApiCallback(e)}
          apidocproui={getOpenApi}
        />
        <section className="row" id="apieditor">
          <section
            id="code-editor"
            className="col-md-12 col-lg-6"
            style={{
              minHeight: '80vh !important',
              maxWidth: '100%',
              minWidth: '50%',
              maxHeight: '100% !important'
            }}>
            <CodeMirror
              key={`${activeNow}`}
              activenow={activeNow}
              id={tabName}
              value={get}
              ref={codeEditorRef}
              extensions={extensions ? [extensions] : []}
              onChange={onChange}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                defaultKeymap: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                completionKeymap: true,
                lintKeymap: true
              }}
              theme={apiDocTheme}
              style={{
                minHeight: '70vh'
              }}
            />
            {/* Preview section */}
          </section>
          <section
            id="preview"
            className="d-none d-lg-block col-lg-6"
            style={{
              minHeight: '80vh !important',
              maxWidth: '100%',
              minWidth: '50%',
              maxHeight: '100% !important'
            }}>
            {!loading ? (
              getOpenApi ? (
                language === 'yaml' || language === 'json' ? (
                  <>
                    <ApiDocPro
                      title="APIDocPro OpenAPI/AysncAPI UI"
                      rightregion={true} // Bool default true
                      leftregion={false} // Bool default true
                      header={false} // Bool default true
                      theme={THEME}
                      spec={typeof get === 'object' ? get : yamlToJson(get)} // string
                    />
                  </>
                ) : (
                  <iframe
                    key={tabName.toString() + language.toString()}
                    id={tabName + 'pre'}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      maxHeight: '100%'
                    }}
                    srcDoc={html}
                  />
                )
              ) : language === 'markdown' ? (
                <ReactMarkdown
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    maxHeight: '100%'
                  }}>
                  {get}
                </ReactMarkdown>
              ) : localStorage.getItem(`editorapidocpro-${activeNow}-api`) === 'async' &&
                (language === 'yaml' || language === 'json') ? (
                <AsyncApiComponent
                  schema={get}
                  className="maxw-100"
                  style={{
                    display: 'block',
                    height: '80vh',
                    width: '100%',
                    maxHeight: '100%'
                  }}
                />
              ) : localStorage.getItem(`editorapidocpro-${activeNow}-api`) === 'openapi' &&
                (language === 'yaml' || language === 'json') ? (
                <SwaggerUI
                  theme={'theme-outline'}
                  className="maxw-100"
                  spec={get}
                  style={{
                    display: 'block',
                    height: '80vh',
                    width: '100%',
                    maxHeight: '100%'
                  }}
                />
              ) : (
                <iframe
                  key={tabName.toString() + language.toString()}
                  id={tabName + 'pre'}
                  className="maxw-100"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    maxHeight: '100%'
                  }}
                  srcDoc={html}
                />
              )
            ) : (
              ''
            )}
          </section>
        </section>
      </section>
    </>
  );
}
