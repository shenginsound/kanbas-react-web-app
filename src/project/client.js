import axios from "axios";
//import setupProxy from "../setupProxy";


// export const SPORTS_API = "https://isports.sa.gov.tw/Api/Rest/v1";

export const findLifeguard = async (searchTerm) => {
    
    // axios.get('https://isports.sa.gov.tw/Api/Rest/v1/LifeguardLicense.svc/GetLicense?licenseType=OW&paging=false').then(response => {console.log('Response:', response);}).catch(error => {console.error('Error:', error);});
    
    console.log(searchTerm);
    
    // const response = await axios.get(
    //     `${SPORTS_API}/LifeguardLicense.svc/GetLicense?licenseType=${searchTerm}&paging=false`
    //   );
    //   console.log(response);
    //   return response.data;

};