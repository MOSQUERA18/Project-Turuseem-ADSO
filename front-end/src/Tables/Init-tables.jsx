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
    1,
    "Mark",
    "Otto",
    "@mdo",
    "mark.otto@example.com",
    28,
    "USA",
    "New York",
    "Developer",
    "Active",
  ],
  [
    2,
    "Jacob",
    "Thornton",
    "@fat",
    "jacob.thornton@example.com",
    32,
    "Canada",
    "Toronto",
    "Designer",
    "Active",
  ],
  [
    3,
    "Larry",
    "Bird",
    "@twitter",
    "larry.bird@example.com",
    24,
    "UK",
    "London",
    "Manager",
    "Inactive",
  ],
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
  [
    5,
    "Jane",
    "Smith",
    "@janesmith",
    "jane.smith@example.com",
    29,
    "Germany",
    "Berlin",
    "Engineer",
    "Active",
  ],
  [
    6,
    "Paul",
    "Jones",
    "@pauljones",
    "paul.jones@example.com",
    39,
    "France",
    "Paris",
    "Consultant",
    "Inactive",
  ],
  [
    7,
    "Emily",
    "Davis",
    "@emilydavis",
    "emily.davis@example.com",
    27,
    "Spain",
    "Madrid",
    "Analyst",
    "Active",
  ],
  [
    8,
    "Michael",
    "Brown",
    "@michaelbrown",
    "michael.brown@example.com",
    31,
    "Italy",
    "Rome",
    "Lawyer",
    "Inactive",
  ],
  [
    9,
    "Sarah",
    "Wilson",
    "@sarahwilson",
    "sarah.wilson@example.com",
    34,
    "Netherlands",
    "Amsterdam",
    "Teacher",
    "Active",
  ],
  [
    10,
    "David",
    "Taylor",
    "@davidtaylor",
    "david.taylor@example.com",
    42,
    "Sweden",
    "Stockholm",
    "Doctor",
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
