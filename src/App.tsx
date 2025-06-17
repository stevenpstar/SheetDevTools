import './App.css'
import { 
    MessageType,
  sheet,
  App as SheetApp,
  type ConfigSettings,
  type lMeasure,
  type Message,
  type Theme
} from "../modules/sheet/entry.mjs";
import { MXMLParser,
type XMLScore} from "../modules/mxml/main.mjs";
import { useState, useRef, useEffect } from 'react';
import 'react-json-view-lite/dist/index.css';
import { githubDarkTheme, JsonEditor } from 'json-edit-react';
import { Sinth, type Note as SNote } from "../modules/sinth/main.mjs";
import { ConvertToSinthNotes } from './SinthConversion';

const defaultTheme: Theme = {
  NoteElements: "black",
  SelectColour: "blue",
  UneditableColour: "gray",
  LineColour: "black",
  BackgroundColour: "#161d26",
  PageColour: "white",
  PageShadowColour: "#161c24",
}

const SheetConfig: ConfigSettings = {
  CameraSettings: {
    DragEnabled: true,
    ZoomEnabled: true,
    Zoom: 1,
    StartingPosition: { x: 20, y: 20 },
    CenterMeasures: false,
    CenterPage: false,
  },
  FormatSettings: {
    MeasureFormatSettings: { Selectable: false },
  },
  NoteSettings: {
    InputValue: 0.5,
  },
  PageSettings: {
    UsePages: true,
    RenderPage: true,
    RenderBackground: true,
    ContainerWidth: false,
    AutoSize: false,
  },
  DefaultStaffType: "single",
  Theme: defaultTheme
}

const keymaps = {
  rerender: "'",
  addmeasure: "a",
  changeinputmode: "n",
  value1: "1",
  value2: "2",
  value3: "3",
  value4: "4",
  value5: "5",
  value6: "6",
  restInput: "r",
  delete: "d",
  sharpen: "+",
  flatten: "-",
  scaleToggle: "'",
  save: "s",
  load: "l",
  test_tuplet: "t",
  debug_clear: "c",
  beam: "b",
  grace: "g",
  change_timesig: "+",
  add_dynamic: "f",
  cycle_voice: "p",
  add_barline: ";",
  add_accent: "]",
  add_clef: "k",
  undo: "ctrl z",
  redo: "ctrl y"
};

function App() {

  const [sheetApp, setSheetApp] = useState<SheetApp | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapper = useRef<HTMLDivElement>(null);
  const [currentState, setCurrentState] = useState<any>(null);
  const [loadedMXML, setLoadedMXML] = useState<XMLScore>(null);
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [selectedTab, setSelectedTab] = useState<string>("sheet");
  const [MXMLString, setMXMLString] = useState<string>("");
  const [sinthNotes, setSinthNotes] = useState<SNote[]>(null);
  const aSample = useRef<AudioBuffer | null>(null);
  const aContext = useRef<AudioContext>(new AudioContext());

  let HasInit: boolean = false;


  const Callback = (msg: Message): void => {
    if (msg.messageData.MessageType === MessageType.StateChange) {
      const objString: string = msg.messageData.Message.obj as string;
      const obj = JSON.parse(objString);
      setCurrentState(obj);
      setSinthNotes(ConvertToSinthNotes(obj.Measures as lMeasure[]));
    }
  }

  // maybe use memo or something, bad use effect for now doesn't matter
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsText(selectedFile, "UTF-8");
      reader.onload = (e) => {
        setMXMLString(e.target.result as string);
        setLoadedMXML(MXMLParser.ParsePartWise(e.target.result as string));
      }
    }

  }, [selectedFile]);

  useEffect(() => {
    if (sheetApp) {
      console.log("Loading from MXML");
      sheetApp.LoadFromMXML(loadedMXML);
    }
  }, [loadedMXML])

  useEffect(() => {
    if (!HasInit && canvasRef.current && canvasWrapper.current) {
      HasInit = true;
      setSheetApp(
        sheet.CreateApp(
          canvasRef.current,
          canvasWrapper.current,
          document,
          keymaps,
          Callback,
          SheetConfig
        ));
    }
    if (!aSample.current) {
      fetch("/a4.flac")
        .then(resp => resp.arrayBuffer())
        .then(aBuffer => aContext.current.decodeAudioData(aBuffer))
        .then(s => aSample.current = s);
    }
  }, []);

  return (
    <main className="main-page">
      <div ref={canvasWrapper} className="sheet-display">
        <canvas ref={canvasRef} id="sheet"></canvas>
      </div>
      <div className="tab-vertical">

        <button 
          className={selectedTab === "sheet" ? "button-selected" : ""}
          onClick={() => { setSelectedTab("sheet")}}>
            <img className="button-img" src="../public/box.svg" />
          </button>

        <button 
          className={selectedTab === "fileJSON" ? "button-selected" : ""}
          onClick={() => { setSelectedTab("fileJSON")}}>
          <img className="button-img" src="../public/file-plus.svg" />
        </button>

        <button 
          className={selectedTab === "fileMXML" ? "button-selected" : ""}
          onClick={() => { setSelectedTab("fileMXML")}}>
          <img className="button-img" src="../public/code.svg" />
        </button>

        <button 
          className={selectedTab === "playback" ? "button-selected" : ""}
          onClick={() => { setSelectedTab("playback")}}>
          <img className="button-img" src="../public/headphones.svg" />
        </button>

      </div>
      <div className="data-display">
        { selectedTab === "sheet" &&
        <div className="json-view">
       <JsonEditor
        data={currentState}
        setData={setCurrentState}
        restrictAdd={true} 
        theme={githubDarkTheme}
        collapse={1}/>
        </div>
        }
        { selectedTab === "fileJSON" &&
          <div>
          { selectedFile !== null && 
          <h2>{selectedFile.name}</h2>
          }
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

        <div className="json-view">
          <JsonEditor
            data={loadedMXML}
            setData={setLoadedMXML}
            viewOnly={true}
            theme={githubDarkTheme} />
          </div>
        </div>
        }
        {
          selectedTab === "fileMXML" && 
            <pre className="mxml-view">
              {MXMLString}
            </pre>
        }
        {
          selectedTab === "playback" &&
            <div>
            <button
            onClick={() => {
              if (!aContext.current) {
                console.error("Audio Context not found");
              }
              if (!aSample.current) {
                console.error("Audio Sample not found");
              }
              console.log("playing notes: ", sinthNotes);
              Sinth.initplay(sinthNotes);
              Sinth.play(aContext.current, aSample.current, 60, 100, () => {});
              console.log("Should be playing!");
            }}
            >
              <img src="../public/play.svg" />
            </button>
          </div>
        }
      </div>
    </main>
  )
}

export default App
