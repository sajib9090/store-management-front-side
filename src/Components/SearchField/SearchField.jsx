/* eslint-disable react/prop-types */
const SearchField = ({ searchInput, handleInputChange }) => {
  return (
    <div className="py-6 px-1 md:px-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="py-2 w-full border-2 border-gray-400 rounded-md px-4"
          type="search"
          name=""
          placeholder="Search products"
          value={searchInput}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchField;
