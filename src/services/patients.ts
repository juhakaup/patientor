import axios from "axios";
import { Patient, PatientFormValues, Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id: string, object: EntryWithoutId) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    )
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, createEntry
};

