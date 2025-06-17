declare enum XMLClef {
    G = 0
}
type XMLNote = {
    ID: number;
    Beat: number;
    Duration: number;
    NoteName: string;
    Tied: boolean;
    Staff: number;
    Grace: boolean;
    Voice: number;
};
type XMLMeasure = {
    ID: number;
    Clef: XMLClef;
    Key: string;
    TimeSignature: {
        top: number;
        bottom: number;
    };
    Notes: XMLNote[];
};
type XMLScore = {
    Measures: XMLMeasure[];
};

declare namespace MXMLParser {
    function ParseT(): void;
    function ParsePartWise(score: string): XMLScore;
}

export { MXMLParser, type XMLScore };
