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
  TextField,
  Tooltip,
} from "@mui/material";

import { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';

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

      if (data.ErrorMessage) {
        setError(data.ErrorMessage.msg);
        setOutput(null);
        setIsLoading(false);
      } else {
        setOutput(data.WhoisRecord);
        setError("");
        setIsLoading(false);
      }
    } catch (err: any) {
      setError("Error: " + err.message);
      setIsLoading(false);
    }
  };

  const handleSelect = (e: SelectChangeEvent<string>) => {
    setInfo(e.target.value);
  };

  const formatDate = (val: string): string => {
    const date = new Date(val);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
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

      {isLoading && <Alert severity="warning">Fetching Data...</Alert>}
      {error && <Alert severity="error" variant="filled">{error}.</Alert>}

      {output && (
        <div className="mt-5 p-5 bg-white/[0.4] rounded-lg shadow-md max-w-[1200px]">
          <div className="text-2xl text-neutral-700 mb-5 capitalize">{info} Information</div>

          {info === "domain" ? (
            <>
              <div className="flex flex-wrap justify-between gap-8">
                <Tooltip title={output.domainName}>
                  <div>
                    <div className="font-bold text-neutral-700">Domain Name</div>
                    <div>{output.domainName}</div>
                  </div>
                </Tooltip>
                <Tooltip title={output.registrarName}>
                  <div>
                    <div className="font-bold text-neutral-700">Registrar</div>
                    <div>{output.registrarName}</div>
                  </div>
                </Tooltip>
                <Tooltip title={formatDate(output.createdDate)}>
                  <div>
                    <div className="font-bold text-neutral-700">Registration Date</div>
                    <div>{formatDate(output.createdDate)}</div>
                  </div>
                </Tooltip>
                <Tooltip title={formatDate(output.expiresDate)}>
                  <div>
                    <div className="font-bold text-neutral-700">Expiration Date</div>
                    <div>{formatDate(output.expiresDate)}</div>
                  </div>
                </Tooltip>
                <Tooltip title={output.estimatedDomainAge}>
                  <div>
                    <div className="font-bold text-neutral-700">Estimated Domain Age</div>
                    <div>{output.estimatedDomainAge} day(s)</div>
                  </div>
                </Tooltip>
                <div className="w-48">
                  <Tooltip title={output.nameServers?.hostNames.join(", ")}>
                    <div>
                      <div className="font-bold text-neutral-700">Hostnames</div>
                      <div className="truncate text-ellipsis overflow-hidden">
                        {output.nameServers?.hostNames.join(", ")}
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap justify-between gap-8">
                <Tooltip title={output.registrant?.name || "N/A"}>
                  <div>
                    <div className="font-bold text-neutral-700">Registrant Name</div>
                    <div>{output.registrant?.name || "N/A"}</div>
                  </div>
                </Tooltip>
                <Tooltip title={output.technicalContact?.name || "N/A"}>
                  <div>
                    <div className="font-bold text-neutral-700">Technical Contact Name</div>
                    <div>{output.technicalContact?.name || "N/A"}</div>
                  </div>
                </Tooltip>
                <Tooltip title={output.administrativeContact?.name || "N/A"}>
                  <div>
                    <div className="font-bold text-neutral-700">Administrative Contact Name</div>
                    <div>{output.administrativeContact?.name || "N/A"}</div>
                  </div>
                </Tooltip>
                <Tooltip title={output.contactEmail || "N/A"}>
                  <div>
                    <div className="font-bold text-neutral-700">Contact Email</div>
                    <div>{output.contactEmail || "N/A"}</div>
                  </div>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
