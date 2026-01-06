type NestedData = {
  [key: string]: string | NestedData;
};

export default function Sample() {
  const data: NestedData = {
    taxi: "a car licensed to transport passengers in return for payment of a fare",
    food: {
      sushi:
        "a traditional Japanese dish of prepared rice accompanied by seafood and vegetables",
      apple: {
        Honeycrisp:
          "an apple cultivar developed at the MAES Horticultural Research Center",
        Fuji: "an apple cultivar developed by growers at Tohoku Research Station",
      },
    },
  };

  const DisplayNested = ({ data }: { data: NestedData }) => {
    return (
      <div className="ml-4">
        {Object.entries(data).map(([key, value]) =>
          typeof value === "object" ? (
            <div key={key} className="mt-1">
              <div className="font-semibold text-gray-900">{key}:</div>

              <DisplayNested data={value} />
            </div>
          ) : (
            <div key={key} className="text-gray-700 leading-relaxed">
              <span className="font-medium text-gray-900">{key}:</span> {value}
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg border bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">My Data</h1>

        <DisplayNested data={data} />
      </div>
    </div>
  );
}
