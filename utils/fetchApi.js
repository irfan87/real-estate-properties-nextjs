import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
	const { data } = await axios.get(url, {
		headers: {
			"X-RapidAPI-Key": "fe51a32f1dmsh5d85cba970eeec0p16c4efjsn64da3cc298e1",
			"X-RapidAPI-Host": "bayut.p.rapidapi.com",
		},
	});

	return data;
};
