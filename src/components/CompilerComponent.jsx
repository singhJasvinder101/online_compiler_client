import { Box, Button, Flex, HStack, Select, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Editor, loader } from '@monaco-editor/react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
const apiUri = import.meta.env.VITE_API_URI
import axios from 'axios'
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import monacoThemes from "monaco-themes/themes/themelist";

export default function CompilerComponent() {
    const codes = {
        'javascript': 'console.log("Hello, World!");',
        'python': 'print("Hello, World!")',
        'cpp': '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}',
        'java': 'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
        'csharp': 'using System;\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello, World!");\n    }\n}',
        'ruby': 'puts "Hello, World!"',
        'rust': 'fn main() {\n    println!("Hello, World!");\n}',
        'go': 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}',
        'typescript': 'console.log("Hello, World!");',
        'typescript': 'console.log("Hello, World!");',
        'kotlin': 'fun main() {\n    println("Hello, World!")\n}',
        'plaintext': 'Name,Age,Location\nJohn,25,New York\nJane,30,San Francisco',
    };

    const [font, setFont] = useState('Fira Code');
    const [fontSize, setFontSize] = useState(14);
    const [theme, setTheme] = useState('vs-dark');
    const [language, setLanguage] = useState({
        name: 'cpp',
        code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}'
    });
    const [userInput, setUserInput] = useState(null)
    const [output, setOutput] = useState({
        errorCode: "",
        memory: null,
        output: "",
        rntError: "",
        success: "",
        time: null,
        cmpError: "",
        loading: false
    })
    const inputRef = useRef(null)
    const [sizes, setSizes] = useState([100, '30%', 'auto']);


    const handleFontChange = (e) => {
        setFont(e.target.value);
    };

    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };


    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
    };

    const handleLanguageChange = (e) => {
        setLanguage({
            name: e.target.value,
            code: codes[e.target.value],
        });
    };

    const handleRunButtonClick = async () => {
        try {

            setOutput({ loading: true })
            const { data } = await axios.post(`${apiUri}/api/users/run`, {
                language: language.name === "javascript" ? "js" : language.name,
                code: language.code,
                input: userInput ? userInput : ''
            });
            setOutput({
                errorCode: data.errorCode,
                memory: data.memory,
                output: data.output,
                rntError: data.rntError,
                cmpError: data.cmpError,
                success: data.success,
                time: data.time,
                loading: false
            })

        } catch (error) {
            console.log(error)
            setOutput({ loading: false, output: "some error occoured" })
        }
    };

    const handleFileChange = (e) => {
        const fileReader = new FileReader();
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
            return
        }

        fileReader.onload = (event) => {
            console.log('Uploaded File: ' + files[0].name)
            const content = event.target.result;
            setUserInput(content);
        };
        fileReader.readAsText(files[0], "UTF-8");
    };



    const handleFileIconClick = () => {
        inputRef.current.click();
    };

    const handleInputOnchnage = (e) => {
        setUserInput(e.target.value)
    }

    return (
        <HStack spacing='0' className='compiler-component h-100 overflow-hidden'>
            <div className='w-4/5 h-full bg-[#202020]'>
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
                    <div className='select flex'>
                        <span className='pr-1'>Language:</span>
                        <Select
                            border='none'
                            fontSize='0.8rem'
                            width='80px'
                            height='1.4rem'
                            icon={<MdArrowDropDown />}
                            value={language.name}
                            onChange={handleLanguageChange}
                        >
                            <option value='javascript'>JavaScript</option>
                            <option value='python'>Python</option>
                            <option value='cpp'>C++</option>
                            <option value='java'>Java</option>
                            <option value='csharp'>C#</option>
                            <option value='ruby'>Ruby</option>
                            <option value='rust'>Rust</option>
                            <option value='go'>Go</option>
                            <option value='javascript'>Node.js</option>
                            <option value='kotlin'>Kotlin</option>
                            <option value='plaintext'>CSV</option>
                        </Select>
                    </div>
                    <Button className='relative' isLoading={output.loading} loadingText='Running' onClick={handleRunButtonClick} borderRadius="20px">
                        <span className='px-3'>Run</span>
                    </Button>
                </div>
                <Editor
                    ref={(editorRef) => (this.editorRef = editorRef)}
                    className='compiler-editor'
                    language={language.name}
                    theme={theme}
                    value={language.code}
                    onChange={(newCode) => setLanguage({
                        name: language.name,
                        code: newCode,
                        input: userInput
                    })}
                    loading={null}
                    options={{
                        fontSize: fontSize,
                        fontFamily: font,
                    }}
                />
            </div>
            <VStack className='h-100 w-2/5' spacing='0'>
                <SplitPane
                    split="horizontal"
                    sizes={sizes}
                    onChange={setSizes}
                >
                    <Pane minSize={50}>
                        <Flex flexDirection="column" className='compiler-input h-full w-full'>
                            <div className="panel-heading p-3 flex justify-between">
                                <span>Input</span>
                                <input type="file" ref={inputRef} onChange={handleFileChange} className='hidden' />
                                <span><FaCloudUploadAlt onClick={handleFileIconClick} /></span>
                            </div>
                            <div className="panel-input-ouput h-full w-full">
                                <textarea
                                    className="w-full h-full"
                                    value={userInput}
                                    onChange={handleInputOnchnage}
                                >
                                </textarea>
                            </div>
                        </Flex>
                    </Pane>
                    <Pane minSize={50}>
                        <Flex flexDirection="column" className='compiler-output h-full w-full'>
                            <div className="panel-heading p-3 flex justify-between">
                                <span>Output</span>
                                <span><FaDownload /></span>
                            </div>
                            <div className="panel-input-ouput overflow-auto">
                                {/* {output.output} */}
                                <div className='pt-3' dangerouslySetInnerHTML={{ __html: output.output && output.output.replace(/\n/g, '<br>') }}></div>
                                {output.errorCode === "CE" ? (
                                    <>
                                        <span className='error'>Compilation Error</span>
                                        <div className='error mt-3'>
                                            {output.cmpError}
                                        </div>
                                    </>
                                ) : output.errorCode === "RTE" ? (
                                    <>
                                        <span className='error'>Run Time Error</span>
                                        <div className='error mt-3'>
                                            {output.rntError}
                                        </div>
                                    </>
                                ) : output.errorCode === "TLE" ? (
                                    <>
                                        <span className='error'>TLE Error</span>
                                        <div className='error mt-3'>
                                            {output.rntError}
                                        </div>
                                    </>
                                ) : null}


                                {(output.time && output.memory) && <div className="ouput-footer">
                                    <span className='mx-2'>{output.time * 1000} ms</span>
                                    <span>{Math.round(output.memory * 100) / 100} mb</span>
                                </div>}
                            </div>
                        </Flex>
                    </Pane>
                </SplitPane>
            </VStack>
        </HStack>
    )
}
