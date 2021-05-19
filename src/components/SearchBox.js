import axios from "axios";
import { Form, FormControl } from "react-bootstrap";
import {API} from "../backend"
import { useData } from "../context/dataContext";

const SearchBox = () => {
  const {dispatch} =useData();


  async function getSearchData(search) {
    try {
      const response = await axios.post(`${API}/auth/get_all_products`,{search});
      // console.log(response.data.data);
      dispatch({ type: "SET_PRODUCTLIST", payload: response.data.data });

    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div>
      <Form inline>
        <FormControl onChange={(e)=> {getSearchData(e.target.value)}} className="mr-sm-2 ml-sm-5" type="text" placeholder="Search products.."></FormControl>
      </Form>
    </div>
  );
};

export default SearchBox;
