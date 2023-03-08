import { useParams } from "react-router-dom";
import { Patient, Gender, Entry } from "../types";
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface Props {
    patients: Patient[];
}

const GenderIcon = (gender: string) => {
    if (gender === Gender.Male) {
        return <MaleIcon />
    } else if (gender === Gender.Female) {
        return <FemaleIcon />
    }
    return <TransgenderIcon />
}

const PatientView = ({ patients }: Props) => {
    const id = useParams().id;

    const patient = patients.find(p => p.id === id);
    if (patient) {
        return (
            <div>
                <h2>{patient.name} {GenderIcon(patient.gender)}</h2>
                
                ssn: {patient.ssn} <br />
                occupation: {patient.occupation}
                <EntryList entries={patient.entries} />
            </div>
        )  
    }
    return (<></>)
}

interface EntryListProps {
    entries: Entry[];
}

const EntryList = ({ entries }: EntryListProps) => {
    return (
        <div>
            <h3>entries</h3>
            {entries.map(entry => (
                <>
                <p>{entry.date} <i>{entry.description}</i></p>
                <ul>
                    {entry.diagnosisCodes?.map(code => (<li>{code}</li>))}
                </ul>
                </>
            ))}
        </div>
    )
}

export default PatientView;