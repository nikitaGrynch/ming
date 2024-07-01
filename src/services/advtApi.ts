import { AddAdvtType, AdvtType, SavedAdvtType } from "@customTypes/advtTypes";
import axios from "axios";

const GET_ALL_ADVTS_URL =
  "https://shelterbackapi.azurewebsites.net/Advt/GetAllAdvts";

const GET_ADVT_BY_ID_URL = (id: string) =>
  `https://shelterbackapi.azurewebsites.net/Advt/GetAdvtById/${id}`;

const ADD_ADVT_URL = "https://shelterbackapi.azurewebsites.net/Advt/AddAdvt";

const GET_SAVED_ADVTS_URL = (userId: string) =>
  `https://shelterbackapi.azurewebsites.net/Advt/GetSavedAdvts/${userId}`;

const SAVE_ADVT_URL = "https://shelterbackapi.azurewebsites.net/Advt/SaveAdvt";

const DELETE_SAVED_ADVT_URL = (id: string) =>
  `https://shelterbackapi.azurewebsites.net/Advt/DeleteSavedAdvt/${id}`;

const GET_IMAGE_BY_FILENAME_URL = (filename: string) =>
  `https://shelterbackapi.azurewebsites.net/Advt/GetImageByFilename?filename=${filename}`;

export const getAdvtImage = async (filename: string) => {
  const res = await axios.get(GET_IMAGE_BY_FILENAME_URL(filename));
  return res;
};

export const getAllAdvts = async (
  sortBy?: "dateAsc" | "dateDesc",
  category?: string
): Promise<AdvtType[]> => {
  try {
    const response = await axios.get(GET_ALL_ADVTS_URL);
    const advts: AdvtType[] = response.data.filter((advtData: any) => {
      const advt: AdvtType = parseAdvtData(advtData);
      if (category && advt.category !== category) {
        return;
      }
      return advt;
    });
    if (sortBy === "dateAsc") {
      advts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === "dateDesc") {
      advts.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    return advts;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAdvtById = async (id: string): Promise<AdvtType | null> => {
  try {
    const response = await axios.get(GET_ADVT_BY_ID_URL(id));
    const advt: AdvtType = parseAdvtData(response.data);
    return advt;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllAdvtsByUserId = async (
  userId: string,
  sortBy?: "dateAsc" | "dateDesc"
): Promise<AdvtType[]> => {
  try {
    const response = await axios.get(GET_ALL_ADVTS_URL);
    const advts: AdvtType[] = response.data.filter((advtData: any) => {
      const advt: AdvtType = parseAdvtData(advtData);

      if (advt.authorId === userId) {
        return advt;
      }
    });
    if (sortBy === "dateAsc") {
      advts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === "dateDesc") {
      advts.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    return advts;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const addAdvt = async (advt: AddAdvtType): Promise<boolean> => {
  try {
    const response = await axios.post(ADD_ADVT_URL, advt);
    if (response.status == 201) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

export const getSavedAdvtsByUserId = async (
  userId: string
): Promise<SavedAdvtType[]> => {
  try {
    const response = await axios.get(GET_SAVED_ADVTS_URL(userId));
    const advts: SavedAdvtType[] = response.data.map((advtData: any) => {
      return {
        id: advtData.id,
        advtId: advtData.advtId,
        userId: advtData.userId,
      };
    });
    return advts;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getSavedAdvtsWithDataByUserId = async (userId: string) => {
  try {
    const response = await axios.get(GET_SAVED_ADVTS_URL(userId));
    const savedAdvts: SavedAdvtType[] = response.data.map((advtData: any) => {
      return {
        id: advtData.id,
        advtId: advtData.advtId,
        userId: advtData.userId,
      };
    });
    const advts: (AdvtType & { savedId: string })[] = [];
    for (const savedAdvt of savedAdvts) {
      const advt = await getAdvtById(savedAdvt.advtId);
      if (advt) {
        advts.push({ ...advt, savedId: savedAdvt.id });
      }
    }
    advts.sort((a, b) => b.date.getTime() - a.date.getTime());
    return advts;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const saveAdvt = async (
  advtId: string,
  userId: string
): Promise<boolean> => {
  try {
    const response = await axios.post(SAVE_ADVT_URL, { advtId, userId });
    if (response.status == 201) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

export const deleteSavedAdvt = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(DELETE_SAVED_ADVT_URL(id));
    if (response.status == 204) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

const parseAdvtData = (advtData: any): AdvtType => {
  const advt: AdvtType = {
    id: advtData.id,
    authorId: advtData.authorId,
    title: advtData.title,
    description: advtData.description,
    price: advtData.price,
    category: advtData.category,
    animalType: advtData.animalType,
    city: advtData.city,
    date: new Date(advtData.date),
    image: advtData.image,
  };
  return advt;
};
