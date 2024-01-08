import { Button, Flex, Select, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Resizable } from 're-resizable';
import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import EditorComponent from './EditorComponent';
import { Editor } from '@monaco-editor/react';
import { MdArrowDropDown } from 'react-icons/md';

export default function WebEditorComponent() {
    const [files, setFiles] = useState({
        'script.js': {
            name: 'script.js',
            language: 'javascript',
            value: 'console.log("Hello, World!");',
        },
        'style.css': {
            name: 'style.css',
            language: 'css',
            value: 'body {\n background-color: lightblue; \n}',
        },
        'index.html': {
            name: 'index.html',
            language: 'html',
            value:'<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" type="text/css" href="style.css">\n</head>\n<body>\n  <script src="script.js"></script>\n</body>\n</html>',
        },
    });

    const [fileName, setFileName] = useState('script.js');
    const [font, setFont] = useState('Fira Code');
    const [fontSize, setFontSize] = useState(14);
    const [theme, setTheme] = useState('vs-dark');
    const file = files[fileName];

    useEffect(() => {
        const updateOutput = () => {
            const iframe = document.getElementById('output-iframe');
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            const html = files['index.html'].value;
            const css = files['style.css'].value;
            const js = files['script.js'].value;

            iframeDocument.open();
            iframeDocument.write(`
          <style>${css}</style>
          ${html}
          <script>${js}</script>
      `);
            iframeDocument.close();
        };

        updateOutput();
        console.log(files);
    }, [files]);

    const handleFontChange = (e) => {
        setFont(e.target.value);
    };

    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    return (
        <div className="flex w-[100%] web-editor">
            <div className="pane top-pane md:w-3/5 w-full h-full">
                <div className="customize-section">
                    <div className='select flex'>
                        <span className='pr-1'>Font:</span>
                        <Select
                            border='none'
                            fontSize='0.8rem'
                            width='80px'
                            height='1.4rem'
                            icon={<MdArrowDropDown />}
                            value={font}
                            onChange={handleFontChange}
                        >
                            <option value='Fira Code'>Fira Code</option>
                            <option value='Source Code Pro'>Source Code Pro</option>
                            <option value='Monaco'>Monaco</option>
                            <option value='Courier New'>Courier New</option>
                        </Select>
                    </div>
                    <div className='select flex'>
                        <span className='pr-1'>Size:</span>
                        <Select
                            border='none'
                            fontSize='0.8rem'
                            width='80px'
                            height='1.4rem'
                            icon={<MdArrowDropDown />}
                            value={fontSize}
                            onChange={handleFontSizeChange}
                        >
                            {Array.from({ length: 23 }).map((_, idx) => (
                                <option key={idx} value={6 + idx * 2}>
                                    {6 + idx * 2}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className='select flex'>
                        <span className='pr-1'>Theme:</span>
                        <Select
                            border='none'
                            fontSize='0.8rem'
                            width='80px'
                            height='1.4rem'
                            icon={<MdArrowDropDown />}
                            value={theme}
                            onChange={handleThemeChange}
                        >
                            <option value="vs-dark">VS Dark</option>
                            <option value="hc-black">High Contrast (Dark)</option>
                            <option value="active4d">Active4D</option>
                        </Select>
                    </div>
                </div>
                <div className="h-[0.2rem] bg-[#202020]"></div>
                <Tabs className='file-tabs' position="relative" variant="unstyled" index={fileName}>
                    <TabList>
                        <Tab value="index.html" onClick={() => setFileName('index.html')}>
                            HTML
                        </Tab>
                        <Tab value="style.css" onClick={() => setFileName('style.css')}>
                            CSS
                        </Tab>
                        <Tab value="script.js" onClick={() => setFileName('script.js')}>
                            Javascript
                        </Tab>
                    </TabList>
                    <TabIndicator mt="-1.5px" height="4px" bg="blue.900" borderRadius="1px" />
                    <TabPanels>
                        <Editor
                            height="80vh"
                            theme={theme}
                            loading={null}
                            path={file.name}
                            defaultLanguage={file.language}
                            defaultValue={file.value}
                            options={{
                                fontSize: fontSize,
                                fontFamily: font,
                            }}
                            onChange={(newCode) => {
                                setFiles((prevFiles) => ({
                                    ...prevFiles,
                                    [fileName]: {
                                        ...prevFiles[fileName],
                                        value: newCode,
                                    },
                                }));
                            }}
                        />
                    </TabPanels>
                </Tabs>
            </div>
            <div className="pane bottom-pane md:w-2/5 w-full h-full">
                <iframe id="output-iframe" title="Output" className="output-iframe" />
            </div>
        </div>
    );
}
