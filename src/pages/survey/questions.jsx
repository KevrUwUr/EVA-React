import useState from 'react';


export const SingleChoiceQuestion = ({ question, onUpdate }) => {
    const [options, setOptions] = useState(question.options || []);
    const [correctOption, setCorrectOption] = useState(question.correctOption || null);
  
    const handleOptionChange = (index, value) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
      onUpdate({ ...question, options: newOptions });
    };
  
    const handleAddOption = () => {
      setOptions([...options, '']);
    };
  
    const handleCorrectOptionChange = (index) => {
      setCorrectOption(index);
      onUpdate({ ...question, correctOption: index });
    };
  
    return (
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        {options.map((option, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <input
              type="radio"
              className="btn-check"
              name="correctOption"
              id={`correctOption${index}`}
              autoComplete="off"
              checked={correctOption === index}
              onChange={() => handleCorrectOptionChange(index)}
            />
            <label className="btn btn-outline-primary" htmlFor={`correctOption${index}`}>
              Correct
            </label>
          </div>
        ))}
        <button type="button" className="btn btn-outline-secondary" onClick={handleAddOption}>
          Add Option
        </button>
      </div>
    );
  };
  