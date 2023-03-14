import { useParams } from "react-router-dom";
import { Patient, Gender, Entry, Diagnose, EntryWithoutId } from "../../types";
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HospitalEntryDetails from "./HospitalEntry";
import HealthCheckEntryDetails from "./HealthCheckEntry";
import OccupationalHealthcareDetails from "./OccupationalHealthcareEntry";
import {assertNever} from "assert-never";
import HealtCheckForm from "./HealthCheckForm";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import patientService from '../../services/patients';
import { Alert, Button, Typography } from "@mui/material";
import HospitalForm from "./HospitalEntryForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

interface Props {
    patients: Patient[];
    diagnoses: Diagnose[];
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const GenderIcon = (gender: string) => {
    if (gender === Gender.Male) {
        return <MaleIcon />
    } else if (gender === Gender.Female) {
        return <FemaleIcon />
    }
    return <TransgenderIcon />
}

const PatientView = ({ patients, diagnoses, setPatients }: Props) => {
    const id = useParams().id;
    const [selectedTab, setSelectedTab] = useState(0);
    const [error, setError] = useState<string>();
    const [showEntryForm, setShowEntryForm] = useState(false);

    const patient = patients.find(p => p.id === id);

    const submitEntry = async (entry: EntryWithoutId): Promise<boolean> => {
        try {
            if (entry && id) {
                const result = await patientService.createEntry(id, entry);
                if (result && patient) {
                    const newPatient = {...patient, entries: patient.entries.concat(result)};
                    const newPatients = patients.map(pat => pat.id === id ? newPatient : pat)
                    setPatients(newPatients);
                    return true;
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.toString());
            }
        }
        return false;
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
      };

    const cancelEntry = () => {
        setShowEntryForm(false);
    }

    if (patient) {
        return (
            <div>
                <h2>{patient.name} {GenderIcon(patient.gender)}</h2>
                ssn: {patient.ssn} <br />
                occupation: {patient.occupation} <br />
                <br />
                {showEntryForm 
                    ? 
                    <div>
                    <hr />
                    <Typography variant="h6">Add new Entry:</Typography>    
                    {error && <Alert severity="error">{error}</Alert>}
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                        <Tab label="Healthcheck" />
                        <Tab label="Hospital" />
                        <Tab label="Occupational" />
                    </Tabs>
                    { selectedTab === 0 && <HealtCheckForm submitEntry={submitEntry} cancelEntry={cancelEntry} /> }
                    { selectedTab === 1 && <HospitalForm submitEntry={submitEntry} cancelEntry={cancelEntry} /> }
                    { selectedTab === 2 && <OccupationalHealthcareForm submitEntry={submitEntry} cancelEntry={cancelEntry} /> }
                    </div>
                    : <Button variant="contained" onClick={event => {setShowEntryForm(true)}}>New entry</Button> }
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