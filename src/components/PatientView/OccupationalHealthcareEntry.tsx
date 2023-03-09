import { Diagnose, OccupationalHealthcareEntry } from "../../types"
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnose[];
}

const OccupationalHealthcareDetails = ({ entry, diagnoses }: Props) => {
    return (
        <div id="entry">
            <p>{entry.date} <WorkIcon /> {entry.employerName} </p> 
            <i>{entry.description}</i>
            <p>diagnose by {entry.specialist}</p>
            <ul>
                {entry.diagnosisCodes?.map((code, index) => (<li key={index} id={index.toString()}>{code} {diagnoses.find(d => d.code === code)?.name}</li>))}
            </ul>
        </div>
    )
}

export default OccupationalHealthcareDetails;