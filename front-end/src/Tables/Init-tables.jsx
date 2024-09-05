//component
import WriteTable from "./Data-Tables.jsx";

const titles = [
  "#",
  "First Name",
  "Last Name",
  "Username",
  "Email",
  "Age",
  "Country",
  "City",
  "Occupation",
  "Status",
];

const data = [
  [
    4,
    "John",
    "Doe",
    "@johndoe",
    "john.doe@example.com",
    45,
    "Australia",
    "Sydney",
    "Architect",
    "Active",
  ],
];

function InitTables() {
  return (
    <>
      <div className="mt-5 ">
        {/* <h1 className="text-center">Esto es Data Tables</h1> */}
        <WriteTable titles={titles} data={data} />
      </div>
    </>
  );
}

export default InitTables;
