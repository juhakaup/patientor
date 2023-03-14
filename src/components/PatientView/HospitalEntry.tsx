import { Diagnose, HospitalEntry } from "../../types"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: HospitalEntry;
    diagnoses: Diagnose[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: Props) => {
    return (
        <div id="entry">
            <p>{entry.date} <LocalHospitalIcon/> </p> 
            <i>{entry.description}</i>

            <p>diagnose by {entry.specialist}</p>
            <ul>
                {entry.diagnosisCodes?.map((code, index) => (<li key={index} id={index.toString()}>{code} {diagnoses.find(d => d.code === code)?.name}</li>))}
            </ul>
            <h4>Discharge</h4>
            <p>date: {entry.discharge.date} - criteria: {entry.discharge.criteria}</p>
        </div>
    )
}

export default HospitalEntryDetails;