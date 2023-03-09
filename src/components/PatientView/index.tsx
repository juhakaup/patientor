import { useParams } from "react-router-dom";
import { Patient, Gender, Entry, Diagnose } from "../../types";
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HospitalEntryDetails from "./HospitalEntry";
import HealthCheckEntryDetails from "./HealthCheckEntry";
import OccupationalHealthcareDetails from "./OccupationalHealthcareEntry";
import {assertNever} from "assert-never";

interface Props {
    patients: Patient[];
    diagnoses: Diagnose[];
}

const GenderIcon = (gender: string) => {
    if (gender === Gender.Male) {
        return <MaleIcon />
    } else if (gender === Gender.Female) {
        return <FemaleIcon />
    }
    return <TransgenderIcon />
}

const PatientView = ({ patients, diagnoses }: Props) => {
    const id = useParams().id;

    const patient = patients.find(p => p.id === id);
    if (patient) {
        return (
            <div>
                <h2>{patient.name} {GenderIcon(patient.gender)}</h2>
                
                ssn: {patient.ssn} <br />
                occupation: {patient.occupation}
                <EntryList entries={patient.entries} diagnoses={diagnoses}/>
            </div>
        )  
    }
    return (<></>)
}

interface EntryListProps {
    entries: Entry[];
    diagnoses: Diagnose[];
}

const EntryList = ({ entries, diagnoses }: EntryListProps) => {
    return (
        <div>
            <h3>entries</h3>
            {entries.map((entry) => {
                switch (entry.type) {
                    case "Hospital":
                        return <HospitalEntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
                    case "OccupationalHealthcare":
                        return  <OccupationalHealthcareDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
                    case "HealthCheck":
                        return  <HealthCheckEntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
                    default:
                        return assertNever(entry);
                }
            })}
        </div>
    )
}

export default PatientView;