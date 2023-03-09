import { Diagnose, HealthCheckEntry } from "../../types"
import HealthRatingBar from "../HealthRatingBar";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: HealthCheckEntry;
    diagnoses: Diagnose[];
}

const HealthCheckEntryDetails = ({ entry, diagnoses }: Props) => {
    return (
        <div id="entry">
            <p>{entry.date} <LocalHospitalIcon /> </p>
            <i>{entry.description}</i>
            <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
            <p>diagnose by {entry.specialist}</p>
            <ul>
                {entry.diagnosisCodes?.map((code, index) => (<li key={index} id={index.toString()}>{code} {diagnoses.find(d => d.code === code)?.name}</li>))}
            </ul>
        </div>
    )
}

export default HealthCheckEntryDetails;