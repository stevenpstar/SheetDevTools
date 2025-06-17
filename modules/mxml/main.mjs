function g(){return{Measures:[]}}function c(r){let n={state:0,score:g(),lines:r.split(`
`)},i=null,t=null,o=1,l=0,p=1,u="",m="";return n.lines.forEach(e=>{if(e.includes("<measure")&&(i=y(n,e),p=1),i){if(e.includes("</measure")&&(i=null),e.includes("<divisions"))o=parseInt(s(e));else if(e.includes("<fifths")){let a=s(e),d=h(parseInt(a));d==="KeyNotFound"&&console.error("Key Not Found!"),i.Key=d}else if(e.includes("<beats")){let a=parseInt(s(e));i.TimeSignature.top=a}else if(e.includes("<beat-type")){let a=parseInt(s(e));i.TimeSignature.bottom=a}else if(e.includes("<sign")){let a=s(e);i.Clef=b(a)}if(e.includes("<note")?(t=null,t=v(l),i.Notes.push(t),t.Beat=p):e.includes("</note")&&(t=null,l+=1),t){if(e.includes("<step"))u=s(e),m!==""&&(t.NoteName=u+m);else if(e.includes("<octave"))m=s(e),u!==""&&(t.NoteName=u+m);else if(e.includes("<duration")){let a=parseInt(s(e))/4;t.Duration=a/o,p+=t.Duration*4}}}}),n.score}function y(r,n){if(n.includes("<measure")){let i=0;if(n.includes('number="')){let o=n.split('"');o.length>=3&&(i=parseInt(o[1]),console.log("Parsed measure id: ",i))}let t=M(i);return r.score.Measures.push(t),r.state=1,t}}function s(r){let n=r.split(">");return n.length<2?(console.error("Could not get content, error with tag splitting!"),""):n[1].split("</")[0]}function b(r){return r==="G"?0:-1}function h(r){switch(r){case 0:return"CMaj/Amin";case-1:return"FMaj/Dmin";default:return"KeyNotFound"}}function v(r){return{ID:r,Beat:-1,Duration:-1,NoteName:"",Tied:!1,Staff:0,Grace:!1,Voice:0}}function M(r){return{ID:r,Clef:0,Key:"",TimeSignature:{top:0,bottom:0},Notes:[]}}var w=`
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <identification>
    <encoding>
      <software>MuseScore 3.6.2</software>
      <encoding-date>2025-06-15</encoding-date>
      <supports element="accidental" type="yes"/>
      <supports element="beam" type="yes"/>
      <supports element="print" attribute="new-page" type="yes" value="yes"/>
      <supports element="print" attribute="new-system" type="yes" value="yes"/>
      <supports element="stem" type="yes"/>
      </encoding>
    </identification>
  <defaults>
    <scaling>
      <millimeters>7</millimeters>
      <tenths>40</tenths>
      </scaling>
    <page-layout>
      <page-height>1697.14</page-height>
      <page-width>1200</page-width>
      <page-margins type="even">
        <left-margin>85.7143</left-margin>
        <right-margin>85.7143</right-margin>
        <top-margin>85.7143</top-margin>
        <bottom-margin>85.7143</bottom-margin>
        </page-margins>
      <page-margins type="odd">
        <left-margin>85.7143</left-margin>
        <right-margin>85.7143</right-margin>
        <top-margin>85.7143</top-margin>
        <bottom-margin>85.7143</bottom-margin>
        </page-margins>
      </page-layout>
    <word-font font-family="Edwin" font-size="10"/>
    <lyric-font font-family="Edwin" font-size="10"/>
    </defaults>
  <part-list>
    <part-group type="start" number="1">
      <group-symbol>brace</group-symbol>
      </part-group>
    <score-part id="P1">
      <part-name>Piano</part-name>
      <part-abbreviation>Pno.</part-abbreviation>
      <score-instrument id="P1-I1">
        <instrument-name>Piano</instrument-name>
        </score-instrument>
      <midi-device id="P1-I1" port="1"></midi-device>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel>
        <midi-program>1</midi-program>
        <volume>78.7402</volume>
        <pan>0</pan>
        </midi-instrument>
      </score-part>
    </part-list>
  <part id="P1">
    <measure number="1" width="338.41">
      <print>
        <system-layout>
          <system-margins>
            <left-margin>50.00</left-margin>
            <right-margin>413.23</right-margin>
            </system-margins>
          <top-system-distance>70.00</top-system-distance>
          </system-layout>
        </print>
      <attributes>
        <divisions>2</divisions>
        <key>
          <fifths>-1</fifths>
          </key>
        <time>
          <beats>3</beats>
          <beat-type>4</beat-type>
          </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
          </clef>
        </attributes>
      <note default-x="98.84" default-y="-20.00">
        <pitch>
          <step>B</step>
          <alter>-1</alter>
          <octave>4</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <note default-x="172.00" default-y="-10.00">
        <pitch>
          <step>D</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">begin</beam>
        </note>
      <note default-x="217.73" default-y="-5.00">
        <pitch>
          <step>E</step>
          <octave>5</octave>
          </pitch>
        <duration>1</duration>
        <voice>1</voice>
        <type>eighth</type>
        <stem>down</stem>
        <beam number="1">end</beam>
        </note>
      <note default-x="263.45" default-y="-15.00">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      </measure>
    <measure number="2" width="226.93">
      <note default-x="13.00" default-y="-20.00">
        <pitch>
          <step>B</step>
          <alter>-1</alter>
          <octave>4</octave>
          </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        </note>
      <note default-x="138.09" default-y="-15.00">
        <pitch>
          <step>C</step>
          <octave>5</octave>
          </pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
        </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        </barline>
      </measure>
    </part>
  </score-partwise>
`;var f;(i=>{function r(){let t=document.getElementById("text_elem");t&&(t.innerHTML=JSON.stringify(c(w),null,2))}i.ParseT=r;function n(t){return c(t)}i.ParsePartWise=n})(f||(f={}));export{f as MXMLParser};
//# sourceMappingURL=main.mjs.map