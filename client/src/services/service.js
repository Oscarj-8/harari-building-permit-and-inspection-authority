import axios from "axios";

const API_POST_NEW_CONST_REG = "/api/construction-regulatory/new-license";
const API_POST_UPGRADE_CONST_REG =
  "/api/construction-regulatory/upgrade-license";

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

export const postUpdateConstReg = async (formData) => {
  return axios
    .post(API_POST_UPGRADE_CONST_REG, formData)
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

export const getNewLicenseReq = async () => {
  return axios
    .get("http://localhost:3000/api/constructionReg-list")
    .then((response) => {
      if (response) {
        return response.data.data;
      } else {
        return "Server Error";
      }
    })
    .catch((error) => {
      console.log(error.message);
      throw new Error(error.message);
    });
};
