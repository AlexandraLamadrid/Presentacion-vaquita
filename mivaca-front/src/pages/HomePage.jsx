const HomePage = () => {
  return (
    <div className="bg-slate-200 border rounded shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Welcome to Vaki</h1>
      <p className="text-lg text-center text-gray-700">Your go-to app for managing expenses and staying connected with friends.</p>
      <div className="mt-6 flex justify-center">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Get Started</button>
      </div>
    </div>
  );
};

export default HomePage;
