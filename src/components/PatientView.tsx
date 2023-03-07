import { useParams } from "react-router-dom";
import { Patient, Gender } from "../types";
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
            </div>
        )  
    }
    return (<></>)
}

export default PatientView;