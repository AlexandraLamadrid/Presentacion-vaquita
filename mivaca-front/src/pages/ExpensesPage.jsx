const ExpensesPage = () => {
  return (
    <div className="bg-slate-200 border rounded shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Expenses Overview</h1>
      <p className="text-lg text-center text-gray-700">Track and manage all your expenses in one place.</p>
      <div className="mt-6 flex justify-center">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Add New Expense</button>
      </div>
    </div>
  );
};

export default ExpensesPage;
