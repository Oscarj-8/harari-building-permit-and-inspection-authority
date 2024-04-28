import axios from "axios";

const API_POST_NEW_CONST_REG = "/api/construction-regulatory/new-license";

export const postNewConstRegForm = async (formData) => {
  return axios
    .post(API_POST_NEW_CONST_REG, formData)
    .then((response) => {
      if (response) {
        return { message: response.data.message, statusCode: response.status };
      } else {
        return "Server Error";
      }
    })
    .catch((error) => {
      console.log(error.message);
      throw new Error(error.message);
    });
};
