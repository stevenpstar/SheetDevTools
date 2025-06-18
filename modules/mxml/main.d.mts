type XMLClef = {
    Type: string;
    Staff: number;
};
type XMLStaff = {
    Number: number;
};
type XMLNote = {
    ID: number;
    Beat: number;
    Duration: number;
    NoteName: string;
    Tied: boolean;
    Staff: number;
    Grace: boolean;
    Voice: number;
    Alter: number;
};
type XMLMeasure = {
    ID: number;
    Clefs: XMLClef[];
    Staves: XMLStaff[];
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
