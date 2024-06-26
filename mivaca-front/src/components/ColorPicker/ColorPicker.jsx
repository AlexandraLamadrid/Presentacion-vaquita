import PropTypes from 'prop-types';

const colors = [
  '#A65293',
  '#66B04C',
  '#995036',
  '#4E80A5',
  '#FFFFFF',
  '#FFA72F',
  '#FFE3E3',
  '#FF2530',
];

const ColorPicker = ({ selectedColor, onSelected }) => {
  return (
    <div className="border border-vaki-black rounded p-4 gap-4 flex flex-wrap justify-center">
      {colors.map((color, index) => (
        <button
          className="h-12 w-12 rounded border-2 border-gray-200 outline-none hover:!border-vaki-primary focus:!border-vaki-primary flex justify-center items-center"
          key={index}
          style={{
            backgroundColor: color,
          }}
          onClick={(event) => {
            event.preventDefault();
            onSelected(color);
          }}
          type="button"
        >
          {selectedColor === color ? (
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
              ></path>
            </svg>
          ) : (
            ''
          )}
        </button>
      ))}
    </div>
  );
};

ColorPicker.propTypes = {
  selectedColor: PropTypes.string,
  onSelected: PropTypes.func,
};

export default ColorPicker;
