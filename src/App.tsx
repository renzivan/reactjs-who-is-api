/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./App.css";
import {
  Alert,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";

import { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import DomainTable from "./components/DomainTable";
import ContactTable from "./components/ContactTable";

interface WhoisRecord {
  domainName: string;
  registrarName: string;
  createdDate: string;
  expiresDate: string;
  estimatedDomainAge: string;
  nameServers?: { hostNames: string[] };
  registrant?: { name: string };
  technicalContact?: { name: string };
  administrativeContact?: { name: string };
  contactEmail: string;
}

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<WhoisRecord | null>(null);
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("domain");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // on submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${
          import.meta.env.VITE_API_KEY
        }&domainName=${input}&outputFormat=JSON`
      );
      const data = await response.json();

      if (data.ErrorMessage || data.WhoisRecord?.dataError) { // catch error from api data
        setError(data.ErrorMessage?.msg || data.WhoisRecord?.dataError);
        setOutput(null);
        setIsLoading(false);
      } else { // set data to state and clear error
        setOutput(data.WhoisRecord);
        setError("");
        setIsLoading(false);
      }
    } catch (err: any) {
      // catch error from api call
      setError("Error: " + err.message);
      setIsLoading(false);
    }
  };

  // on select information type
  const handleSelect = (e: SelectChangeEvent<string>) => {
    setInfo(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white w-full flex justify-center py-4 mb-5">
        <div className="flex flex-wrap items-center justify-between container">
          <img src="/logo.svg" alt="" />
          <div className="flex flex-wrap items-center">
            <FormControl sx={{ m: 1, minWidth: 200 }} className="">
              <InputLabel id="select-small-label">Information Type</InputLabel>
              <Select
                labelId="select-small-label"
                value={info}
                label="Select Information"
                onChange={handleSelect}
              >
                <MenuItem value="domain">Domain Information</MenuItem>
                <MenuItem value="contact">Contact Information</MenuItem>
              </Select>
            </FormControl>

            <form onSubmit={(e) => handleSubmit(e)} className="relative w-80">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Domain"
                placeholder="Enter Domain..."
                variant="outlined"
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="absolute right-0 top-2">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {output && (
        <div className="my-5 p-5 bg-white/[0.4] rounded-lg shadow-md max-w-[1200px]">
          <div className="text-2xl text-neutral-700 mb-5 capitalize">{info} Information</div>

          {info === "domain" ? (
            <>
              <DomainTable output={output} />
            </>
          ) : (
            <>
              <ContactTable output={output} />
            </>
          )}
        </div>
      )}

      
      {isLoading && <Alert severity="warning">Fetching Data...</Alert>}
      {error && <Alert severity="error" variant="filled">{error}.</Alert>}
    </div>
  );
}

export default App;
